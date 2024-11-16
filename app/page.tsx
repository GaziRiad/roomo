import DraggableContainer from "@/components/DraggableContainer";
import LogoutButton from "@/components/LogoutButton";
import SpaceDropDown from "@/components/SpaceDropDown";
import WidgetDropDown from "@/components/WidgetDropDown";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  console.log(session);
  if (!session?.user) return redirect("/login");

  return (
    <div className="flex h-screen w-full flex-col bg-[url('/nature1.jpg')] bg-cover bg-center p-8 text-white">
      <p className="text-xl text-white/80">
        {session?.user?.name?.split(" ")[0] ?? "Guest"}&apos;S ROOM
      </p>
      <div className="mb-4 flex items-center">
        <SpaceDropDown />
        <WidgetDropDown />

        <LogoutButton />
      </div>
      <DraggableContainer />
    </div>
  );
}
