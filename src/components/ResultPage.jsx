import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Button from './Button'

function ResultPage({ questionnaireData }) {
  const containerRef = useRef()
  const photoRef = useRef()

  useEffect(() => {
    // Empêcher le scroll du document body
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    // Animation de dissolution dessin vers photo après 2 secondes
    const timer = setTimeout(() => {
      if (photoRef.current) {
        // Animation de dissolution progressive avec léger zoom
        gsap.fromTo(photoRef.current, 
          {
            opacity: 0,
            scale: 1
          },
          {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power1.inOut"
          }
        )
      }
    }, 1000)
    
    // Nettoyer au démontage
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
      clearTimeout(timer)
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden z-50" 
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
      {/* Background avec texture */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/img/fond-final.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 1
          }}
        />
        
        {/* Logo JNPR en filigrane - en haut à droite */}
        <div 
          className="absolute top-0 right-0 opacity-15"
          style={{
            transform: 'rotate(-15deg) scale(1.8)',
            transformOrigin: 'top right',
            top: '-1%',
            right: '5%',
            zIndex: 15
          }}
        >
          <img 
            src="/img/logo-jnpr.png" 
            alt="Logo JNPR filigrane"
            className="w-auto h-24"
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 h-full w-full overflow-y-auto">
        <div className="min-h-full flex flex-col">
          
          {/* Header avec titres */}
          <div 
            className="text-left mb-3" 
            style={{ 
              position: 'relative', 
              zIndex: 10,
              paddingTop: 'clamp(1.5rem, 4vh, 2.5rem)',
              paddingLeft: 'clamp(1.5rem, 5vw, 2.5rem)',
              paddingRight: 'clamp(1rem, 4vw, 2rem)'
            }}
          >
            {/* Titre principal RECETTE */}
            <h1 
              className="font-formula font-bold leading-none mb-0"
              style={{
                color: '#4A7B9C',
                fontSize: 'clamp(4rem, 9vw, 6rem)',
                letterSpacing: '0.02em'
              }}
            >
              RECETTE
            </h1>

            {/* Sous-titre */}
            <h2 
              className="font-formula font-bold leading-tight"
              style={{
                color: '#1D3D56',
                fontSize: 'clamp(2rem, 6vw, 3.2rem)',
                maxWidth: '380px',
                marginTop: '-0.6rem'
              }}
            >
              CECI N'EST PAS<br />UN GINTO
            </h2>
          </div>

          {/* Informations de la recette */}
          <div 
            className="relative w-full" 
            style={{ 
              position: 'relative', 
              zIndex: 10,
              paddingLeft: 'clamp(1.5rem, 5vw, 2.5rem)',
              marginBottom: '-1px'
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-8">
                {/* Temps */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span 
                      className="font-formula font-bold"
                      style={{
                        color: '#151515',
                        fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                        marginBottom: '-0.2rem'
                      }}
                    >
                      10
                    </span>
                    <img 
                      src="/img/temps.png" 
                      alt="Temps"
                      className="w-5 h-5"
                    />
                  </div>
                  <span 
                    className="font-suisse font-normal text-sm"
                    style={{ color: '#151515', opacity: 0.8 }}
                  >
                    MINUTE
                  </span>
                </div>

                {/* Difficulté */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span 
                      className="font-formula font-bold"
                      style={{
                        color: '#151515',
                        fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                        marginBottom: '-0.2rem'
                      }}
                    >
                      09/10
                    </span>
                    <img 
                      src="/img/difficulte.png" 
                      alt="Difficulté"
                      className="w-5 h-5"
                    />
                  </div>
                  <span 
                    className="font-suisse font-normal text-sm"
                    style={{ color: '#151515', opacity: 0.8 }}
                  >
                    DIFFICULTÉ
                  </span>
                </div>
              </div>

              {/* BTTR - Rectangle plein collé à droite */}
              <div 
                className="px-4 py-3"
                style={{
                  backgroundColor: '#1C3B52',
                  borderRadius: '0',
                  position: 'relative',
                  zIndex: 20
                }}
              >
                <span 
                  className="font-suisse font-normal text-sm text-white"
                >
                  BTTR n°3
                </span>
              </div>
            </div>
          </div>

          {/* Image du cocktail - prend tout l'espace restant */}
          <div className="relative flex-1" style={{ position: 'relative', zIndex: 5 }}>
            {/* Dessin du cocktail (base) */}
            <div 
              className="absolute inset-0"
              style={{
                top: '0',
                left: '0',
                right: '0',
                bottom: '0'
              }}
            >
              <img 
                src="/img/dessin_cocktail.png" 
                alt="Illustration du cocktail"
                className="w-full h-full object-cover object-center"
                style={{
                  filter: 'contrast(1.1) brightness(0.95)'
                }}
              />
            </div>

            {/* Photo du cocktail (overlay animé) */}
            <div 
              className="absolute inset-0"
              style={{
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                zIndex: 1
              }}
            >
              <img 
                ref={photoRef}
                src="/img/photo_cocktail.png" 
                alt="Photo du cocktail"
                className="w-full h-full object-cover object-center"
                style={{
                  filter: 'contrast(1.1) brightness(0.95)',
                  opacity: 0
                }}
              />
            </div>

            {/* Bouton d'action par dessus l'image */}
            <div 
              className="absolute bottom-0 left-0 right-0 text-center pb-8"
              style={{ zIndex: 20 }}
            >
              <Button 
                variant="primary"
                className="mx-auto"
                style={{
                  fontSize: 'clamp(1rem, 3.8vw, 1.4rem)',
                  padding: 'clamp(0.8rem, 2.8vw, 1.2rem) clamp(2rem, 6vw, 3rem)',
                  fontWeight: '500'
                }}
              >
                DÉCOUVRIR
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ResultPage 