/** @format */

"use server";

import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import { songs, users } from "../db/schema";

import { UTApi, UTFile } from "uploadthing/server";
import { eq } from "drizzle-orm";

const utapi = new UTApi();

const songSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  songFile: z.instanceof(File, { message: "A valid song file is required" }),
  imageFile: z.instanceof(File).optional(),
});

export async function uploadSongAction(formData: FormData) {
  // Validate form data using Zod
  const parsedData = songSchema.safeParse({
    title: formData.get("title"),
    artist: formData.get("artist"),
    songFile: formData.get("songFile"),
    imageFile: formData.get("imageFile"),
  });

  if (!parsedData.success) {
    return {
      data: {
        success: undefined,
        failure: parsedData.error.format(),
      },
    };
  }

  const { title, artist, songFile, imageFile } = parsedData.data;

  // Create a new UTFile instance for the song file
  const file = new UTFile([songFile], songFile.name, {
    customId: songFile.name,
  });
  const response = await utapi.uploadFiles([file]);

  // If there is an image file, upload it as well
  let imageUrl = null;
  if (imageFile) {
    const imageFileInstance = new UTFile([imageFile], imageFile.name, {
      customId: imageFile.name,
    });
    const imageResponse = await utapi.uploadFiles([imageFileInstance]);
    if (imageResponse[0]?.data?.url) {
      imageUrl = imageResponse[0]?.data?.url; // Adjust based on how your API responds
    }
  }

  const user = await currentUser();

  if (!user) {
    return {
      failure: "Unauthorized: You must be logged in to upload a song.",
    };
  }

  // Save song metadata to the database (using Drizzle ORM or your preferred method)
  if (response[0]?.data?.url) {
    const songData = {
      title,
      artist,
      songUrl: response[0]?.data?.url, // Assuming response contains file URLs
      imageUrl,
      userId: user.id, // Add userId here
      createdAt: new Date(), // Add createdAt here
      updatedAt: new Date(), // Add updatedAt here
    };

    // Insert into the database (adjust based on your ORM)
    await db.insert(songs).values(songData);

    return {
      data: {
        success: "Upload successful!",
        failure: undefined,
      },
    };
  } else {
    return {
      data: {
        success: undefined,
        failure: response[0]?.error || "Upload failed!", // Accessing error from the first element of the response array
      },
    };
  }
}

export async function upsertUser(
  email: string,
  imageUrl: string,
  username: string
) {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      await db
        .update(users)
        .set({
          image: imageUrl,
        })
        .where(eq(users.id, existingUser[0].id));
    } else {
      await db.insert(users).values({
        email,
        image: imageUrl,
        createdAt: new Date(),
        name: username,
      });
    }
  } catch (error) {
    console.error("Error upserting user:", error);
    throw error;
  }
}
