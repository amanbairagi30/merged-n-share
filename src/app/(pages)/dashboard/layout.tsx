import React from 'react'
// import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'


type Props = { children: React.ReactNode }


const Layout = async (props: Props) => {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session || !session?.user) {
        redirect('/');
    }
    return (
        <div className="flex overflow-scroll h-screen  bg-grid-white/[0.15] relative  ">
            {/* <Sidebar /> */}
            <div className="w-full">
                {/* <InfoBar /> */}
                {props.children}
            </div>
        </div>
    )
}

export default Layout
