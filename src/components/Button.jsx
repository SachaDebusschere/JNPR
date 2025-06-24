import { useRef } from 'react'
import { gsap } from 'gsap'

function Button({ children, onClick, className = '', variant = 'primary', ...props }) {
  const buttonRef = useRef()

  const handleMouseEnter = () => {
    if (variant === 'secondary') {
      gsap.to(buttonRef.current, {
        backgroundColor: '#000000',
        color: '#ffffff',
        borderColor: 'transparent',
        duration: 0.1,
        ease: "power2.out"
      })
    } else {
      gsap.to(buttonRef.current, {
        backgroundColor: '#ffffff',
        color: '#000000',
        borderColor: 'transparent',
        duration: 0.1,
        ease: "power2.out"
      })
    }
  }

  const handleMouseLeave = () => {
    if (variant === 'secondary') {
      gsap.to(buttonRef.current, {
        backgroundColor: '#faf6ed',
        color: '#000000',
        borderColor: '#ccc9c1',
        duration: 0.1,
        ease: "power2.out"
      })
    } else {
      gsap.to(buttonRef.current, {
        backgroundColor: '#000000',
        color: '#ffffff',
        borderColor: '#000000',
        duration: 0.1,
        ease: "power2.out"
      })
    }
  }

  const getVariantClasses = () => {
    if (variant === 'secondary') {
      return 'bg-[#faf6ed] text-black border-2'
    }
    return 'bg-black text-white border-2 border-black'
  }

  const getInitialStyle = () => {
    if (variant === 'secondary') {
      return { borderColor: '#ccc9c1', backgroundColor: '#faf6ed' }
    }
    return { borderColor: '#000000' }
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        ${getVariantClasses()}
        font-suisse-mono font-normal
        px-6 py-3
        hover:cursor-pointer
        uppercase tracking-wider
        text-sm
        ${className}
      `}
      style={getInitialStyle()}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button 