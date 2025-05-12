import { Metadata } from "next"

import ScreenPurchase from "@/src/modules/make-purchase/ScreenPurchase";

export const metadata: Metadata = {
  title: "Make Purchase",
  description: "Products registered in your Axia",
  alternates: {
    canonical: 'https://mydomain.com/store/products'
  }
}

export default function MakePurchasePage() {

  return(
    <div className="w-full h-full min-h-screen flex bg-white">
      <ScreenPurchase/>
    </div>
  );

}