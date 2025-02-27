import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-4 mt-8">
      <div className="flex justify-between items-center">
        <div className="space-x-4">
            <a href={"/privacy"} className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </a>

            <a href={"/terms"} className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </a>
        </div>
        <div className="text-black">© 2025 Your Company. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer

