import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-indigo-200">Accueil</Link></li>
          <li><Link href="/projects" className="hover:text-indigo-200">Projets</Link></li>
          <li><Link href="/skills" className="hover:text-indigo-200">Compétences</Link></li>
          <li><Link href="/contact" className="hover:text-indigo-200">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}

