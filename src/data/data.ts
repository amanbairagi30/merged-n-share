import { Building2, GitPullRequest, LayoutDashboard } from 'lucide-react'

export const sideBarOptions = {
    general: [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            href: "/work/dashboard",
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
