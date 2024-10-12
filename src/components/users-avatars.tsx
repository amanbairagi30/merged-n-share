import AvatarCircles from "./ui/avatar-circle";

const avatarUrls = [
    {
        img: "https://avatars.githubusercontent.com/u/8079861",
        href: "https://merged-n-share.vercel.app/profile/hkirat"
    },
    {
        img: "https://avatars.githubusercontent.com/u/76874341",
        href: "https://merged-n-share.vercel.app/profile/devsargam"
    },
    {
        img: "https://avatars.githubusercontent.com/u/37402791",
        href: "https://merged-n-share.vercel.app/profile/nimit9"
    },
    {
        img: "https://avatars.githubusercontent.com/u/89733575",
        href: "https://merged-n-share.vercel.app/profile/TanmayDhobale"
    },
];

export async function UsersAvatar() {
    return <AvatarCircles numPeople={0} avatarUrls={avatarUrls} />;
}