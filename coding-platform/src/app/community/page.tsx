// src/app/community/page.tsx
import Link from 'next/link'

export default function Community() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold text-gray-700">CodeLearn</Link>
            <div className="flex space-x-4">
              <Link href="/courses" className="text-gray-800 hover:text-blue-500">Courses</Link>
              <Link href="/coding" className="text-gray-800 hover:text-blue-500">Playground</Link>
              <Link href="/community" className="text-blue-500">Community</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Community</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the CodeLearn Community!</h2>
          <p className="text-gray-600 mb-4">
            Connect with fellow learners, share your progress, and collaborate on projects. 
            Our community is a great place to ask questions, find study partners, and get inspired.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Community Features:</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Discussion forums for each course</li>
              <li>Project collaboration spaces</li>
              <li>Code review sessions</li>
              <li>Weekly coding challenges</li>
              <li>Mentorship programs</li>
            </ul>
          </div>
          <div className="mt-8">
            <Link href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Join the Discussion
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} CodeLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}