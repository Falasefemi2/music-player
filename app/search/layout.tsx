"use client"

import { Header } from "@/components/Header"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"




export default function SearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <SidebarLeft />
            <SidebarInset>
                <div className="sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 bg-background px-4">
                    <div className="flex flex-1 items-center gap-2 overflow-hidden">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="h-6" />
                        <Header />
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                    <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
                    <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" />
                </div>
            </SidebarInset>
            <SidebarRight />
        </SidebarProvider>


    )
}