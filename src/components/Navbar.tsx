"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SelectTheme } from "./theme-toggler";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MailIcon } from "lucide-react";

export const Navbar = () => {

    const session = useSession();
    console.log(session?.data?.user);
    const router = useRouter();


    return (
        <>
            <div className=" z-[999] h-fit flex items-center justify-between">
                <header className="flex items-center font-secondary border-neutral-900 justify-between">
                    <aside className="hidden md:flex items-center gap-[10px]">
                        <p className="text-xl font-extrabold font-secondary">Merged<span className="text-primary">&</span>Share .</p>
                    </aside>
                    <aside className="flex md:hidden items-center gap-[10px]">
                        <p className="text-xl font-extrabold font-secondary">M<span className="text-primary">&</span>S.</p>
                    </aside>
                </header>

                <aside className="flex items-center gap-2">
                    <SelectTheme />

                    <Link href="https://github.com/amanbairagi30/merged-n-share" className="flex items-center cursor-pointer hover:bg-accent gap-2 border-2 px-2 py-1 rounded-md" target="_blank" rel="noopener noreferrer">
                        <GitHubLogoIcon className="h-5 w-5" />
                        <span className="hidden md:block">Star on Github</span>
                    </Link>
                    <Link href="mailto:amanbairagi1089@gmail.com" className="flex items-center cursor-pointer hover:bg-accent gap-2 border-2 px-2 py-1 rounded-md" target="_blank" rel="noopener noreferrer">
                        <MailIcon className="h-5 w-5" />
                        <span className="hidden md:block">Contact Us</span>
                    </Link>

                </aside>
            </div >
        </>
    )
}