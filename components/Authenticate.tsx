"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from "../app/imgs/maple_leaf_website_logo.png"

export default function Authenticate() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 mt-120">
      {/* Logo */}
      <Image
        src={logo}
        alt="Two Small Men with Big Hearts Logo"
        width={300}
        height={150}
        className="mb-4"
      />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-2">
        Vehicle Routing Solver
      </h1>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <SignInButton>
          <button className="bg-black text-white rounded-full font-medium text-lg h-12 px-8 hover:bg-gray-800 transition">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-white text-black border border-black rounded-full font-medium text-lg h-12 px-8 hover:bg-gray-100 transition">
            Sign Up
          </button>
        </SignUpButton>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-4 max-w-md text-center">
        Welcome to the VRP Solver! Please sign in or sign up to access route tools and manage deals.
      </p>
    </div>
  );
}
