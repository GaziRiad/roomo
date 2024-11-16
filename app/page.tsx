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
    <div className="h-screen w-full bg-slate-900 p-8 text-white">
      <p className="text-xl text-white/80">
        {session?.user?.name?.split(" ")[0] ?? "Guest"}&apos;S ROOM
      </p>

      <div className="flex items-center">
        {/* <p className="pb-2 text-3xl">
          Nature<span className="text-5xl">🌲</span>
        </p> */}

        <SpaceDropDown />
        <WidgetDropDown />
      </div>
    </div>
  );
}
