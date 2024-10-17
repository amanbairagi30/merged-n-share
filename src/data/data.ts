import HTML from '@/components/svgs/html'
import NextJs from '@/components/svgs/next-js'
import ReactJS from '@/components/svgs/react-js'
import { Building2, Code, GitPullRequest, LayoutDashboard, Trophy } from 'lucide-react'

export const sideBarOptions = {
    general: [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            href: "/work/dashboard",
            isNew: true,
        },
        {
            name: 'Leaderboard',
            icon: Trophy,
            href: "/work/leaderboard",
            isNew: false,
        },
        {
            name: 'My PRs',
            icon: GitPullRequest,
            href: "/work/my-pr",
            isNew: false,
        },
        {
            name: 'Organisations',
            icon: Building2,
            href: "/work/organisations",
            isNew: true,
        },
        {
            name: 'Embed PRs',
            icon: Code,
            href: "/work/embed",
            isNew: true,
        },
    ],
}


export const frameWorksData = [
    {
        name: "HTML",
        icon: HTML
    },
    {
        name: "ReactJs",
        icon: ReactJS
    },
    {
        name: "NextJs",
        icon: NextJs
    },
]
