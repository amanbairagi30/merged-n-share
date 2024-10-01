"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SelectTheme } from "./theme-toggler";
import { Button } from "./ui/button";


export const Navbar = () => {
    const session = useSession();
    console.log(session?.data?.user);
    const router = useRouter();
    return (
        <>
            <div className=" z-[999] h-fit flex items-center justify-between">
                <header className="flex items-center font-secondary border-neutral-900 justify-between">
                    <aside className="flex items-center gap-[10px]">
                        <p className="text-xl font-extrabold font-secondary">Merged<span className="text-primary">&</span>Share .</p>
                    </aside>
                </header>

                <aside className="flex items-center  gap-4">
                    <SelectTheme />
                    <Button className=" bg-none">Star on Github</Button>
                    <Button className=" bg-none">Contact Us</Button>
                </aside >
            </div >
        </>
    )
}