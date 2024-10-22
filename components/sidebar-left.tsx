"use client"

import * as React from "react"
import { Home, Search, Plus, ListMusic, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === "/" && "bg-accent text-accent-foreground"
              )}
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === "/search" && "bg-accent text-accent-foreground"
              )}
            >
              <Link href="/search">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Link>
            </Button>
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ListMusic className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Playlists</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Create playlist</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="p-4 text-center">
                  List of songs
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="relative flex flex-col">
        {/* Content for the sidebar can be added here */}
        <div className="flex-grow" />
        <div className="absolute bottom-4 right-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Sun className="h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}