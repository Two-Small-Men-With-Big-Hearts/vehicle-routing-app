"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import logo from "../app/imgs/maple_leaf_website_logo.png";
import { Button } from "./ui/button";

export default function AuthorizedNavbar() {
  return (
    <nav className="w-full flex items-center justify-start px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-5 hover:cursor-pointer">
        <Link href="/">
          <Image
            src={logo}
            alt="Two Small Men Logo"
            width={200}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <Link href="/">
          <h1 className="text-3xl font-bold text-gray-800 cursor-pointer ml-5">
            Vehicle Routing Solver
          </h1>
        </Link>
      </div>
      <div className="flex space-x-6 ml-40">
        <Link href="/fetch-all">
          <Button
            variant="default"
            className="w-50 h-14 text-xl bg-black hover:bg-gray-800 hover:cursor-pointer"
          >
            Fetch All Deals
          </Button>
        </Link>

        <Link href="/fetch-id">
          <Button
            variant="default"
            className="w-50 h-14 text-xl bg-black hover:bg-gray-800 hover:cursor-pointer"
          >
            Visualize Routes
          </Button>
        </Link>
      </div>
      <div className="ml-140"><UserButton /></div>
    </nav>
  );
}
