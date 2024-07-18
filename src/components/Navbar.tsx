"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export const Navbar = () => {
    const session = useSession();
    console.log(session?.data?.user);
    const router = useRouter();
    return (
        <>
            <div className=" z-[999] h-fit flex items-center justify-between">
                <header className="flex items-center border-b-[1px] border-neutral-900 justify-between">
                    <aside className="flex items-center gap-[10px]">
                        <p className="text-neutral-100 text-xl font-extrabold">Merged<span className="text-blue-500">&</span>Share</p>
                    </aside>
                </header>

                <aside className="flex items-center gap-4">
                    <div className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl"
                            onClick={async () => {
                                session?.data?.user ? router.push("/work/dashboard") : await signIn();

                            }}
                        >
                            {session?.data?.user ? "Dashboard" : "Get Started"}
                        </div>
                    </div>
                </aside >
            </div >
        </>
    )
}