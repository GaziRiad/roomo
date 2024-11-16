import SignoutForm from "@/components/SignoutForm";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  console.log(session);
  if (!session?.user) return redirect("/login");

  return (
    <div className="max-w-6xl mx-auto py-20">
      <h1 className="mb-12 text-2xl">Hello, world</h1>

      <div className="flex mb-6 items-center gap-6">
        <Image
          src={session.user.image ?? "/default-image.png"}
          alt={`Image of ${session.user.name}`}
          width={40}
          height={40}
          className="size-10 rounded-full"
        />
        <p>{session.user.name}</p>
      </div>
      <SignoutForm />
    </div>
  );
}
