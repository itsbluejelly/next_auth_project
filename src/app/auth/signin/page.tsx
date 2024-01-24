import Link from "next/link";
import SignInForm from "../../components/SignInForm";

type Props = { searchParams: { callbackURL?: String }}

export default function SignInPage({searchParams}: Props) {
  return (
    <div className="flex items-center justify-center flex-col w-full">
        <SignInForm/>
        <Link href={"/auth/forgotPass"}>Forgot Your Password?</Link>
    </div>
  )
}