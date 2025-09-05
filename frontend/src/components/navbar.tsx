import { useState } from "react"

type NavLink = {
  label: string
  href: string
}

type NavbarProps = {
  brand: string
  links: NavLink[]
}

const Navbar: React.FC<NavbarProps> = ({ brand, links }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="text-2xl font-bold">{brand}</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-gray-200 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl">✖</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-2 pt-2 pb-3 space-y-1">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="block px-3 py-2 rounded hover:bg-blue-400 transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
