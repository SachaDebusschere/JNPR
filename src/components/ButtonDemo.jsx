import Button from './Button'

function ButtonDemo() {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Démonstration des boutons JNPR
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Bouton Principal</h3>
            <Button>
              AJOUTER - 29€
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Bouton Secondaire</h3>
            <Button variant="secondary">
              DÉCOUVRIR
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Bouton Navigation</h3>
            <Button>
              VOIR PLUS
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Bouton Prix</h3>
            <Button>
              COMMANDER - 15€
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Bouton Contact (Secondaire)</h3>
            <Button variant="secondary">
              NOUS CONTACTER
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Bouton Menu</h3>
            <Button>
              VOIR LA CARTE
            </Button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm">
            Passez la souris sur les boutons pour voir l'effet d'inversion
          </p>
        </div>
      </div>
    </section>
  )
}

export default ButtonDemo 