import { useRef } from 'react'
import { gsap } from 'gsap'

function Link({ children, href, onClick, className = '', ...props }) {
  const linkRef = useRef()
  const backgroundRef = useRef()

  const handleMouseEnter = () => {
    // Changer l'origine de transformation pour l'entrée
    gsap.set(backgroundRef.current, {
      transformOrigin: "left center"
    })
    
    // Animation du background de gauche à droite
    gsap.fromTo(backgroundRef.current, 
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 0.3, 
        ease: "power2.out"
      }
    )
    
    // Animation du texte vers blanc
    gsap.to(linkRef.current, {
      color: '#ffffff',
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = () => {
    // Changer l'origine de transformation pour que le bg reparte vers la gauche
    gsap.set(backgroundRef.current, {
      transformOrigin: "left center"
    })
    
    // Animation du background qui se rétracte vers la gauche
    gsap.to(backgroundRef.current, {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.out"
    })
    
    // Animation du texte vers noir
    gsap.to(linkRef.current, {
      color: '#000000',
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
  }

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative inline-block
        font-formula font-bold
        text-black
        uppercase tracking-wider
        text-lg
        cursor-pointer
        overflow-hidden
        px-1
        ${className}
      `}
      {...props}
    >
      {/* Background animé */}
      <span
        ref={backgroundRef}
        className="absolute inset-0 bg-black scale-x-0 -mx-1"
        style={{ transformOrigin: 'left center' }}
      />
      
      {/* Texte */}
      <span className="relative z-10">
        {children}
      </span>
    </a>
  )
}

export default Link 