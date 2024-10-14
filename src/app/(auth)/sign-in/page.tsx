import { redirect } from "next/navigation";
import { auth } from "@/auth";

const SignInPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <div>Sign in</div>;
};

export default SignInPage;
