import type React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            TrussHair
          </Link>
          <div className="space-x-4">
            <Link href="/" className={router.pathname === "/" ? "text-cyan-400" : ""}>
              HOME
            </Link>
            <Link href="/products" className={router.pathname.startsWith("/products") ? "text-cyan-400" : ""}>
              PRODUCTOS
            </Link>
            <Link href="/about" className={router.pathname === "/about" ? "text-cyan-400" : ""}>
              MUNDO TRUSS
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">© 2023 TrussHair. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default Layout

