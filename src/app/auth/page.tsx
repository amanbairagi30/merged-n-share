import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if(session){
    redirect("/work/dashboard");
  } 
  return <SignIn />;
};

export default SigninPage;
