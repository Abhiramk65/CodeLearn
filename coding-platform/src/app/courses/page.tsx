// src/app/courses/page.tsx
import Link from 'next/link'
import { Code } from 'lucide-react'

export default function Courses() {
  const courses = [
    { id: 1, title: "Python Fundamentals", level: "Beginner", duration: "4 weeks" },
    { id: 2, title: "Web Development with React", level: "Intermediate", duration: "6 weeks" },
    { id: 3, title: "Data Structures and Algorithms", level: "Advanced", duration: "8 weeks" },
    { id: 4, title: "Machine Learning Basics", level: "Intermediate", duration: "5 weeks" },
    { id: 5, title: "Mobile App Development with Flutter", level: "Intermediate", duration: "7 weeks" },
    { id: 6, title: "DevOps and CI/CD", level: "Advanced", duration: "6 weeks" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center text-xl font-semibold text-gray-700"><Code className="h-6 w-6 mr-2" />CodeLearn</Link>
            <div className="flex space-x-4">
              <Link href="/courses" className="text-blue-500">Courses</Link>
              <Link href="/coding" className="text-gray-800 hover:text-blue-500">Playground</Link>
              <Link href="/community" className="text-gray-800 hover:text-blue-500">Community</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Courses</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">Level: {course.level}</p>
              <p className="text-gray-600 mb-4">Duration: {course.duration}</p>
              <Link href={`/courses/${course.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                View Course
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 bg-opacity-90 text-white py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold">CodeLearn</h3>
            <p className="text-gray-400">Empowering the next generation of developers</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-blue-400">About</Link>
            <Link href="/contact" className="hover:text-blue-400">Contact</Link>
            <Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
          </div>
          <div className="text-gray-400 mt-4 md:mt-0">
            © {new Date().getFullYear()} CodeLearn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}