"use client"

import * as React from "react"
import { Home, Search } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { ModeToggle } from "./modeToggle"
import PlaylistCreator from "./PlayList-Creator"

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
        <PlaylistCreator />
      </SidebarHeader>
      <SidebarContent className="relative flex flex-col">
        {/* Content for the sidebar can be added here */}

        <div className="flex-grow" />
        <div className="absolute bottom-4 right-4">
          <ModeToggle />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}