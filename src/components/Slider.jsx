import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Button from './Button'

// TODO: Ajouter Draggable plugin plus tard
// import { Draggable } from 'gsap/Draggable'
// gsap.registerPlugin(Draggable)

function Slider() {
  const sliderRef = useRef()
  const containerRef = useRef()
  const decorativeElementRef = useRef()
  const backgroundOverlayRef = useRef()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState('ambiance') // 'ambiance' ou 'occasions'
  const [previousAmbianceSlide, setPreviousAmbianceSlide] = useState(0) // Sauvegarder la slide de la première question
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
  // Déterminer le nombre total de slides selon la question
  const totalSlides = currentQuestion === 'ambiance' ? 4 : 5

  // Configuration des éléments décoratifs par slide selon la question
  const ambianceElements = [
    {
      image: '/img/slider/Categories_PNG/vegetaux.png',
      alt: 'Végétaux',
      scale: 0.8,
      translateY: '-2%',
      translateX: '0%',
      backgroundColor: '#F4FFE3'
    },
    {
      image: '/img/slider/Categories_PNG/epices.png',
      alt: 'Épices',
      scale: 0.8,
      translateY: '-2%',
      translateX: '+1%',
      backgroundColor: '#FFD392'
    },
    {
      image: '/img/slider/Categories_PNG/intense.png',
      alt: 'Intense',
      scale: 0.8,
      translateY: '-3%',
      translateX: '0%',
      backgroundColor: '#FDE9FB'
    },
    {
      image: '/img/slider/Categories_PNG/surprise.png',
      alt: 'Surprise',
      scale: 0.8,
      translateY: '-2%',
      translateX: '-2%',
      backgroundColor: '#FCFCFC'
    }
  ]

  const occasionsElements = [
    {
      image: '/img/slider/Moments_PNG/soiree.png',
      alt: 'Soirée',
      scale: 1.0,
      translateY: '2%',
      translateX: '0%',
      backgroundColor: '#FCFCFC'
    },
    {
      image: '/img/slider/Moments_PNG/amis.png',
      alt: 'Entre amis',
      scale: 1.0,
      translateY: '2%',
      translateX: '0%',
      backgroundColor: '#FCFCFC'
    },
    {
      image: '/img/slider/Moments_PNG/tete_a_tete.png',
      alt: 'Tête à tête',
      scale: 1.0,
      translateY: '2%',
      translateX: '0%',
      backgroundColor: '#FCFCFC'
    },
    {
      image: '/img/slider/Moments_PNG/diner.png',
      alt: 'Dîner',
      scale: 1.0,
      translateY: '2%',
      translateX: '0%',
      backgroundColor: '#FCFCFC'
    },
    {
      image: '/img/slider/Moments_PNG/seul.png',
      alt: 'Seul',
      scale: 1.0,
      translateY: '2%',
      translateX: '0%',
      backgroundColor: '#FCFCFC'
    }
  ]

  // Choisir la configuration selon la question actuelle
  const decorativeElements = currentQuestion === 'ambiance' ? ambianceElements : occasionsElements

  // Configuration des couleurs du titre selon la slide
  const getTitleColors = () => {
    if (currentQuestion !== 'ambiance') return { primary: '#151515', secondary: '#A3A177' }
    
    switch (currentSlide) {
      case 0:
        return { primary: '#151515', secondary: '#A3A177', primaryOpacity: 0.4, secondaryOpacity: 1 }
      case 1:
        return { primary: '#A7844F', secondary: '#A7844F', primaryOpacity: 0.8, secondaryOpacity: 1 }
      case 2:
        return { primary: '#C79D9C', secondary: '#C79D9C', primaryOpacity: 0.8, secondaryOpacity: 1 }
      case 3:
        return { primary: '#151515', secondary: '#151515', primaryOpacity: 0.6, secondaryOpacity: 1 }
      default:
        return { primary: '#151515', secondary: '#A3A177', primaryOpacity: 0.4, secondaryOpacity: 1 }
    }
  }

  const titleColors = getTitleColors()

  // Fonction pour passer à la question suivante avec animation
  const goToNextQuestion = () => {
    // Sauvegarder la slide actuelle de la première question
    setPreviousAmbianceSlide(currentSlide)
    
    // Timeline pour l'animation de transition complète
    const tl = gsap.timeline()
    
    // 1. ANIMATION OUT - Faire disparaître tous les éléments de la première question
    tl.to([decorativeElementRef.current, '.verre-container'], {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power2.inOut"
    })
    
    // Les icônes de navigation sont maintenant gérées par le rendu conditionnel
    
    // 2. Transition du background
    tl.to(backgroundOverlayRef.current, {
      backgroundColor: '#FCFCFC',
      duration: 0.4,
      ease: "power2.inOut"
    }, 0.2)
    
    // 3. Changer de question et réinitialiser la position du slider
    tl.call(() => {
      setCurrentQuestion('occasions')
      setCurrentSlide(0)
      // Réinitialiser la position du slider immédiatement
      if (sliderRef.current) {
        gsap.set(sliderRef.current, { x: 0 })
      }
    }, null, 0.6)
    
    // 4. Attendre que React ait rendu les nouveaux éléments puis lancer l'animation IN
    tl.call(() => {
      // Attendre 2 frames pour s'assurer que le DOM est mis à jour
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Vérifier que les éléments existent avant de les animer
          const header = document.querySelector('.question-occasions-header')
          const image = document.querySelector('.moments-image')
          const buttons = document.querySelectorAll('.occasions-button')
          
          if (header) {
            gsap.fromTo(header, {
              opacity: 0,
              y: -50
            }, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            })
          }
          
          if (image) {
            gsap.fromTo(image, {
              opacity: 0,
              scale: 0.6
            }, {
              opacity: 1,
              scale: 0.8,
              duration: 0.7,
              ease: "back.out(1.7)",
              delay: 0.1
            })
          }
          
          if (buttons.length > 0) {
            gsap.fromTo(buttons, {
              opacity: 0,
              y: 30
            }, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: 0.3,
              stagger: 0.1 // Effet cascadé pour tous les boutons
            })
          }
        })
      })
    }, null, 0.8)
  }

  // Fonction pour retourner à la première question sur la slide précédente
  const goBackToPreviousQuestion = () => {
    // Timeline pour l'animation de transition de retour
    const tl = gsap.timeline()
    
    // 1. ANIMATION OUT - Faire disparaître les éléments de la deuxième question (inverse de l'animation IN)
    
    // Header remonte vers le haut
    const header = document.querySelector('.question-occasions-header')
    if (header) {
      tl.to(header, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in"
      }, 0)
    }
    
    // Image des moments rétrécit et disparaît
    const image = document.querySelector('.moments-image')
    if (image) {
      tl.to(image, {
        opacity: 0,
        scale: 0.6,
        duration: 0.5,
        ease: "back.in(1.7)"
      }, 0.1)
    }
    
    // Boutons descendent et disparaissent en cascade
    const buttons = document.querySelectorAll('.occasions-button')
    if (buttons.length > 0) {
      tl.to(buttons, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power2.in",
        stagger: -0.1 // Effet cascadé inverse
      }, 0.2)
    }
    
    // Transition du background
    tl.to(backgroundOverlayRef.current, {
      backgroundColor: '#F4FFE3', // Retour au vert de la première question
      duration: 0.4,
      ease: "power2.inOut"
    }, 0.3)
    
    // 2. Changer de question et positionner sur la slide précédente
    tl.call(() => {
      setCurrentQuestion('ambiance')
      setCurrentSlide(previousAmbianceSlide)
      // Positionner le slider sur la slide sauvegardée
      if (sliderRef.current && containerRef.current) {
        const slideWidth = containerRef.current.offsetWidth
        gsap.set(sliderRef.current, { x: -previousAmbianceSlide * slideWidth })
      }
    }, null, 0.7)
    
    // 3. ANIMATION IN - Faire réapparaître les éléments de la première question (inverse de l'animation OUT)
    tl.call(() => {
      // Réinitialiser et faire apparaître l'élément décoratif
      if (decorativeElementRef.current) {
        const element = ambianceElements[previousAmbianceSlide]
        decorativeElementRef.current.src = element.image
        decorativeElementRef.current.alt = element.alt
        
        // Positionner les éléments en état "sortis"
        gsap.set(decorativeElementRef.current, {
          x: element.translateX,
          y: element.translateY,
          scale: 0.8, // Commencer plus petit
          opacity: 0
        })
        
        gsap.set('.verre-container', {
          opacity: 0,
          scale: 0.8
        })
        
        // Animation d'entrée : grandir et apparaître
        gsap.to(decorativeElementRef.current, {
          opacity: 1,
          scale: element.scale, // Aller à la vraie scale
          duration: 0.6,
          ease: "power2.out"
        })
        
        gsap.to('.verre-container', {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        })
      }
      
      // Animation du titre - descend du haut (inverse de l'animation OUT)
      requestAnimationFrame(() => {
        const titleContainer = document.querySelector('.ambiance-title')
        if (titleContainer) {
          gsap.fromTo(titleContainer, {
            opacity: 0,
            y: -30
          }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.2
          })
        }
      })
      
      // Changer la couleur de background selon la slide
      if (backgroundOverlayRef.current) {
        gsap.to(backgroundOverlayRef.current, {
          backgroundColor: ambianceElements[previousAmbianceSlide].backgroundColor,
          duration: 0.5,
          ease: "power2.out"
        })
      }
    }, null, 0.9)
  }

  const animateDecorativeElement = (slideIndex, direction = 'next') => {
    if (!decorativeElementRef.current) return
    
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
    
    // 1. Animer la couleur de background en parallèle (seulement pour ambiance)
    if (currentQuestion === 'ambiance' && backgroundOverlayRef.current) {
      tl.to(backgroundOverlayRef.current, {
        backgroundColor: element.backgroundColor,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0)
    }
    
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
      scale: currentQuestion === 'occasions' ? 0.8 : element.scale, // Échelle adaptée selon la question
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
    // Initialiser selon la question actuelle
    if (currentQuestion === 'ambiance') {
      // Initialiser l'élément décoratif et le background pour la slide courante
      if (decorativeElementRef.current && backgroundOverlayRef.current) {
        const element = decorativeElements[currentSlide]
        decorativeElementRef.current.src = element.image
        decorativeElementRef.current.alt = element.alt
        
        // Initialiser les transformations via GSAP
        gsap.set(decorativeElementRef.current, {
          x: element.translateX,
          y: element.translateY,
          scale: element.scale,
          opacity: 1
        })
        
        // Initialiser la couleur de background
        backgroundOverlayRef.current.style.backgroundColor = element.backgroundColor
      }
      
      // S'assurer que le verre est visible pour la première question
      // Ne pas appeler goToSlide(0) si on revient d'une autre question
      setTimeout(() => {
        gsap.set('.verre-container', { opacity: 1, scale: 1 })
        // Seulement aller à la slide 0 si on est vraiment au début
        if (currentSlide === 0) {
          goToSlide(0)
        }
      }, 100)
          } else if (currentQuestion === 'occasions') {
        // Initialiser l'image pour la première slide des occasions
        if (decorativeElementRef.current) {
          const element = decorativeElements[0]
          decorativeElementRef.current.src = element.image
          decorativeElementRef.current.alt = element.alt
          
          // Initialiser les transformations pour les moments (cachés initialement)
          gsap.set(decorativeElementRef.current, {
            x: element.translateX,
            y: element.translateY,
            scale: 0.6, // Commencer plus petit pour l'animation
            opacity: 0 // Caché initialement
          })
        }
        
        // S'assurer que tous les éléments occasions sont cachés au départ
        requestAnimationFrame(() => {
          const header = document.querySelector('.question-occasions-header')
          const image = document.querySelector('.moments-image')
          const buttons = document.querySelectorAll('.occasions-button')
          
          if (header) gsap.set(header, { opacity: 0 })
          if (image) gsap.set(image, { opacity: 0 })
          if (buttons.length > 0) gsap.set(buttons, { opacity: 0 })
        })
        
        setTimeout(() => goToSlide(0), 100)
      }
      
      // Les icônes de navigation sont maintenant gérées par le rendu conditionnel React
      }, [currentQuestion])

  // Les icônes de navigation sont maintenant gérées uniquement par le rendu conditionnel

  return (
    <section className="fixed inset-0 w-full h-full overflow-hidden z-50">
      {/* Icônes de navigation - pour les deux questions */}
      {currentQuestion === 'ambiance' && (
        <>
          {/* Flèche retour en haut à gauche - noire */}
          <button 
            className="fixed top-4 left-4 z-[60] hover:opacity-70 transition-opacity duration-200"
            aria-label="Retour"
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'block !important'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#000" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          {/* Croix fermer en haut à droite - noire */}
          <button 
            className="fixed top-4 right-4 z-[60] hover:opacity-70 transition-opacity duration-200"
            aria-label="Fermer"
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'block !important'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="#000" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
      
      {/* Icônes de navigation - pour la deuxième question */}
      {currentQuestion === 'occasions' && (
        <>
          {/* Flèche retour en haut à gauche - blanche */}
          <button 
            className="fixed top-4 left-4 z-[60] hover:opacity-70 transition-opacity duration-200"
            aria-label="Retour"
            onClick={goBackToPreviousQuestion}
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'block !important'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#fff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          {/* Croix fermer en haut à droite - blanche */}
          <button 
            className="fixed top-4 right-4 z-[60] hover:opacity-70 transition-opacity duration-200"
            aria-label="Fermer"
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'block !important'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="#fff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
      
      {/* Background overlay animé */}
      <div 
        ref={backgroundOverlayRef}
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: currentQuestion === 'ambiance' ? '#F4FFE3' : '#FCFCFC' }}
      />
      
      {/* Background texture pour les occasions */}
      {currentQuestion === 'occasions' && (
        <div 
          className="absolute inset-0 w-full h-full opacity-50"
          style={{
            backgroundImage: 'url(/img/slider/Moments_PNG/texture-grain-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
      {/* Container principal */}
      <div 
        ref={containerRef} 
        className="h-full w-full relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Verre fixe - en arrière-plan (seulement pour la question ambiance) */}
        {currentQuestion === 'ambiance' && (
          <div className="verre-container absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <img 
              src="/img/slider/Categories_PNG/verre.png" 
              alt="Verre cocktail" 
              className="w-full h-full object-contain"
              style={{
                objectPosition: 'center center',
                transform: 'scale(0.55) translateY(8%)'
              }}
            />
          </div>
        )}

        {/* Élément décoratif animé - au premier plan (seulement pour la question ambiance) */}
        {currentQuestion === 'ambiance' && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <img 
              ref={decorativeElementRef}
              src="/img/slider/Categories_PNG/vegetaux.png" 
              alt="Végétaux" 
              className="w-full h-full object-contain"
              style={{
                objectPosition: 'center center'
              }}
            />
          </div>
        )}

        {/* Images des moments - pour la question occasions */}
        {currentQuestion === 'occasions' && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <img 
              ref={decorativeElementRef}
              src="/img/slider/Moments_PNG/soiree.png" 
              alt="Moment" 
              className="moments-image w-full h-full object-contain"
              style={{
                objectPosition: 'center center'
              }}
            />
          </div>
        )}

        {/* Titre fixe - au-dessus de tout */}
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
          {currentQuestion === 'ambiance' ? (
            <div className="ambiance-title text-center" style={{
              marginTop: 'clamp(2rem, 4vh, 3rem)'
            }}>
              <h2 className="font-formula font-bold leading-tight">
                <span style={{ 
                  color: titleColors.primary, 
                  opacity: titleColors.primaryOpacity,
                  fontSize: 'clamp(2.2rem, 4vw, 3rem)'
                }}>
                  CHOISISSEZ VOTRE
                </span>
                <br />
                <span style={{ 
                  color: titleColors.secondary,
                  opacity: titleColors.secondaryOpacity,
                  fontSize: 'clamp(4rem, 6.5vw, 5.5rem)'
                }}>
                  AMBIANCE
                </span>
              </h2>
            </div>
          ) : (
            <div 
              className="question-occasions-header text-center"
              style={{
                backgroundColor: '#1D3D56',
                paddingTop: 'clamp(1rem, 3vh, 2rem)',
                paddingBottom: 'clamp(1rem, 3vh, 2rem)',
                paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                paddingRight: 'clamp(1rem, 4vw, 2rem)'
              }}
            >
              <h2 className="font-formula font-bold leading-tight">
                <span style={{ 
                  color: '#507F9F', 
                  opacity: 0.8,
                  fontSize: 'clamp(2.2rem, 4vw, 3rem)'
                }}>
                  POUR QUELLE
                </span>
                <br />
                <span style={{ 
                  color: '#76A0BC',
                  opacity: 1,
                  fontSize: 'clamp(4rem, 6.5vw, 5.5rem)'
                }}>
                  OCCASION ?
                </span>
              </h2>
            </div>
          )}
        </div>

        {/* Indicateurs de pagination fixes - au-dessus de tout */}
        <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none">
          <div className="flex justify-center pb-8" style={{ pointerEvents: 'auto' }}>
            <div className="flex space-x-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-black scale-125' 
                      : 'bg-black/30 hover:bg-black/50'
                  }`}
                  aria-label={`Aller à la slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Slider container - textures et textes seulement */}
        <div ref={sliderRef} className="flex h-full relative z-10">
          
          {currentQuestion === 'ambiance' ? (
            <>
              {/* Slide 1 - Léger et rafraîchissant */}
              <div className="w-full h-full flex-shrink-0 relative">
                {/* Background texture */}
                <div 
                  className="absolute inset-0 opacity-90"
                  style={{
                    backgroundImage: 'url(/img/slider/Categories_PNG/texture-bg.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Contenu texte seulement */}
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                  {/* Button en bas */}
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                    <Button 
                      variant="primary"
                      onClick={goToNextQuestion}
                      className="flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      LÉGER ET RAFRAÎCHISSANT
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Slide 2 - Chaleureux et épicé */}
              <div className="w-full h-full flex-shrink-0 relative">
                {/* Background texture */}
                <div 
                  className="absolute inset-0 opacity-90"
                  style={{
                    backgroundImage: 'url(/img/slider/Categories_PNG/texture-bg.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Contenu texte seulement */}
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                  {/* Button en bas */}
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                    <Button 
                      variant="primary"
                      onClick={goToNextQuestion}
                      className="flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      CHALEUREUX ET ÉPICÉ
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Slide 3 - Élégant et intense */}
              <div className="w-full h-full flex-shrink-0 relative">
                {/* Background texture */}
                <div 
                  className="absolute inset-0 opacity-90"
                  style={{
                    backgroundImage: 'url(/img/slider/Categories_PNG/texture-bg.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Contenu texte seulement */}
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                  {/* Button en bas */}
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                    <Button 
                      variant="primary"
                      onClick={goToNextQuestion}
                      className="flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      ÉLÉGANT ET INTENSE
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Slide 4 - Surprenez-moi ! */}
              <div className="w-full h-full flex-shrink-0 relative">
                {/* Background texture */}
                <div 
                  className="absolute inset-0 opacity-90"
                  style={{
                    backgroundImage: 'url(/img/slider/Categories_PNG/texture-bg.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Contenu texte seulement */}
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                  {/* Button en bas */}
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                    <Button 
                      variant="primary"
                      onClick={goToNextQuestion}
                      className="flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      SURPRENEZ-MOI !
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="occasions-content flex w-full h-full">
              {/* Slide 1 - Soirée */}
              <div className="w-full h-full flex-shrink-0 relative">
                {/* Contenu texte seulement */}
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                                    {/* Button en bas */}
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                    <Button 
                      variant="primary"
                      className="occasions-button flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      BIEN COMMENCER LA SOIRÉE
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Slide 2 - Entre amis */}
              <div className="w-full h-full flex-shrink-0 relative">
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                                        <Button 
                      variant="primary"
                      className="occasions-button flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      TRINQUER AVEC DES AMIS
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Slide 3 - Tête à tête */}
              <div className="w-full h-full flex-shrink-0 relative">
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                                         <Button 
                      variant="primary"
                      className="occasions-button flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      EN TÊTE À TÊTE
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Slide 4 - Dîner */}
              <div className="w-full h-full flex-shrink-0 relative">
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                                         <Button 
                      variant="primary"
                      className="occasions-button flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      ACCOMPAGNER UN DÎNER
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Slide 5 - Seul */}
              <div className="w-full h-full flex-shrink-0 relative">
                <div className="relative z-10 h-full flex items-end justify-center py-8" style={{
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)'
                }}>
                  <div className="text-center relative z-50" style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                  }}>
                                         <Button 
                      variant="primary"
                      className="occasions-button flex items-center justify-center gap-3"
                      style={{
                        fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                      }}
                    >
                      UN MOMENT RIEN QU'À MOI
                      <img 
                        src="/img/slider/Categories_PNG/r-arrow.png" 
                        alt="Flèche droite"
                        className="arrow-icon"
                        style={{
                          width: 'clamp(1rem, 2.5vw, 1.5rem)',
                          height: 'clamp(1rem, 2.5vw, 1.5rem)',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default Slider 