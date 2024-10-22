import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Search } from "lucide-react"

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 bg-background px-4">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <form className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="What do you want to listen to?"
                  className="pl-8 w-full md:w-[300px] lg:w-[400px]"
                />
              </div>
            </form>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
          <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
