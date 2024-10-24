"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";


interface AuthStatusProps {
    isSignedIn: boolean;
}

export function AuthStatus({ isSignedIn }: AuthStatusProps) {
    return (
        <div className="flex items-center gap-2">
            {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
            ) : (
                <>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/sign-in">Log in</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/sign-up">Sign up</Link>
                    </Button>
                </>
            )}
        </div>
    );
}
