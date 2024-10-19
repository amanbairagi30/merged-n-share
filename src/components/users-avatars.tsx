import AvatarCircles from './ui/avatar-circle';

const avatarUrls = [
  {
    img: 'https://avatars.githubusercontent.com/u/8079861',
    href: `${process.env.NEXT_PUBLIC_URL}/profile/hkirat`,
  },
  {
    img: 'https://avatars.githubusercontent.com/u/76874341',
    href: `${process.env.NEXT_PUBLIC_URL}/profile/devsargam`,
  },
  {
    img: 'https://avatars.githubusercontent.com/u/37402791',
    href: `${process.env.NEXT_PUBLIC_URL}/profile/nimit9`,
  },
  {
    img: 'https://avatars.githubusercontent.com/u/89733575',
    href: `${process.env.NEXT_PUBLIC_URL}/profile/TanmayDhobale`,
  },
];

export async function UsersAvatar() {
  return <AvatarCircles numPeople={100} avatarUrls={avatarUrls} />;
}
