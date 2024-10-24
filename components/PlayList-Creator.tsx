"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { ListMusic, Plus } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { UploadSongForm } from "./SongUpload"
// import UploadSongPage from "./SongUpload"


export default function PlaylistCreator() {
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = React.useState(false)

    // const Content = () => (
    //     <div className="space-y-4 p-4">
    //         <h2 className="text-lg font-semibold text-center">Create New Playlist</h2>
    //         <div className="space-y-2">
    //             <Label htmlFor="playlist-name">Playlist Name</Label>
    //             <Input id="playlist-name" placeholder="Enter playlist name" />
    //         </div>
    //         <div className="space-y-2">
    //             <Label htmlFor="song-search">Add Songs</Label>
    //             <Input id="song-search" placeholder="Search for songs" />
    //         </div>
    //         <div className="text-sm text-gray-500">
    //             List of songs will appear here as you search and add them.
    //         </div>
    //         <Button className="w-full">Create Playlist</Button>
    //     </div>
    // )

    return (
        <div className="px-3 py-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <ListMusic className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">Playlists</span>
                </div>
                {isMobile ? (
                    <Drawer open={isOpen} onOpenChange={setIsOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Create playlist</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            {/* <Content /> */}
                            <UploadSongForm />
                        </DrawerContent>
                    </Drawer>
                ) : (
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Create playlist</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            {/* <Content /> */}
                            <UploadSongForm />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    )
}