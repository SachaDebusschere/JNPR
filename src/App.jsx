import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Hero from './components/Hero'
import ButtonDemo from './components/ButtonDemo'
import LinkDemo from './components/LinkDemo'
import Slider from './components/Slider'
import ResultPage from './components/ResultPage'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const appRef = useRef()
  const [currentPage, setCurrentPage] = useState('questionnaire') // 'questionnaire', 'loading' ou 'result'
  const [questionnaireData, setQuestionnaireData] = useState(null)

  useEffect(() => {
    // Animation d'entrée de l'application
    gsap.fromTo(appRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
  }, [])

  // Fonction pour gérer la fin du questionnaire
  const handleQuestionnaireComplete = (data) => {
    setQuestionnaireData(data)
    setCurrentPage('loading')
  }

  // Fonction pour gérer la fin du loading
  const handleLoadingComplete = () => {
    setCurrentPage('result')
  }

  return (
    <div ref={appRef} className="min-h-screen bg-jnpr-secondary">
      {currentPage === 'questionnaire' ? (
        <Slider onResultReady={handleQuestionnaireComplete} />
      ) : currentPage === 'loading' ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <ResultPage questionnaireData={questionnaireData} />
      )}
    </div>
  )
}

export default App 