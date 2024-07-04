import React from 'react'
// import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'


type Props = { children: React.ReactNode }


const Layout = async (props: Props) => {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session || !session?.user) {
        redirect('/');
    }
    return (
        <div className="flex text-white  h-screen w-screen">
            {/* <Sidebar /> */}
            <Sidebar />
            <div className="flex flex-col  w-[calc(100vw-18rem)]">
                {/* <TopBar /> */}
                <Topbar />
                <div className='!h-[calc(100vh-4rem)] overflow-auto p-4 border-green-500'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout
