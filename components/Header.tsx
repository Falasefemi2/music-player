// import { Search } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import Link from 'next/link'; 
import { auth, currentUser } from "@clerk/nextjs/server"
// import { db } from "@/app/db";
// import { users } from "@/app/db/schema";
// import { eq } from "drizzle-orm";
// import { UserButton } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";
import { AuthStatus } from "./AuthStatus";
import { upsertUser } from "@/app/actions/uploadsong";



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
//                 await db
//                     .update(users)
//                     .set({
//                         image: user.imageUrl || "",
//                     })
//                     .where(eq(users.id, existingUser[0].id));
//             } else {
//                 await db
//                     .insert(users)
//                     .values({
//                         email: user.emailAddresses[0]?.emailAddress || "",
//                         image: user.imageUrl || "",
//                         createdAt: new Date(),
//                         name: user.username || "",
//                     });
//             }
//         } catch (error) {
//             console.error("Error updating or creating user in database:", error);
//         }
//     }

//     const isSignedIn = Boolean(userId);


//     return (
//         <nav className="flex-1 flex items-center justify-between gap-4 max-w-4xl">
//             <SearchBar />
//             <AuthStatus isSignedIn={isSignedIn} />
//         </nav>
//     );
// }

export default async function Header() {
    const { userId } = auth();
    const user = await currentUser();

    if (user?.emailAddresses[0]?.emailAddress && userId) {
        // Server Action call
        await upsertUser(
            user.emailAddresses[0].emailAddress,
            user.imageUrl || "",
            user.username || ""
        );
    }

    const isSignedIn = Boolean(userId);

    return (
        <nav className="flex-1 flex items-center justify-between gap-4 max-w-4xl">
            <SearchBar />
            <AuthStatus isSignedIn={isSignedIn} />
        </nav>
    );
}