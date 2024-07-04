import { Building2, GitPullRequest, LayoutDashboard } from 'lucide-react'

export const sideBarOptions = {
    general: [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            href: "/works/dashboard",
        },
        {
            name: 'My PRs',
            icon: GitPullRequest,
            href: "/works/my-pr",
        },
        {
            name: 'Organisation',
            icon: Building2,
            href: "/works/organisation",
        },
    ],
}
