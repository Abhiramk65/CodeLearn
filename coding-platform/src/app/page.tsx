// src/app/page.tsx
'use client'

import Link from 'next/link'
import { Code, BookOpen, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="relative flex-grow">
        <div className="absolute inset-0 z-0">
          <BackgroundAnimation />
        </div>
        <div className="relative z-10">
          <header className="bg-white bg-opacity-90 shadow">
            <nav className="container mx-auto px-6 py-3">
              <div className="flex justify-between items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl font-semibold text-gray-700"
                >
                  <Link href="/" className="flex items-center">
                    <Code className="h-6 w-6 mr-2" />
                    CodeLearn
                  </Link>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex space-x-4"
                >
                  <Link href="/courses" className="text-gray-800 hover:text-blue-500">Courses</Link>
                  <Link href="/coding" className="text-gray-800 hover:text-blue-500">Playground</Link>
                  <Link href="/community" className="text-gray-800 hover:text-blue-500">Community</Link>
                </motion.div>
              </div>
            </nav>
          </header>

          <main className="container mx-auto px-6 py-8 mb-16">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to CodeLearn</h1>
              <p className="text-xl text-gray-600 mb-8">Master coding with interactive lessons and real-time feedback</p>
              <Link href="/coding" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
                Start Coding Now
              </Link>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-blue-500" />}
                title="Interactive Courses"
                description="Learn through hands-on coding exercises and projects tailored to your skill level."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-blue-500" />}
                title="AI-Powered Assistant"
                description="Get instant help and explanations from our AI coding assistant."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-blue-500" />}
                title="Community Support"
                description="Connect with fellow learners, share your progress, and collaborate on projects."
              />
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white bg-opacity-90 rounded-lg shadow-md p-8 mb-12"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CourseCard
                  title="Python Fundamentals"
                  description="Learn the basics of Python programming language."
                  level="Beginner"
                  duration="4 weeks"
                />
                <CourseCard
                  title="Web Development with React"
                  description="Build modern web applications using React and Next.js."
                  level="Intermediate"
                  duration="6 weeks"
                />
                <CourseCard
                  title="Data Structures and Algorithms"
                  description="Master essential computer science concepts and problem-solving skills."
                  level="Advanced"
                  duration="8 weeks"
                />
              </div>
            </motion.section>
          </main>
        </div>
      </div>

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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-90 rounded-lg shadow-md p-6"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

function CourseCard({ title, description, level, duration }: { title: string; description: string; level: string; duration: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-gray-50 bg-opacity-90 rounded-lg shadow p-6"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{level}</span>
        <span>{duration}</span>
      </div>
    </motion.div>
  )
}

function BackgroundAnimation() {
  return (
    <div className="background-animation">
      <style jsx>{`
        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }
        .background-animation::before,
        .background-animation::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background-image: 
            radial-gradient(circle, rgba(59, 130, 246, 0.3) 3px, transparent 3px),
            radial-gradient(circle, rgba(59, 130, 246, 0.2) 3px, transparent 3px);
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
        }
        .background-animation::before {
          animation: animateDots 40s linear infinite;
        }
        .background-animation::after {
          animation: animateDots 60s linear infinite reverse;
        }
        @keyframes animateDots {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>
    </div>
  )
}