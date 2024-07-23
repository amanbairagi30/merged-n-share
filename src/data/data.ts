import { Building2, GitPullRequest, LayoutDashboard, Trophy } from 'lucide-react'

export const sideBarOptions = {
    general: [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            href: "/work/dashboard",
        },
        {
            name: 'Leaderboard',
            icon: Trophy,
            href: "/work/leaderboard",
        },
        {
            name: 'My PRs',
            icon: GitPullRequest,
            href: "/work/my-pr",
        },
        {
            name: 'Organisation',
            icon: Building2,
            href: "/work/organisation",
        },
    ],
}
