import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";


export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = await auth()

  // Protect the route by checking if the user is signed in
  if (!userId) {
    redirect("/");
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser()

  // Use `user` to render user details or create UI elements
  return <div>Welcome!</div>
}