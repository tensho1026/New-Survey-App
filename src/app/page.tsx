"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const saveUserToDatabase = async () => {
      await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user?.id,
          username: user?.fullName,
        }),
      });
    };
    if (isLoaded && isSignedIn && user) {
      saveUserToDatabase();
    }
  }, [user, isLoaded, isSignedIn]);

  return (
    <div className=''>
     <UserButton/>
    </div>
  );
}
