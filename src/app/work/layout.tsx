import React from 'react'
// import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import AuxiliaryProvider from '@/components/AuxiliaryProvider'
import { Metadata } from 'next'


type Props = { children: React.ReactNode }

export const metadata: Metadata = {
    title: "M&S | Dashboard",
    description: "",
    openGraph: {
        type: 'website',
        title: "M&S | Dashboard",
        description: "Showcase your open source contributions as Proof of Work by sharing your merged pull requests to anyone around the world with help of Merged&Share",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_URL}/api/og-images/root`,
                alt: 'og-image-for-home-page'
            }
        ]
    }
};



const Layout = async (props: Props) => {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session || !session?.user) {
        redirect('/');
    }

    return (
        <div className="flex !h-screen w-screen">
            {/* <Sidebar /> */}
            <Sidebar />
            <AuxiliaryProvider>
                {props.children}
            </AuxiliaryProvider>
        </div>
    )
}

export default Layout
