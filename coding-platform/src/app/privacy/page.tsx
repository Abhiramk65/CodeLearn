// src/app/privacy/page.tsx
import Link from 'next/link'

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            At CodeLearn, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, such as when you create an account, 
            enroll in a course, or contact us for support. This may include your name, email address, 
            and other personal information.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to provide, maintain, and improve our services, 
            to communicate with you, and to personalize your learning experience.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement a variety of security measures to maintain the safety of your personal information. 
            However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page.
          </p>
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