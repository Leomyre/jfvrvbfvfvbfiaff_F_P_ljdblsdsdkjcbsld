import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="bg-blue-900 bg-opacity-50 p-8 rounded-lg backdrop-filter backdrop-blur-lg shadow-xl">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
          Bienvenue sur mon Portfolio
        </h1>
        <p className="text-xl mb-8 text-blue-200">
          Je suis un développeur passionné par la création d'applications web innovantes.
        </p>
        <div className="space-x-4">
          <Link href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105">
            Voir mes projets
          </Link>
          <Link href="/skills" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out transform hover:scale-105">
            Mes compétences
          </Link>
        </div>
      </div>
    </div>
  )
}

