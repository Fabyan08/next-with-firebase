"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { status }: { status: string } = useSession();

  return (
    <div className="flex justify-center">
      <div>
        <ul className="flex items-center bg-blue-400/30 backdrop-blur-lg space-x-4 p-4 rounded-full mt-4 w-fit">
          <Link href="/">
            {" "}
            <li className={pathname === "/" ? "text-white" : "text-slate-400"}>
              Home
            </li>
          </Link>
          <Link href="/about">
            {" "}
            <li
              className={
                pathname === "/about" ? "text-white" : "text-slate-400"
              }
            >
              About
            </li>
          </Link>
          <Link href="/about/profile">
            {" "}
            <li
              className={
                pathname === "/about/profile" ? "text-white" : "text-slate-400"
              }
            >
              Profile
            </li>
          </Link>
          <div>
            {status === "authenticated" ? (
              <button
                className="bg-blue-500 p-2 rounded-lg text-white"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="bg-blue-500 p-2 rounded-lg text-white"
                onClick={() => signIn()}
              >
                Login
              </button>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}
