import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Header() {
    return (
        <form className="flex-1 flex items-center justify-between gap-4 max-w-4xl">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="What do you want to listen to?"
                    className="pl-8 w-full"
                />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                    Log in
                </Button>
                <Button size="sm">
                    Sign up
                </Button>
            </div>
        </form>
    )
}
