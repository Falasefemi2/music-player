"use client";

import { uploadSongAction } from "@/app/actions/uploadsong";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";;
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";



const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    artist: z.string().min(1, "Artist name is required"),
    songFile: z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, `File size should be less than 10MB.`),
    imageFile: z.instanceof(File).optional().refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        `File size should be less than 5MB.`
    ),
});

export function UploadSongForm() {
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            artist: "",
        },
    });

    // async function onSubmit(values: z.infer<typeof formSchema>) {
    //     setIsUploading(true);
    //     try {
    //         // Upload the song file
    //         const songUploadResult = await startUpload([values.songFile]);
    //         const imageUploadResult = values.imageFile ? await startUpload([values.imageFile]) : null;

    //         if (!songUploadResult) {
    //             throw new Error("Song upload failed");
    //         }

    //         // Call the uploadSongAction with the uploaded file URLs
    //         const result = await uploadSongAction({
    //             title: values.title,
    //             artist: values.artist,
    //             songFile: songUploadResult[0].url, // Use the URL from the upload result
    //             imageUrl: imageUploadResult ? imageUploadResult[0].url : undefined, // Optional
    //             duration: 0, // Set duration as needed
    //         });

    //         if (result?.data?.success) { // Assuming the result structure
    //             toast(result.data.success);
    //             form.reset();
    //         } else if (result?.data?.failure) {
    //             toast(result.data.failure);
    //         }
    //     } catch (error) {
    //         toast((error as Error).message); // Type assertion added here
    //     } finally {
    //         setIsUploading(false);
    //     }
    // }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsUploading(true);
        try {
            // Create a FormData object to send the file data
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("artist", values.artist);
            formData.append("songFile", values.songFile);
            if (values.imageFile) {
                formData.append("imageFile", values.imageFile);
            }

            // Call the uploadSongAction with the FormData
            const result = await uploadSongAction({
                title: values.title,
                artist: values.artist,
                songFile: values.songFile,
                imageUrl: values.imageFile ? URL.createObjectURL(values.imageFile) : undefined,
                duration: 0, // Set duration as needed

            });

            // Handle the response
            if (result?.data?.success) {
                toast(result.data.success);
                form.reset();
            } else if (result?.data?.failure) {
                toast(result.data.failure);
            }
        } catch (error) {
            toast((error as Error).message); // Type assertion added here
        } finally {
            setIsUploading(false);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Song Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter song title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="artist"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Artist Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter artist name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="songFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Song File</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                />
                            </FormControl>
                            <FormDescription>Upload an audio file (max 10MB)</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cover Image (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                />
                            </FormControl>
                            <FormDescription>Upload a cover image (max 5MB)</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Song"}
                </Button>
            </form>
        </Form>
    );
}

