import DraggableContainer from "@/components/DraggableContainer";
import LogoutButton from "@/components/LogoutButton";
import SpaceDropDown from "@/components/SpaceDropDown";
import { Progress } from "@/components/ui/progress";
import WidgetDropDown from "@/components/WidgetDropDown";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoSettingsOutline, IoVolumeHighOutline } from "react-icons/io5";

export default async function page() {
  const session = await auth();

  console.log(session);
  if (!session?.user) return redirect("/login");

  return (
    <div className="flex h-screen w-full flex-col bg-[url('/nature1.jpg')] bg-cover bg-center p-8 text-white">
      <p className="text-xl text-white/80">
        {session?.user?.name?.split(" ")[0].toUpperCase() ?? "Guest"}&apos;S
        ROOM
      </p>
      <div className="mb-4 flex items-center">
        <SpaceDropDown />
        <WidgetDropDown />

        <LogoutButton />
      </div>
      <DraggableContainer />
      {/*  */}
      {/*  */}
      {/* Remplate your code */}
      <div className="mx-auto flex h-16 items-center justify-center gap-10 rounded-full bg-slate-500/60 px-12">
        <div className="flex items-center gap-3">
          <IoVolumeHighOutline size={30} className="cursor-pointer" />
          <Progress value={66} className="w-64 first:bg-red-600" />
        </div>
        <span className="h-10 w-[1px] bg-white"></span>
        <div className="flex items-center gap-5">
          <IoSettingsOutline size={26} className="cursor-pointer" />
          <FaUserAlt size={22} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
