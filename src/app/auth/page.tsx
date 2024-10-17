import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M&S | Authentication",
  description: "",
  openGraph: {
    type: 'website',
    title: "M&S | Authentication",
    description: "Showcase your open source contributions as Proof of Work by sharing your merged pull requests to anyone around the world with help of Merged&Share",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/api/og-images/root`,
        alt: 'og-image-for-home-page'
      }
    ]
  }
};

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if(session){
    redirect("/work/dashboard");
  } 
  return <SignIn />;
};

export default SigninPage;
