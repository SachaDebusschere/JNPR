import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Button from './Button'

function Hero() {
  const titleRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 
      "-=0.5"
    )
    .fromTo(ctaRef.current, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, 
      "-=0.3"
    )
  }, [])



  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jnpr-primary to-gray-900 text-white">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 font-jnpr bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          JNPR
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
        >
          Une nouvelle expérience sensorielle pour découvrir l'univers des cocktails
        </p>
        
        <div ref={ctaRef} className="space-y-4">
          <Button>
            AJOUTER - 29€
          </Button>
          <br />
          <Button variant="secondary">
            DÉCOUVRIR
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero 