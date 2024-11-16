"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegStickyNote } from "react-icons/fa";

const data = [
  {
    catrgory: "Nature",
    icon: "🌲",
    items: [
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
    ],
  },
  {
    catrgory: "Beach",
    icon: "🏖️",
    items: [
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
    ],
  },
  {
    catrgory: "City",
    icon: "🏙️",
    items: [
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
    ],
  },
  {
    catrgory: "Cafe",
    icon: "☕",
    items: [
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
    ],
  },
];

export default function SpaceDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer text-3xl outline-none">
        Nature<span className="text-5xl">🌲</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 mt-2 min-w-64 border-slate-950 bg-slate-950/95 text-white">
        <DropdownMenuLabel className="flex items-center gap-5 py-5">
          {data.map((item) => (
            <div key={item.catrgory} className="flex items-center">
              <span>{item.catrgory}</span>
              <span className="ml-2 text-2xl">{item.icon}</span>
            </div>
          ))}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-auto bg-white/40" />

        {/*  */}
        <DropdownMenuItem className="py-5" onClick={() => console.log("OPEN")}>
          <FaRegStickyNote />
          <span>Sticky Notes</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
