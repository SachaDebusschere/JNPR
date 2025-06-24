import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Hero from './components/Hero'
import ButtonDemo from './components/ButtonDemo'
import LinkDemo from './components/LinkDemo'
import Slider from './components/Slider'

function App() {
  const appRef = useRef()

  useEffect(() => {
    // Animation d'entrée de l'application
    gsap.fromTo(appRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
  }, [])

  return (
    <div ref={appRef} className="min-h-screen bg-jnpr-secondary">
      <Hero />
      <ButtonDemo />
      <LinkDemo />
      <Slider />
    </div>
  )
}

export default App 