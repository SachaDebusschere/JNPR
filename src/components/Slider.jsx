import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Button from './Button'

// TODO: Ajouter Draggable plugin plus tard
// import { Draggable } from 'gsap/Draggable'
// gsap.registerPlugin(Draggable)

function Slider({ onResultReady }) {
  const sliderRef = useRef()
  const containerRef = useRef()
  const decorativeElementRef = useRef()
  const backgroundOverlayRef = useRef()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState('welcome') // 'welcome', 'ambiance', 'occasions' ou 'ingredients'
  const [isTransitioning, setIsTransitioning] = useState(false) // État de transition pour cacher les éléments
  const [previousAmbianceSlide, setPreviousAmbianceSlide] = useState(0) // Sauvegarder la slide de la première question
  const [previousOccasionSlide, setPreviousOccasionSlide] = useState(0) // Sauvegarder la slide de la deuxième question
  const [selectedIngredients, setSelectedIngredients] = useState([]) // Ingrédients sélectionnés
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

  // Configuration des ingrédients pour la troisième question
  const ingredientsList = [
    { name: 'Baies de genièvre', image: '/img/slider/Produits_PNG/Baies de genièvre.png' },
    { name: 'Cannelle', image: '/img/slider/Produits_PNG/Cannelle.png' },
    { name: 'Citron', image: '/img/slider/Produits_PNG/Citron.png' },
    { name: 'Concombre', image: '/img/slider/Produits_PNG/Concombre.png' },
    { name: 'Gingembre', image: '/img/slider/Produits_PNG/Gingembre.png' },
    { name: 'JNPR 1', image: '/img/slider/Produits_PNG/JNPR 1.png' },
    { name: 'JNPR 2', image: '/img/slider/Produits_PNG/JNPR 2.png' },
    { name: 'JNPR 3', image: '/img/slider/Produits_PNG/JNPR 3.png' },
    { name: 'Jus de citron', image: '/img/slider/Produits_PNG/Jus de citron.png' },
    { name: 'Jus d\'orange', image: '/img/slider/Produits_PNG/Jus d\'orange.png' },
    { name: 'Jus de Pomme', image: '/img/slider/Produits_PNG/Jus de Pomme.png' },
    { name: 'Menthe', image: '/img/slider/Produits_PNG/Menthe.png' },
    { name: 'Miel', image: '/img/slider/Produits_PNG/Miel.png' },
    { name: 'Pomme', image: '/img/slider/Produits_PNG/Pomme.png' },
    { name: 'Romarin', image: '/img/slider/Produits_PNG/Romarin.png' },
    { name: 'Sucre roux', image: '/img/slider/Produits_PNG/Sucre roux.png' },
    { name: 'Thym', image: '/img/slider/Produits_PNG/Thym.png' },
    { name: 'Tonic', image: '/img/slider/Produits_PNG/Tonic.png' }
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
  
  // Helper pour les styles de transition
  const getTransitionStyle = (translateY = '30px', transitionScale = '0.8') => ({
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? `translateY(${translateY}) scale(${transitionScale})` : `translateY(0px) scale(1)`
  })

  // Fonction pour commencer le questionnaire depuis la page d'accueil
  const startQuestionnaire = () => {
    // Marquer le début de la transition
    setIsTransitioning(true)
    
    // Timeline pour l'animation de transition de l'accueil vers ambiance
    const tl = gsap.timeline()
    
    // 1. ANIMATION OUT - Faire disparaître les éléments de la page d'accueil
    const welcomeTitle = document.querySelector('.welcome-title')
    const welcomeSubtitle = document.querySelector('.welcome-subtitle')
    const welcomeButton = document.querySelector('.welcome-button')
    const welcomeImage = document.querySelector('.welcome-image')
    
    if (welcomeTitle) {
      tl.to(welcomeTitle, {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: "power2.in"
      }, 0)
    }
    
    if (welcomeSubtitle) {
      tl.to(welcomeSubtitle, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.in"
      }, 0.1)
    }
    
    if (welcomeButton) {
      tl.to(welcomeButton, {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.in"
      }, 0.2)
    }
    
    if (welcomeImage) {
      tl.to(welcomeImage, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.6,
        ease: "power2.in"
      }, 0.3)
    }
    
    // 2. Transition du background
    tl.to(backgroundOverlayRef.current, {
      backgroundColor: '#F4FFE3',
      duration: 0.5,
      ease: "power2.inOut"
    }, 0.5)
    
    // 3. Changer de question vers ambiance
    tl.call(() => {
      setCurrentQuestion('ambiance')
      setCurrentSlide(0)
      // Réinitialiser la position du slider
      if (sliderRef.current) {
        gsap.set(sliderRef.current, { x: 0 })
      }
    }, null, 1.0)
    
    // 4. ANIMATION IN - Faire apparaître les éléments de la première question
    tl.call(() => {
              // Attendre que React ait rendu les nouveaux éléments
        setTimeout(() => {
          // Animation du verre FIRST - conteneur entier
          const verreContainer = document.querySelector('.verre-container')
          if (verreContainer) {
            gsap.to(verreContainer, {
              opacity: 1,
              duration: 1.0,
              ease: "power2.out",
              delay: 0.1
            })
          }
          
          // Initialiser l'élément décoratif APRÈS le verre
          if (decorativeElementRef.current) {
            const element = ambianceElements[0]
            decorativeElementRef.current.src = element.image
            decorativeElementRef.current.alt = element.alt
            
            // Animer le conteneur parent pour l'opacity, l'élément pour le scale
            const decorativeContainer = decorativeElementRef.current.parentElement
            
            gsap.set(decorativeElementRef.current, {
              x: element.translateX,
              y: element.translateY,
              scale: 0.3
            })
            
            // Animation du conteneur pour l'opacity et de l'élément pour le scale
            gsap.to(decorativeContainer, {
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              delay: 0.4
            })
            
            gsap.to(decorativeElementRef.current, {
              scale: element.scale,
              duration: 1.2,
              ease: "back.out(1.5)",
              delay: 0.4
            })
          }
        
        // Animation du titre
        const ambianceTitle = document.querySelector('.ambiance-title')
        if (ambianceTitle) {
          gsap.set(ambianceTitle, {
            opacity: 0,
            y: -40
          })
          
          gsap.to(ambianceTitle, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.3
          })
        }
        
        // Animation des indicateurs de pagination
        const paginationButtons = document.querySelectorAll('.absolute.bottom-0 button')
        if (paginationButtons.length > 0) {
          gsap.set(paginationButtons, {
            opacity: 0,
            y: 20
          })
          
          gsap.to(paginationButtons, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.5,
            stagger: 0.1
          })
        }
        
        // Animation du bouton de la première slide
        setTimeout(() => {
          const firstSlideButton = document.querySelector('.w-full.h-full.flex-shrink-0:first-child .text-center')
          if (firstSlideButton) {
            gsap.set(firstSlideButton, {
              opacity: 0,
              y: 30
            })
            
            gsap.to(firstSlideButton, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.4
            })
          }
        }, 100)
        
      }, 100)
    }, null, 1.2)
    
    // 5. Terminer la transition pour les éléments textuels
    tl.call(() => {
      setIsTransitioning(false)
    }, null, 2.0)
  }

  // Fonction pour retourner à l'intro depuis la première question
  const goBackToIntro = () => {
    // Marquer le début de la transition
    setIsTransitioning(true)
    
    // Timeline pour l'animation de transition de ambiance vers intro
    const tl = gsap.timeline()
    
    // 1. ANIMATION OUT - Faire disparaître les éléments de la question ambiance
    const ambianceTitle = document.querySelector('.ambiance-title')
    const verreContainer = document.querySelector('.verre-container')
    const decorativeElement = decorativeElementRef.current
    const paginationButtons = document.querySelectorAll('.absolute.bottom-0 button')
    const firstSlideButton = document.querySelector('.w-full.h-full.flex-shrink-0:first-child .text-center')
    
    if (ambianceTitle) {
      tl.to(ambianceTitle, {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: "power2.in"
      }, 0)
    }
    
    if (decorativeElement) {
      tl.to(decorativeElement, {
        opacity: 0,
        scale: 0.6,
        duration: 0.6,
        ease: "back.in(1.7)"
      }, 0.1)
    }
    
    if (verreContainer) {
      tl.to(verreContainer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.in"
      }, 0.2)
    }
    
    if (firstSlideButton) {
      tl.to(firstSlideButton, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.in"
      }, 0.3)
    }
    
    if (paginationButtons.length > 0) {
      tl.to(paginationButtons, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.in",
        stagger: -0.05
      }, 0.4)
    }
    
    // 2. Transition du background
    tl.to(backgroundOverlayRef.current, {
      backgroundColor: '#FCFCFC',
      duration: 0.5,
      ease: "power2.inOut"
    }, 0.6)
    
    // 3. Changer de question vers welcome
    tl.call(() => {
      setCurrentQuestion('welcome')
      setCurrentSlide(0)
    }, null, 1.1)
    
    // 4. ANIMATION IN - Faire réapparaître les éléments de l'intro
    tl.call(() => {
      // Attendre que React ait rendu les nouveaux éléments
      setTimeout(() => {
        // Forcer un nouveau rendu en attendant un peu plus
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const welcomeTitle = document.querySelector('.welcome-title')
            const welcomeSubtitle = document.querySelector('.welcome-subtitle')
            const welcomeButton = document.querySelector('.welcome-button')
            const welcomeImage = document.querySelector('.welcome-image')
            
            // Debug: vérifier si les éléments sont trouvés
            if (!welcomeTitle || !welcomeSubtitle || !welcomeButton || !welcomeImage) {
              console.log('Certains éléments welcome manquent:', {
                title: !!welcomeTitle,
                subtitle: !!welcomeSubtitle, 
                button: !!welcomeButton,
                image: !!welcomeImage
              })
            }
            
            // Titre - arrive du haut
            if (welcomeTitle) {
              gsap.set(welcomeTitle, {
                opacity: 0,
                y: -50
              })
              
              gsap.to(welcomeTitle, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                delay: 0.2
              })
            }
            
            // Sous-titre - arrive du haut
            if (welcomeSubtitle) {
              gsap.set(welcomeSubtitle, {
                opacity: 0,
                y: -30
              })
              
              gsap.to(welcomeSubtitle, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.3
              })
            }
            
            // Bouton - arrive du bas avec effet de rebond
            if (welcomeButton) {
              gsap.set(welcomeButton, {
                opacity: 0,
                y: 30,
                scale: 0.8
              })
              
              gsap.to(welcomeButton, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 0.4
              })
            }
            
            // Image - arrive du bas
            if (welcomeImage) {
              gsap.set(welcomeImage, {
                opacity: 0,
                y: 50,
                scale: 0.9
              })
              
              gsap.to(welcomeImage, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.1
              })
            }
          })
        })
      }, 200)
    }, null, 1.3)
    
    // 5. Terminer la transition pour les éléments textuels
    tl.call(() => {
      setIsTransitioning(false)
    }, null, 2.0)
  }

  // Fonction pour passer à la question suivante avec animation
  const goToNextQuestion = () => {
    // Marquer le début de la transition
    setIsTransitioning(true)
    
    if (currentQuestion === 'ambiance') {
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
    
      // 4. Animation IN pour les occasions
    tl.call(() => {
      // Initialiser l'image pour la slide 0 des occasions
      if (decorativeElementRef.current) {
        const element = occasionsElements[0] // Slide 0
        decorativeElementRef.current.src = element.image
        decorativeElementRef.current.alt = element.alt
        
        const momentsContainer = document.querySelector('.moments-container')
        
        // Initialiser le conteneur caché et l'élément
        gsap.set(momentsContainer, { opacity: 0 })
        gsap.set(decorativeElementRef.current, {
          x: element.translateX,
          y: element.translateY,
          scale: 0.6
        })
        
        // Animer le conteneur parent pour l'opacity
        gsap.to(momentsContainer, {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.1
        })
        
        // Animer l'image pour le scale
        gsap.to(decorativeElementRef.current, {
          scale: 0.8,
          duration: 0.7,
          ease: "back.out(1.7)",
          delay: 0.1
        })
      }
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
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
            // Animer le conteneur parent pour l'opacity
            const imageContainer = image.parentElement
            
            // S'assurer que l'image est correctement initialisée
            gsap.set(image, { scale: 0.6 })
            
            gsap.to(imageContainer, {
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.1
            })
            
            gsap.to(image, {
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
                stagger: 0.1
            })
          }
        })
      })
    }, null, 0.8)
    
    // 5. Terminer la transition pour les éléments textuels
    tl.call(() => {
      setIsTransitioning(false)
    }, null, 1.5)
    } else if (currentQuestion === 'occasions') {
      // Sauvegarder la slide actuelle de la deuxième question
      setPreviousOccasionSlide(currentSlide)
      
      // Timeline pour l'animation vers la question des ingrédients
      const tl = gsap.timeline()
      
      // 1. ANIMATION OUT - Faire disparaître les éléments des occasions
      const header = document.querySelector('.question-occasions-header')
      const momentsContainer = document.querySelector('.moments-container')
      const buttons = document.querySelectorAll('.occasions-button')
      
      if (header) {
        tl.to(header, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power2.in"
        }, 0)
      }
      
      if (momentsContainer) {
        tl.to(momentsContainer, {
          opacity: 0,
          scale: 0.6,
          duration: 0.5,
          ease: "back.in(1.7)"
        }, 0.1)
      }
      
      if (buttons.length > 0) {
        tl.to(buttons, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: "power2.in",
          stagger: -0.1
        }, 0.2)
      }
      
      // 2. Changer de question vers les ingrédients
      tl.call(() => {
        setCurrentQuestion('ingredients')
        setCurrentSlide(0)
        // Réinitialiser la position du slider (pas nécessaire pour le scroll vertical mais pour être sûr)
        if (sliderRef.current) {
          gsap.set(sliderRef.current, { x: 0 })
        }
      }, null, 0.7)
      
      // 3. Animation IN pour la question des ingrédients
      tl.call(() => {
        // Animation plus fluide des ingrédients
        setTimeout(() => {
          const ingredientsHeader = document.querySelector('.question-ingredients-header')
          const ingredientsGrid = document.querySelector('.ingredients-grid')
          
          if (ingredientsHeader) {
            // Initialiser d'abord le header caché
            gsap.set(ingredientsHeader, { opacity: 0, y: -50 })
            
            gsap.to(ingredientsHeader, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.1
            })
          }
          
          if (ingredientsGrid) {
            // Animer d'abord le conteneur grille
            gsap.to(ingredientsGrid, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              delay: 0.3
            })
            
            const ingredientItems = ingredientsGrid.querySelectorAll('.ingredient-item')
            if (ingredientItems.length > 0) {
              // Initialiser tous les items cachés et réduits
              gsap.set(ingredientItems, { opacity: 0, y: 30, scale: 0.8 })
              
              gsap.to(ingredientItems, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.2)",
                delay: 0.5,
                stagger: 0.08
              })
            }
          }
        }, 200) // Délai réduit car les éléments sont déjà cachés
      }, null, 0.9)
      
      // 4. Terminer la transition pour les éléments textuels
      tl.call(() => {
        setIsTransitioning(false)
      }, null, 1.6)
    }
  }

  // Fonction pour retourner à la question précédente
  const goBackToPreviousQuestion = () => {
    // Marquer le début de la transition
    setIsTransitioning(true)
    
    if (currentQuestion === 'occasions') {
      // Retour de occasions vers ambiance
    const tl = gsap.timeline()
    
    const header = document.querySelector('.question-occasions-header')
    if (header) {
      tl.to(header, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in"
      }, 0)
    }
    
    const momentsContainer = document.querySelector('.moments-container')
    if (momentsContainer) {
      tl.to(momentsContainer, {
        opacity: 0,
        scale: 0.6,
        duration: 0.5,
        ease: "back.in(1.7)"
      }, 0.1)
    }
    
    const buttons = document.querySelectorAll('.occasions-button')
    if (buttons.length > 0) {
      tl.to(buttons, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power2.in",
          stagger: -0.1
      }, 0.2)
    }
    
    tl.to(backgroundOverlayRef.current, {
        backgroundColor: '#F4FFE3',
      duration: 0.4,
      ease: "power2.inOut"
    }, 0.3)
    
    tl.call(() => {
      setCurrentQuestion('ambiance')
      setCurrentSlide(previousAmbianceSlide)
      if (sliderRef.current && containerRef.current) {
        const slideWidth = containerRef.current.offsetWidth
        gsap.set(sliderRef.current, { x: -previousAmbianceSlide * slideWidth })
      }
    }, null, 0.7)
    
    tl.call(() => {
      // Animation coordonnée du verre et de l'élément décoratif
      const verreContainer = document.querySelector('.verre-container')
      
      // Animer d'abord le verre - conteneur entier
      if (verreContainer) {
        gsap.to(verreContainer, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1
        })
      }
      
      // Puis l'élément décoratif
      if (decorativeElementRef.current) {
        const element = ambianceElements[previousAmbianceSlide]
        decorativeElementRef.current.src = element.image
        decorativeElementRef.current.alt = element.alt
        
        const decorativeContainer = decorativeElementRef.current.parentElement
        
        gsap.set(decorativeElementRef.current, {
          x: element.translateX,
          y: element.translateY,
          scale: 0.3
        })
        
        gsap.to(decorativeContainer, {
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          delay: 0.3
        })
        
        gsap.to(decorativeElementRef.current, {
          scale: element.scale,
          duration: 1.0,
          ease: "back.out(1.3)",
          delay: 0.3
        })
      }
      
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
      
      if (backgroundOverlayRef.current) {
        gsap.to(backgroundOverlayRef.current, {
          backgroundColor: ambianceElements[previousAmbianceSlide].backgroundColor,
          duration: 0.5,
          ease: "power2.out"
        })
      }
    }, null, 0.9)
    
    // Terminer la transition pour les éléments textuels
    tl.call(() => {
      setIsTransitioning(false)
    }, null, 1.6)
    } else if (currentQuestion === 'ingredients') {
      // Retour de ingredients vers occasions
      const tl = gsap.timeline()
      
      const ingredientsHeader = document.querySelector('.question-ingredients-header')
      const ingredientsGrid = document.querySelector('.ingredients-grid')
      
      if (ingredientsHeader) {
        tl.to(ingredientsHeader, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power2.in"
        }, 0)
      }
      
      if (ingredientsGrid) {
        const ingredientItems = ingredientsGrid.querySelectorAll('.ingredient-item')
        tl.to(ingredientItems, {
          opacity: 0,
          y: 30,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.in",
          stagger: -0.02
        }, 0.1)
      }
      
      tl.to(backgroundOverlayRef.current, {
        backgroundColor: '#FCFCFC',
        duration: 0.4,
        ease: "power2.inOut"
      }, 0.3)
      
      tl.call(() => {
        setCurrentQuestion('occasions')
        setCurrentSlide(previousOccasionSlide)
        if (sliderRef.current && containerRef.current) {
          const slideWidth = containerRef.current.offsetWidth
          gsap.set(sliderRef.current, { x: -previousOccasionSlide * slideWidth })
        }
      }, null, 0.7)
      
      tl.call(() => {
        if (decorativeElementRef.current) {
          const element = occasionsElements[previousOccasionSlide]
          decorativeElementRef.current.src = element.image
          decorativeElementRef.current.alt = element.alt
          
          gsap.set(decorativeElementRef.current, {
            x: element.translateX,
            y: element.translateY,
            scale: 0.6
          })
        }
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
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
              // Animer le conteneur parent pour l'opacity
              const momentsContainer = document.querySelector('.moments-container')
              
              gsap.set(momentsContainer, { opacity: 0 })
              gsap.set(image, { scale: 0.6 })
              
              gsap.to(momentsContainer, {
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
                delay: 0.1
              })
              
              gsap.to(image, {
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
                stagger: 0.1
              })
            }
          })
        })
      }, null, 0.9)
      
      // Terminer la transition pour les éléments textuels
      tl.call(() => {
        setIsTransitioning(false)
      }, null, 1.6)
    }
  }

  // Fonction pour gérer la sélection des ingrédients
  const toggleIngredientSelection = (ingredientName) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredientName)) {
        return prev.filter(name => name !== ingredientName)
      } else {
        return [...prev, ingredientName]
      }
    })
  }

  // Fonction pour valider les ingrédients et passer à la page de résultat
  const validateIngredients = () => {
    if (selectedIngredients.length === 0) return
    
    // Préparer les données du questionnaire
    const questionnaireData = {
      ambiance: previousAmbianceSlide,
      occasion: previousOccasionSlide,
      ingredients: selectedIngredients
    }
    
    // Appeler la fonction de callback si elle existe
    if (onResultReady) {
      onResultReady(questionnaireData)
    }
  }

  const animateDecorativeElement = (slideIndex, direction = 'next') => {
    if (!decorativeElementRef.current) return
    
    const element = decorativeElements[slideIndex]
    const elementContainer = decorativeElementRef.current.parentElement
    
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
    
    // 2. Animation de sortie COMPLÈTE de l'élément actuel ET de son conteneur
    tl.to(elementContainer, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    }, 0)
    
    tl.to(decorativeElementRef.current, {
      x: exitDirection,
      duration: 0.4,
      ease: "power2.in"
    }, 0)
    
    // 3. Pause et changement d'image (quand l'ancien est complètement sorti)
    tl.call(() => {
      // Changer l'image
      decorativeElementRef.current.src = element.image
      decorativeElementRef.current.alt = element.alt
    }, null, 0.4)
    
    // 4. Positionner le nouvel élément hors écran du bon côté et cacher son conteneur
    tl.set(elementContainer, {
      opacity: 0
    }, 0.45)
    
    tl.set(decorativeElementRef.current, {
      x: enterDirection,
      y: element.translateY,
      scale: currentQuestion === 'occasions' ? 0.8 : element.scale // Échelle adaptée selon la question
    }, 0.45)
    
    // 5. Animation d'entrée du nouvel élément ET de son conteneur
    tl.to(elementContainer, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, 0.5)
    
    tl.to(decorativeElementRef.current, {
      x: finalPosition,
      duration: 0.5,
      ease: "power2.out"
    }, 0.5)
  }

  const goToSlide = (index, forceAnimation = false) => {
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
    
    // Animation de l'élément décoratif si ce n'est pas la première initialisation ou si forcé
    if (currentSlide !== index || forceAnimation) {
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
    
    // Désactiver les swipes sur la page d'intro et la page des ingrédients
    if (currentQuestion === 'welcome' || currentQuestion === 'ingredients') return
    
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
    // Empêcher le scroll du document body
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    // Nettoyer au démontage
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    // Initialiser selon la question actuelle
    if (currentQuestion === 'welcome') {
      // Initialiser la page d'accueil
      if (backgroundOverlayRef.current) {
        backgroundOverlayRef.current.style.backgroundColor = '#FCFCFC'
      }
      
      // S'assurer que tous les éléments welcome sont visibles par défaut
      setTimeout(() => {
        const welcomeTitle = document.querySelector('.welcome-title')
        const welcomeSubtitle = document.querySelector('.welcome-subtitle')
        const welcomeButton = document.querySelector('.welcome-button')
        const welcomeImage = document.querySelector('.welcome-image')
        
        // Toujours remettre les éléments en état visible par défaut lors de l'arrivée sur welcome
        if (welcomeTitle) {
          gsap.set(welcomeTitle, { opacity: 1, y: 0 })
        }
        if (welcomeSubtitle) {
          gsap.set(welcomeSubtitle, { opacity: 1, y: 0 })
        }
        if (welcomeButton) {
          gsap.set(welcomeButton, { opacity: 1, y: 0, scale: 1 })
        }
        if (welcomeImage) {
          gsap.set(welcomeImage, { opacity: 1, y: 0, scale: 1 })
        }
      }, 50)
    } else if (currentQuestion === 'ambiance') {
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
      
        // Seulement aller à la slide 0 si on est vraiment au début
        if (currentSlide === 0) {
        setTimeout(() => goToSlide(0), 100)
        }
          } else if (currentQuestion === 'occasions') {
      // Initialiser l'image pour la slide courante des occasions
        if (decorativeElementRef.current) {
        const element = decorativeElements[currentSlide]
          decorativeElementRef.current.src = element.image
          decorativeElementRef.current.alt = element.alt
          
          const momentsContainer = document.querySelector('.moments-container')
          
          // Initialiser les transformations pour les moments
          gsap.set(momentsContainer, { opacity: 0 })
          gsap.set(decorativeElementRef.current, {
            x: element.translateX,
            y: element.translateY,
            scale: 0.6
          })
          
          // Animer le conteneur parent pour qu'il devienne visible
          gsap.to(momentsContainer, {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.2
          })
          
          // Animer l'image pour le scale
          gsap.to(decorativeElementRef.current, {
            scale: 0.8,
            duration: 0.7,
            ease: "back.out(1.7)",
            delay: 0.2
          })
        }
        
        // S'assurer que tous les éléments occasions sont cachés au départ
        requestAnimationFrame(() => {
          const header = document.querySelector('.question-occasions-header')
          const momentsContainer = document.querySelector('.moments-container')
          const buttons = document.querySelectorAll('.occasions-button')
          
          if (header) gsap.set(header, { opacity: 0 })
          if (momentsContainer) gsap.set(momentsContainer, { opacity: 0 })
          if (buttons.length > 0) gsap.set(buttons, { opacity: 0 })
        })
        
      // Ne forcer goToSlide(0) que si on est vraiment au début (pas en retour d'une autre question)
      if (currentSlide === 0) {
        setTimeout(() => goToSlide(0), 100)
      }
    } else if (currentQuestion === 'ingredients') {
      // Initialiser la question des ingrédients
      if (backgroundOverlayRef.current) {
        backgroundOverlayRef.current.style.backgroundColor = '#FCFCFC'
      }
      
      // Les éléments sont maintenant cachés automatiquement via isTransitioning
      }
      
      // Les icônes de navigation sont maintenant gérées par le rendu conditionnel React
      }, [currentQuestion])

  // Les icônes de navigation sont maintenant gérées uniquement par le rendu conditionnel

  return (
    <section 
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
      {/* Icônes de navigation */}
      {currentQuestion === 'welcome' && (
        <>
          {/* Croix fermer en haut à droite pour la page d'accueil */}
          <button 
            className="fixed top-4 right-4 z-[60] hover:opacity-70 transition-opacity duration-200"
            aria-label="Fermer"
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'block !important'
            }}
          >
            <img 
              src="/img/croix.png" 
              alt="Fermer"
              className="w-6 h-6"
            />
          </button>
        </>
      )}
      
      {currentQuestion === 'ambiance' && (
        <>
          {/* Flèche retour en haut à gauche */}
          <button 
            className="fixed top-4 left-2 z-[60] hover:opacity-70 transition-opacity duration-200 flex items-center gap-0.2"
            aria-label="Retour"
            onClick={goBackToIntro}
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'flex !important'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#151515" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeOpacity="0.6"
              />
            </svg>
            <span className="font-suisse text-xs font-normal" style={{ color: '#151515', opacity: 0.6 }}>RETOUR</span>
          </button>
          
          {/* Croix fermer en haut à droite */}
          <button 
            className="fixed top-4 right-4 z-[60] hover:opacity-70 transition-opacity duration-200"
            aria-label="Fermer"
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'block !important'
            }}
          >
            <img 
              src="/img/croix.png" 
              alt="Fermer"
              className="w-6 h-6"
            />
          </button>
        </>
      )}
      
      {currentQuestion === 'occasions' && (
        <>
          {/* Flèche retour en haut à gauche - bleu */}
          <button 
            className="fixed top-4 left-2 z-[60] hover:opacity-70 transition-opacity duration-200 flex items-center gap-0.2"
            aria-label="Retour"
            onClick={goBackToPreviousQuestion}
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'flex !important'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#76A0BC" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-suisse text-xs font-normal" style={{ color: '#76A0BC' }}>RETOUR</span>
          </button>
          
          {/* Croix fermer en haut à droite - noire avec fond bleu */}
          <button 
            className="fixed top-4 right-4 z-[60] hover:opacity-70 transition-opacity duration-200 flex items-center justify-center w-6 h-6"
            aria-label="Fermer"
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'flex !important',
              backgroundColor: '#76A0BC'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

      {currentQuestion === 'ingredients' && (
        <>
          {/* Flèche retour en haut à gauche - gris foncé */}
          <button 
            className="fixed top-4 left-2 z-[60] hover:opacity-70 transition-opacity duration-200 flex items-center gap-0.2"
            aria-label="Retour"
            onClick={goBackToPreviousQuestion}
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'flex !important'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#151515" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeOpacity="0.6"
              />
            </svg>
            <span className="font-suisse text-xs font-normal" style={{ color: '#151515', opacity: 0.6 }}>RETOUR</span>
          </button>
          
          {/* Croix fermer en haut à droite */}
          <button 
            className="fixed top-4 right-4 z-[60] hover:opacity-70 transition-opacity duration-200"
            aria-label="Fermer"
            style={{ 
              opacity: '1 !important',
              visibility: 'visible !important',
              display: 'block !important'
            }}
          >
            <img 
              src="/img/croix.png" 
              alt="Fermer"
              className="w-6 h-6"
            />
          </button>
        </>
      )}
      
      {/* Background overlay animé */}
      <div 
        ref={backgroundOverlayRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundColor: currentQuestion === 'welcome' ? '#FCFCFC' : 
                          currentQuestion === 'ambiance' ? '#F4FFE3' : '#FCFCFC' 
        }}
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
        style={{ maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Éléments décoratifs - seulement pour ambiance et occasions */}
        {(currentQuestion === 'ambiance' || currentQuestion === 'occasions') && (
          <>
        {/* Verre fixe - en arrière-plan (seulement pour la question ambiance) */}
        {currentQuestion === 'ambiance' && (
          <div 
            className="verre-container absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ opacity: 0 }}
          >
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
          <div 
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            style={{ opacity: 0 }}
          >
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
          <div 
            className="moments-container absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
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
          </>
        )}

        {/* Titre fixe - au-dessus de tout (seulement pour ambiance et occasions) */}
        {(currentQuestion === 'ambiance' || currentQuestion === 'occasions') && (
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
          {currentQuestion === 'ambiance' ? (
            <div 
              className="ambiance-title text-center" 
              style={{
                marginTop: 'clamp(2rem, 4vh, 3rem)',
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(-40px)' : 'translateY(0px)'
              }}
            >
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
                paddingRight: 'clamp(1rem, 4vw, 2rem)',
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(-50px)' : 'translateY(0px)'
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
        )}

        {/* Indicateurs de pagination fixes - au-dessus de tout (seulement pour ambiance et occasions) */}
        {(currentQuestion === 'ambiance' || currentQuestion === 'occasions') && (
        <div 
          className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(20px)' : 'translateY(0px)'
          }}
        >
          <div className="flex justify-center pb-8" style={{ pointerEvents: 'auto' }}>
            <div className="flex space-x-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-black scale-125' 
                      : 'bg-transparent border border-black/50 hover:bg-black/50'
                  }`}
                  aria-label={`Aller à la slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Slider container - textures et textes seulement */}
        <div ref={sliderRef} className={`h-full relative z-10 ${currentQuestion === 'ingredients' || currentQuestion === 'welcome' ? 'w-full' : 'flex'}`} style={{ maxWidth: '100vw', maxHeight: '100vh' }}>
          
          {currentQuestion === 'welcome' ? (
            /* Page d'accueil - Bienvenue au comptoir */
            <div className="w-full h-full flex flex-col items-center justify-between relative" style={{
              paddingTop: 'clamp(1rem, 2vh, 1.5rem)',
              paddingBottom: 'clamp(0.5rem, 1vh, 1rem)',
              maxWidth: '100vw',
              maxHeight: '100vh',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}>
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
              
              {/* Contenu du haut groupé */}
              <div className="flex flex-col items-center relative z-10 flex-shrink-0" style={{
                paddingTop: 'clamp(0.5rem, 1vh, 1rem)',
                maxHeight: '50vh',
                overflow: 'visible'
              }}>
                {/* Titre principal */}
                <div 
                  className="welcome-title text-center relative z-10"
                  style={{
                    marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)',
                    opacity: isTransitioning && currentQuestion === 'welcome' ? 0 : 1,
                    transform: isTransitioning && currentQuestion === 'welcome' ? 'translateY(-50px)' : 'translateY(0px)'
                  }}
                >
                  <h1 className="font-formula font-bold leading-tight">
                    <span style={{ 
                      color: '#4A7B9C', 
                      fontSize: 'clamp(1.8rem, 4vw, 2.8rem)'
                    }}>
                      BIENVENUE AU
                    </span>
                    <br />
                    <span style={{ 
                      color: '#1B3E55',
                      fontSize: 'clamp(3rem, 7vw, 5rem)'
                    }}>
                      COMPTOIR
                    </span>
                  </h1>
                </div>
                
                {/* Sous-titre */}
                <div 
                  className="welcome-subtitle text-center relative z-10" 
                  style={{
                    maxWidth: '280px',
                    paddingLeft: 'clamp(0.5rem, 2vw, 1rem)',
                    paddingRight: 'clamp(0.5rem, 2vw, 1rem)',
                    marginBottom: 'clamp(1rem, 2.5vh, 1.5rem)',
                    opacity: isTransitioning && currentQuestion === 'welcome' ? 0 : 1,
                    transform: isTransitioning && currentQuestion === 'welcome' ? 'translateY(-30px)' : 'translateY(0px)'
                  }}
                >
                  <p 
                    className="font-suisse font-normal leading-relaxed"
                    style={{
                      fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                      color: '#151515',
                      opacity: 0.8
                    }}
                  >
                    NOUS ALLONS CRÉER ENSEMBLE<br />VOTRE COCKTAIL IDÉAL.
                  </p>
                </div>
                
                {/* Bouton commencer */}
                <div 
                  className="welcome-button relative z-10"
                  style={{
                    opacity: isTransitioning && currentQuestion === 'welcome' ? 0 : 1,
                    transform: isTransitioning && currentQuestion === 'welcome' ? 'translateY(30px) scale(0.8)' : 'translateY(0px) scale(1)'
                  }}
                >
                  <Button 
                    variant="primary"
                    onClick={startQuestionnaire}
                    style={{
                      fontSize: 'clamp(0.9rem, 3.2vw, 1.2rem)',
                      padding: 'clamp(0.6rem, 2.2vw, 0.9rem) clamp(1.4rem, 4.5vw, 2rem)'
                    }}
                  >
                    COMMENCER
                  </Button>
                </div>
              </div>
              
              {/* Image du comptoir en bas */}
              <div 
                className="welcome-image w-full relative z-10 flex-grow flex-shrink" 
                style={{ 
                  maxWidth: '100vw', 
                  overflow: 'hidden',
                  height: 'clamp(45vh, 50vh, 55vh)',
                  minHeight: '30vh',
                  maxHeight: '55vh',
                  opacity: isTransitioning && currentQuestion === 'welcome' ? 0 : 1,
                  transform: isTransitioning && currentQuestion === 'welcome' ? 'translateY(50px) scale(0.9)' : 'translateY(0px) scale(1)'
                }}
              >
                <img 
                  src="/img/slider/Comptoir.png" 
                  alt="Comptoir" 
                  className="w-full h-full object-cover object-bottom"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '100vw',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none' // Cacher l'image si elle n'existe pas
                  }}
                />
              </div>
            </div>
          ) : currentQuestion === 'ingredients' ? (
            /* Question des ingrédients - Scroll vertical */
            <div className="w-full h-full overflow-y-auto overflow-x-hidden" style={{
              paddingTop: 'clamp(1rem, 2vh, 1.5rem)', // Espace réduit pour le header non-fixe
              paddingBottom: 'clamp(4rem, 8vh, 6rem)' // Espace pour le bouton
            }}>
              {/* Background texture grain */}
              <div 
                className="fixed inset-0 opacity-50 z-[-1]"
                style={{
                  backgroundImage: 'url(/img/slider/Moments_PNG/texture-grain-bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              
              {/* Header de la question ingrédients - dans le flow scrollable */}
              <div 
                className="question-ingredients-header text-center mb-4"
                style={{
                  paddingTop: 'clamp(1rem, 3vh, 2rem)',
                  paddingBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  paddingLeft: 'clamp(1rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1rem, 4vw, 2rem)',
                  ...getTransitionStyle('-50px')
                }}
              >
                <h2 className="font-formula font-bold leading-tight">
                  <span style={{ 
                    color: '#151515', 
                    opacity: 0.6,
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)'
                  }}>
                    DANS VOTRE
                  </span>
                  <br />
                  <span style={{ 
                    color: '#151515',
                    opacity: 1,
                    fontSize: 'clamp(4rem, 6.5vw, 5.5rem)'
                  }}>
                    PLACARD ?
                  </span>
                </h2>
                {/* Trait de séparation */}
                <div 
                  style={{
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#151515',
                    opacity: 0.3,
                    marginTop: 'clamp(1rem, 2vh, 1.5rem)'
                  }}
                />
              </div>
              
              {/* Grille des ingrédients */}
              <div 
                className="ingredients-grid px-4 pb-4"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'clamp(1rem, 3vw, 2rem)',
                  maxWidth: '400px',
                  margin: '0 auto',
                  opacity: 0
                }}
              >
                {ingredientsList.map((ingredient, index) => (
                  <div 
                    key={ingredient.name}
                    className={`ingredient-item cursor-pointer transition-all duration-300 ${
                      selectedIngredients.includes(ingredient.name) 
                        ? 'ring-2 ring-[#151515] ring-opacity-60' 
                        : 'hover:scale-105'
                    }`}
                    onClick={() => toggleIngredientSelection(ingredient.name)}
                    style={{
                      borderRadius: '8px',
                      padding: 'clamp(0.5rem, 2vw, 1rem)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <div className="aspect-square relative">
                      <img 
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p 
                      className="text-center font-suisse font-normal mt-2"
                      style={{
                        fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
                        color: '#151515',
                        opacity: 0.8
                      }}
                    >
                      {ingredient.name}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Bouton de validation fixe en bas */}
              <div 
                className="fixed bottom-0 left-0 right-0 z-50"
                style={{
                  padding: 'clamp(1rem, 3vh, 1.5rem)'
                }}
              >
                <div className="text-center">
                  <Button 
                    variant="primary"
                    className="flex items-center justify-center gap-3 mx-auto"
                    style={{
                      fontSize: 'clamp(0.8rem, 3.5vw, 1.2rem)',
                      padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 1.5rem)'
                    }}
                    disabled={selectedIngredients.length === 0}
                    onClick={validateIngredients}
                  >
                    VALIDER
                  </Button>
                  {selectedIngredients.length > 0 && (
                    <p 
                      className="mt-2 font-suisse text-sm opacity-60"
                      style={{ color: '#151515' }}
                    >
                      {selectedIngredients.length} ingrédient{selectedIngredients.length > 1 ? 's' : ''} sélectionné{selectedIngredients.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : currentQuestion === 'ambiance' ? (
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
                  <div 
                    className="text-center relative z-50" 
                    style={{
                    marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)'
                    }}
                  >
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
                      onClick={goToNextQuestion}
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
                      onClick={goToNextQuestion}
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
                      onClick={goToNextQuestion}
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
                      onClick={goToNextQuestion}
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
                      onClick={goToNextQuestion}
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