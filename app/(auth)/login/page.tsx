import { Metadata } from "next"
import ScreenLogin from "@/modules/auth/login/ScreenLogin"

export const metadata: Metadata = {
  title: "Login for pets",
  description: "Login to your account to access your pets",
  alternates: {
    canonical: 'https://mydomain.com/login'
  }
}

export default function LoginPage() {

  return(
    <div className="flex justify-center items-center">
      <ScreenLogin />
    </div>
  );

}