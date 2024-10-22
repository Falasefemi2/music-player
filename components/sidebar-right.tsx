import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"



export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">

      </SidebarHeader>
      <SidebarContent>

        <SidebarSeparator className="mx-0" />

      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
