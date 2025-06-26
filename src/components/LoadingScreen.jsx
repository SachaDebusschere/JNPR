import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

function LoadingScreen({ onComplete }) {
  const containerRef = useRef()
  const logoRef = useRef()

  useEffect(() => {
    // Empêcher le scroll du document body
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    // Timeline de l'animation de chargement
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out rapide vers la page de résultat
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })
      }
    })

    // Animation de rotation du logo (360° en 3.8 secondes pour finir pile à temps)
    tl.fromTo(logoRef.current, 
      {
        rotation: 0,
        scale: 0.7,
        opacity: 0.4
      },
      {
        rotation: 360,
        scale: 1,
        opacity: 1,
        duration: 3.8,
        ease: "power1.inOut"
      }
    )

    // Nettoyer au démontage
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [onComplete])

  return (
    <section 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden z-[100]" 
      style={{ 
        maxWidth: '100vw', 
        maxHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/img/fond-final.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Logo JNPR qui tourne */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <img 
          ref={logoRef}
          src="/img/logo-jnpr.png" 
          alt="Logo JNPR"
          style={{
            width: 'clamp(120px, 30vw, 200px)',
            height: 'auto',
            filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
          }}
        />
      </div>

      {/* Texte de chargement */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none">
        <div className="text-center">
          <p 
            className="font-formula font-bold text-lg"
            style={{ 
              color: '#1D3D56',
              textShadow: '0 2px 4px rgba(255,255,255,0.5)',
              letterSpacing: '1px'
            }}
          >
            ANALYSE DES SAVEURS...
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoadingScreen 