import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'

// TODO: Ajouter Draggable plugin plus tard
// import { Draggable } from 'gsap/Draggable'
// gsap.registerPlugin(Draggable)

function Slider() {
  const sliderRef = useRef()
  const containerRef = useRef()
  const decorativeElementRef = useRef()
  const backgroundOverlayRef = useRef()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides] = useState(3) // Pour l'instant 3 slides de démo
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Configuration des éléments décoratifs par slide
  const decorativeElements = [
    {
      image: '/img/slider/vegetaux.png',
      alt: 'Végétaux',
      scale: 1.2,
      translateY: '-10%',
      translateX: '-1%',
      backgroundColor: '#F4FFE3' // Couleur de background pour cette slide
    },
    {
      image: '/img/slider/epices.png',
      alt: 'Épices',
      scale: 1.2,
      translateY: '-8%',
      translateX: '+1%',
      backgroundColor: '#FFD392' // bg-jnpr-spice
    },
    {
      image: '/img/slider/vegetaux.png', // Placeholder pour slide 3
      alt: 'Élément décoratif',
      scale: 1.2,
      translateY: '-6%',
      translateX: '0%',
      backgroundColor: '#dcfce7' // bg-green-100
    }
  ]

  const animateDecorativeElement = (slideIndex, direction = 'next') => {
    if (!decorativeElementRef.current || !backgroundOverlayRef.current) return
    
    const element = decorativeElements[slideIndex]
    
    // EFFET RIDEAUX : positions claires
    // next (A→B) : sortie GAUCHE (-100%), entrée DROITE (100% → position finale)
    // prev (B→A) : sortie DROITE (100%), entrée GAUCHE (-100% → position finale)
    const isGoingToNext = direction === 'next'
    
    const exitDirection = isGoingToNext ? '-100%' : '100%'
    const enterDirection = isGoingToNext ? '100%' : '-100%'
    const finalPosition = element.translateX.replace('+', '') // Supprimer le + si présent
    
    // Timeline pour orchestrer les animations
    const tl = gsap.timeline()
    
    // 1. Animer la couleur de background en parallèle
    tl.to(backgroundOverlayRef.current, {
      backgroundColor: element.backgroundColor,
      duration: 0.8,
      ease: "power2.inOut"
    }, 0)
    
    // 2. Animation de sortie COMPLÈTE de l'élément actuel
    tl.to(decorativeElementRef.current, {
      x: exitDirection,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    }, 0)
    
    // 3. Pause et changement d'image (quand l'ancien est complètement sorti)
    tl.call(() => {
      // Changer l'image
      decorativeElementRef.current.src = element.image
      decorativeElementRef.current.alt = element.alt
    }, null, 0.4)
    
    // 4. Positionner le nouvel élément hors écran du bon côté
    tl.set(decorativeElementRef.current, {
      x: enterDirection,
      y: element.translateY,
      scale: element.scale,
      opacity: 0
    }, 0.45)
    
    // 5. Animation d'entrée du nouvel élément
    tl.to(decorativeElementRef.current, {
      x: finalPosition,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, 0.5)
  }

  const goToSlide = (index) => {
    if (!containerRef.current || !sliderRef.current) return
    const slideWidth = containerRef.current.offsetWidth
    
    // Déterminer la direction
    const direction = index > currentSlide ? 'next' : 'prev'
    
    // Animation du slider
    gsap.to(sliderRef.current, {
      x: -index * slideWidth,
      duration: 0.5,
      ease: "power2.out"
    })
    
    // Animation de l'élément décoratif si ce n'est pas la première initialisation
    if (currentSlide !== index) {
      animateDecorativeElement(index, direction)
    }
    
    setCurrentSlide(index)
  }

  // Fonctions touch pour mobile
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }

  useEffect(() => {
    // Initialiser l'élément décoratif et le background pour la première slide
    if (decorativeElementRef.current && backgroundOverlayRef.current) {
      const element = decorativeElements[0]
      decorativeElementRef.current.src = element.image
      decorativeElementRef.current.alt = element.alt
      
      // Initialiser les transformations via GSAP
      gsap.set(decorativeElementRef.current, {
        x: element.translateX,
        y: element.translateY,
        scale: element.scale
      })
      
      // Initialiser la couleur de background
      backgroundOverlayRef.current.style.backgroundColor = element.backgroundColor
    }
    
    // Démarrer sur la première slide après le premier render
    setTimeout(() => goToSlide(0), 100)
  }, [])

  return (
    <section className="fixed inset-0 w-full h-full overflow-hidden z-50">
      {/* Background overlay animé */}
      <div 
        ref={backgroundOverlayRef}
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: '#F4FFE3' }}
      />
      
      {/* Container principal */}
      <div 
        ref={containerRef} 
        className="h-full w-full relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Verre fixe - en arrière-plan */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <img 
            src="/img/slider/verre.png" 
            alt="Verre cocktail" 
            className="w-full h-full object-contain"
            style={{
              objectPosition: 'center center',
              transform: 'scale(0.8)'
            }}
          />
        </div>

        {/* Élément décoratif animé - au premier plan */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <img 
            ref={decorativeElementRef}
            src="/img/slider/vegetaux.png" 
            alt="Végétaux" 
            className="w-full h-full object-contain"
            style={{
              objectPosition: 'center center'
            }}
          />
        </div>

        {/* Slider container - textures et textes seulement */}
        <div ref={sliderRef} className="flex h-full relative z-10">
          
          {/* Slide 1 - Léger et rafraîchissant */}
          <div className="w-full h-full flex-shrink-0 relative">
            {/* Background texture */}
            <div 
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: 'url(/img/slider/texture-bg.png)',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Contenu texte seulement */}
            <div className="relative z-10 h-full flex flex-col justify-between py-8" style={{
              paddingLeft: 'clamp(1rem, 4vw, 2rem)',
              paddingRight: 'clamp(1rem, 4vw, 2rem)'
            }}>
              {/* Titre en haut */}
              <div className="text-center" style={{
                marginTop: 'clamp(0.5rem, 2vh, 1rem)'
              }}>
                <h2 className="font-formula font-light text-black leading-tight" style={{
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)'
                }}>
                  Dans quelle ambiance<br />êtes-vous?
                </h2>
              </div>

              {/* Zone centrale vide - les images sont dans les containers fixes */}
              <div className="flex-1 relative">
                {/* Cette zone est maintenant utilisée par les containers fixes */}
              </div>

              {/* Texte en bas */}
              <div className="text-center" style={{
                marginBottom: 'clamp(1rem, 3vh, 2rem)'
              }}>
                <h3 className="font-formula font-bold text-black" style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)'
                }}>
                  Léger et rafraîchissant
                </h3>
              </div>
            </div>
          </div>

          {/* Slide 2 - Chaleureux et épicé */}
          <div className="w-full h-full flex-shrink-0 relative">
            {/* Background texture */}
            <div 
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: 'url(/img/slider/texture-bg.png)',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Contenu texte seulement */}
            <div className="relative z-10 h-full flex flex-col justify-between py-8" style={{
              paddingLeft: 'clamp(1rem, 4vw, 2rem)',
              paddingRight: 'clamp(1rem, 4vw, 2rem)'
            }}>
              {/* Titre en haut */}
              <div className="text-center" style={{
                marginTop: 'clamp(0.5rem, 2vh, 1rem)'
              }}>
                <h2 className="font-formula font-light text-black leading-tight" style={{
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)'
                }}>
                  Dans quelle ambiance<br />êtes-vous?
                </h2>
              </div>

              {/* Zone centrale vide - les images sont dans les containers fixes */}
              <div className="flex-1 relative">
                {/* Cette zone est maintenant utilisée par les containers fixes */}
              </div>

              {/* Texte en bas */}
              <div className="text-center" style={{
                marginBottom: 'clamp(1rem, 3vh, 2rem)'
              }}>
                <h3 className="font-formula font-bold text-black" style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)'
                }}>
                  Chaleureux et épicé
                </h3>
              </div>
            </div>
          </div>

          {/* Slide 3 - Exemple */}
          <div className="w-full h-full flex-shrink-0 relative">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="font-formula font-light text-black text-3xl mb-4">
                  Slide 3
                </h2>
                <p className="font-formula font-bold text-black text-xl">
                  Contenu à définir
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Slider 