'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo, LanguageSwitcher, UserMenu } from './navbar/NavbarControls'
import { DesktopNavigation } from './navbar/DesktopNavigation'
import { MobileMenu } from './navbar/MobileMenu'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <UserMenu />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>
    </nav>
  )
}
