/** @format */

"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import { songs } from "../db/schema";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// Define the schema for input validation
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist name is required"),
  songFile: z
    .instanceof(File)
    .refine((file) => ["audio/mp3", "audio/wav"].includes(file.type), {
      message: "File must be an audio file (mp3 or wav)",
    }),
  imageUrl: z.string().url("Invalid image URL").optional(),
  duration: z.number().optional(),
});

// Export the action for uploading a song
export const uploadSongAction = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: { title, artist, songFile, imageUrl, duration },
    }) => {
      const user = await currentUser();

      if (!user) {
        return {
          failure: "Unauthorized: You must be logged in to upload a song.",
        };
      }

      try {
        // Upload the song file using Uploadthing
        const response = await utapi.uploadFiles([songFile]);

        const uploadedFileUrl = response[0]?.data?.url; // Adjust based on actual response structure

        if (!uploadedFileUrl) {
          return { failure: "File upload failed, no URL returned." };
        }

        // Insert the song information into the database
        await db.insert(songs).values({
          title,
          artist,
          songUrl: uploadedFileUrl,
          imageUrl: imageUrl || null,
          duration: duration || null,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return {
          success: "Song uploaded successfully!",
          songUrl: uploadedFileUrl,
        };
      } catch (error) {
        console.error("Error uploading song:", error);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        return { failure: "Error uploading song: " + errorMessage };
      }
    }
  );
