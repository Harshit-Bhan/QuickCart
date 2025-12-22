import { createUserOrder, inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/app/config/inngest";
import { serve } from "inngest/next";
// import { inngest , syncUserCreation , syncUserDeletion , syncUserUpdation } from 

export const { GET , POST , PUT } = serve({
    client: inngest,
    functions: [
        syncUserCreation,
        syncUserDeletion,
        syncUserUpdation,
        createUserOrder
    ],
})