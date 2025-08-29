import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About - Jeremy Watt',
  description: 'AI projects, startup experiments, and technical deep dives by Jeremy Watt. Exploring agentic systems, LLMs, and product design.',
}

export default function About() {
  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main id="main-content" className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="mb-8">
                <Image
                  src="https://neonwatty.com/assets/images/image01.jpg?v=865be4d0"
                  alt="Jeremy Watt"
                  width={139}
                  height={139}
                  className="rounded-full mx-auto shadow-lg"
                />
              </div>
              
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hi, I'm Jeremy
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
                I'm a Machine Learning Engineer with a BA in Religious Studies and a PhD in Artificial Intelligence.
              </p>
              
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                I am also the author of a{' '}
                <Link 
                  href="https://github.com/neonwatty/machine-learning-refined" 
                  className="text-purple-600 hover:text-purple-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  popular university textbook on machine learning
                </Link>
                , a university instructor, an HVAC certified technician, and a CrossFit athlete.
              </p>
            </div>

            {/* Projects Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Here are some recent fun side projects I've worked on - click an image to learn more!
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href="https://mybodyscans.xyz/"
                  className="group block transform transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://neonwatty.com/assets/images/gallery01/441ca67d.jpg?v=865be4d0"
                      alt="Organize Your InBody Scans With AI"
                      width={255}
                      height={260}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">InBody Scan Organizer</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Organize Your InBody Scans With AI</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="https://neonwatty.github.io/meme-search"
                  className="group block transform transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://neonwatty.com/assets/images/gallery01/b4bf70ed.jpg?v=865be4d0"
                      alt="meme search"
                      width={260}
                      height={260}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Meme Search</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered meme search engine</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="https://github.com/neonwatty/polarize"
                  className="group block transform transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Polarize</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Polarize</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Helps coders learn faster from YouTube tutorials</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="https://bleepthatsht.xyz/"
                  className="group block transform transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://neonwatty.com/assets/images/gallery01/d69bc053.jpg?v=865be4d0"
                      alt="bleep that sht"
                      width={252}
                      height={260}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Bleep That</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Audio censoring tool</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="https://github.com/neonwatty/youtube-gif-maker"
                  className="group block transform transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://neonwatty.com/assets/images/gallery01/05a0446e.jpg?v=865be4d0"
                      alt="yt-gif-maker"
                      width={260}
                      height={260}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">YouTube GIF Maker</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Convert YouTube videos to GIFs</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="https://github.com/neonwatty/js-todo-timers"
                  className="group block transform transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://neonwatty.com/assets/images/gallery01/19ec2584.jpg?v=865be4d0"
                      alt="todo timers"
                      width={265}
                      height={260}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Todo Timers</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Task management with timers</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8">Connect with me on social!</h2>
              
              <div className="flex justify-center space-x-6 mb-8">
                <Link
                  href="https://github.com/neonwatty"
                  className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/jeremy-watt/"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>

                <Link
                  href="https://www.youtube.com/@neonwatty"
                  className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </Link>

                <Link
                  href="https://mlrefined.com/"
                  className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ML Refined"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </Link>

                <Link
                  href="https://www.producthunt.com/@neonwatty"
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Product Hunt"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.604 8.4h-3.405v3.2h3.405a1.6 1.6 0 1 0 0-3.2zm8.396 3.6c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-4.8-2.4a4.8 4.8 0 0 1-4.8 4.8h-3.405v3.2h-3.191v-12.8h6.596a4.8 4.8 0 0 1 4.8 4.8z"/>
                  </svg>
                </Link>

                <Link
                  href="https://ko-fi.com/neonwatty"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ko-fi"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.033 11.316c.049 4.049 3.314 6.945 7.516 6.945 2.264 0 4.264-.823 5.541-2.087.085-.084.167-.17.246-.258.079.088.161.174.246.258 1.277 1.264 3.277 2.087 5.541 2.087 4.204 0 7.467-2.896 7.516-6.945.049-3.992-.033-11.316-.033-11.316s-.075-.798-.679-.798c0 0-4.085.508-4.859 4.593z"/>
                  </svg>
                </Link>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © Jeremy Watt. All rights reserved.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}