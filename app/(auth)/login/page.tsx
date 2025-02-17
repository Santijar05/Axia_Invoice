import { Metadata } from "next"
import ScreenLogin from "@/modules/auth/ScreenLogin"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account to access your Axia",
  alternates: {
    canonical: 'https://mydomain.com/login'
  }
}

export default function LoginPage() {

  return(
    <div className="w-full">
      <ScreenLogin />
    </div>
  );

}