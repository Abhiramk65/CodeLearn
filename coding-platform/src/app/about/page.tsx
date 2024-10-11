// src/app/about/page.tsx
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold text-gray-700">CodeLearn</Link>
            <div className="flex space-x-4">
              <Link href="/courses" className="text-gray-800 hover:text-blue-500">Courses</Link>
              <Link href="/coding" className="text-gray-800 hover:text-blue-500">Playground</Link>
              <Link href="/community" className="text-gray-800 hover:text-blue-500">Community</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About CodeLearn</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            CodeLearn is a cutting-edge online platform dedicated to helping individuals master the art of coding. 
            Our mission is to make learning to code accessible, engaging, and effective for everyone, 
            from complete beginners to experienced developers looking to expand their skills.
          </p>
          <p className="text-gray-600 mb-4">
            Founded in 2023, CodeLearn combines interactive courses, real-time coding environments, 
            and a supportive community to create a unique learning experience. Our team of experienced 
            developers and educators are passionate about empowering the next generation of tech innovators.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Innovation in education</li>
            <li>Accessibility and inclusivity</li>
            <li>Continuous improvement</li>
            <li>Community-driven learning</li>
            <li>Practical, real-world skills</li>
          </ul>
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