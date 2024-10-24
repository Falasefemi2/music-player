// import { Search } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import Link from 'next/link'; 
import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
// import { UserButton } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";
import { AuthStatus } from "./AuthStatus";


// export default async function Header() {
//     const { userId } = auth();
//     const user = await currentUser();

//     if (user && userId) {
//         try {
//             // First, try to find the user by email
//             const existingUser = await db
//                 .select()
//                 .from(users)
//                 .where(eq(users.email, user.emailAddresses[0]?.emailAddress || ""))
//                 .limit(1);

//             if (existingUser.length > 0) {
//                 // User exists, update their information
//                 const updatedUser = await db
//                     .update(users)
//                     .set({
//                         image: user.imageUrl || "",
//                     })
//                     .where(eq(users.id, existingUser[0].id))
//                     .returning();

//                 console.log("User updated:", updatedUser[0]);
//             } else {
//                 // User doesn't exist, insert new user
//                 const newUser = await db
//                     .insert(users)
//                     .values({
//                         email: user.emailAddresses[0]?.emailAddress || "",
//                         image: user.imageUrl || "",
//                         createdAt: new Date(),
//                         name: user.username || "",
//                     })
//                     .returning();

//                 console.log("New user created:", newUser[0]);
//             }
//         } catch (error) {
//             console.error("Error updating or creating user in database:", error);
//         }
//     }

//     return (
//         <nav className="flex-1 flex items-center justify-between gap-4 max-w-4xl">
//             <div className="relative flex-1">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                     type="search"
//                     placeholder="What do you want to listen to?"
//                     className="pl-8 w-full"
//                 />
//             </div>
//             <div className="flex items-center gap-2">
//                 {userId ? (
//                     <UserButton />
//                 ) : (
//                     <>
//                         <Button variant="outline" size="sm" asChild>
//                             <Link href="/sign-in">Log in</Link>
//                         </Button>
//                         <Button size="sm" asChild>
//                             <Link href="/sign-up">Sign up</Link>
//                         </Button>
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// }

export default async function Header() {
    const { userId } = auth();
    const user = await currentUser();

    if (user && userId) {
        try {
            // First, try to find the user by email
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.email, user.emailAddresses[0]?.emailAddress || ""))
                .limit(1);

            if (existingUser.length > 0) {
                await db
                    .update(users)
                    .set({
                        image: user.imageUrl || "",
                    })
                    .where(eq(users.id, existingUser[0].id));
            } else {
                await db
                    .insert(users)
                    .values({
                        email: user.emailAddresses[0]?.emailAddress || "",
                        image: user.imageUrl || "",
                        createdAt: new Date(),
                        name: user.username || "",
                    });
            }
        } catch (error) {
            console.error("Error updating or creating user in database:", error);
        }
    }

    const isSignedIn = Boolean(userId);


    return (
        <nav className="flex-1 flex items-center justify-between gap-4 max-w-4xl">
            <SearchBar />
            <AuthStatus isSignedIn={isSignedIn} />
        </nav>
    );
}