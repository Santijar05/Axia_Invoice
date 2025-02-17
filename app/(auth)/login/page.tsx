import { Metadata } from "next"
import ScreenLogin from "@/modules/auth/ScreenLogin"

export const metadata: Metadata = {
  title: "Login for pets",
  description: "Login to your account to access your pets",
  alternates: {
    canonical: 'https://mydomain.com/login'
  }
}

export default function LoginPage() {

  return (
      <ScreenLogin />
  )
}