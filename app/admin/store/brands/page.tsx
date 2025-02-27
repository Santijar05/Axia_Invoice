import { Metadata } from "next"

import ScreenBrands from "@/modules/brands/ScreenBrands";

export const metadata: Metadata = {
  title: "Brand",
  description: "Product brands registered in your Axia",
  alternates: {
    canonical: 'https://mydomain.com/store/brands'
  }
}

export default function LoginPage() {

    return(
        <div className="w-full h-full">
            <ScreenBrands/>
        </div>
    );

}