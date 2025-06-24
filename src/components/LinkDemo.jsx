import Link from './Link'

function LinkDemo() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Démonstration des liens JNPR
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center justify-items-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-700">Navigation</h3>
            <div className="space-y-4">
              <Link href="#accueil">
                ACCUEIL
              </Link>
              <br />
              <Link href="#cocktails">
                COCKTAILS
              </Link>
              <br />
              <Link href="#apropos">
                À PROPOS
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-700">Catégories</h3>
            <div className="space-y-4">
              <Link href="#simples">
                SIMPLES & DÉLICIEUX
              </Link>
              <br />
              <Link href="#premium">
                PREMIUM COLLECTION
              </Link>
              <br />
              <Link href="#nouveautes">
                NOUVEAUTÉS
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-700">Actions</h3>
            <div className="space-y-4">
              <Link href="#commander">
                COMMANDER
              </Link>
              <br />
              <Link href="#contact">
                NOUS CONTACTER
              </Link>
              <br />
              <Link href="#newsletter">
                NEWSLETTER
              </Link>
            </div>
          </div>
          
          <div className="text-center md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-gray-700">Informations</h3>
            <div className="space-y-4">
              <Link href="#livraison">
                LIVRAISON
              </Link>
              <br />
              <Link href="#mentions">
                MENTIONS LÉGALES
              </Link>
              <br />
              <Link href="#cgv">
                CONDITIONS GÉNÉRALES
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-700">Social</h3>
            <div className="space-y-4">
              <Link href="#instagram">
                INSTAGRAM
              </Link>
              <br />
              <Link href="#facebook">
                FACEBOOK
              </Link>
              <br />
              <Link href="#twitter">
                TWITTER
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-700">Produits</h3>
            <div className="space-y-4">
              <Link href="#bestsellers">
                MEILLEURES VENTES
              </Link>
              <br />
              <Link href="#offres">
                OFFRES SPÉCIALES
              </Link>
              <br />
              <Link href="#gift">
                CARTES CADEAUX
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-gray-600 text-base mb-4">
            Passez la souris sur les liens pour voir l'animation de background
          </p>
          <p className="text-gray-500 text-sm">
            Font Formula Condensed Bold • Animation de gauche à droite
          </p>
        </div>
      </div>
    </section>
  )
}

export default LinkDemo 