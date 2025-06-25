import { useRef } from 'react'
import { gsap } from 'gsap'

function Header({ variant = 'default', className = '', ...props }) {
  const headerRef = useRef()

  // Configuration des couleurs selon le variant
  const getVariantClasses = () => {
    if (variant === 'white') {
      return {
        background: 'bg-white',
        textColor: 'text-white',
        iconFilter: 'invert(1)' // Icônes blanches
      }
    }
    return {
      background: 'bg-transparent', // Fond transparent
      textColor: 'text-black',
      iconFilter: 'none' // Icônes noires par défaut
    }
  }

  const { background, textColor, iconFilter } = getVariantClasses()

  return (
    <header 
      ref={headerRef}
      className={`
        fixed top-0 left-0 right-0 z-50
        ${background}
        px-4 py-3
        flex items-center justify-between
        w-full
        ${className}
      `}
      {...props}
    >
      {/* Section gauche - Menu + COCKTAILS */}
      <div className="flex items-center gap-3">
        <button 
          className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-200"
          aria-label="Menu"
        >
          <img 
            src="/img/menu-burger-icon.png"
            alt="Menu"
            className="w-5 h-5"
            style={{ filter: iconFilter }}
          />
          <span 
            className={`font-suisse-mono font-normal uppercase tracking-wider text-sm ${textColor}`}
          >
            COCKTAILS
          </span>
        </button>
      </div>

      {/* Section centre - Logo JNPR */}
      <div className="flex items-center justify-center">
        <img 
          src="/img/logo-jnpr.png"
          alt="JNPR Logo"
          className="h-12 w-auto"
          style={{ 
            filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none'
          }}
        />
      </div>

      {/* Section droite - Search + Shop */}
      <div className="flex items-center gap-3">
        <button 
          className="hover:opacity-70 transition-opacity duration-200"
          aria-label="Rechercher"
        >
          <img 
            src="/img/search-icon.png"
            alt="Recherche"
            className="w-5 h-5"
            style={{ filter: iconFilter }}
          />
        </button>
        
        <button 
          className="hover:opacity-70 transition-opacity duration-200"
          aria-label="Panier"
        >
          <img 
            src="/img/shop-icon.png"
            alt="Panier"
            className="w-5 h-5"
            style={{ filter: iconFilter }}
          />
        </button>
      </div>
    </header>
  )
}

export default Header 