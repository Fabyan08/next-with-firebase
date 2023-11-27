"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Dashboard() {
  const { data: session, status }: { data: any; status: string } = useSession();
  // console.log(session) //Pasti unauthorized
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      if (session !== undefined && session?.user.role !== "admin") {
        router.push("/");
      }
    }
  }, [router, session, session?.user.role, status]);

  return (
    <>
      <div className="h-96 rounded-[12px] w-full bg-gray-300 text-slate-900 flex items-center justify-center">
        <h1>Dashboard Page</h1>
      </div>
    </>
  );
}
