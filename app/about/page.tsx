import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'About Jeremy',
  description: 'AI Engineer, HVAC certified technician, and Religious Studies BA passionate about building intelligent systems.',
}

export default function About() {
  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
        <Header />
        
        <main className="mb-10">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="mb-4 text-center">
                <img 
                  src="https://neonwatty.com/assets/images/image01.jpg?v=865be4d0" 
                  alt="Jeremy Watt" 
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-200 dark:border-indigo-700 shadow-xl mb-6"
                />
                <h1 className="text-4xl font-bold mb-4">Hi, I'm Jeremy!</h1>
              </div>
              
              <div className="space-y-3">
                <section>
                  <p className="text-lg text-center" style={{ color: 'var(--color-text-primary)' }}>
                    I'm an AI Engineer busy building and thinking about the exponential timeline we live in.
                  </p>
                </section>

                <section>
                  <p className="text-lg text-center" style={{ color: 'var(--color-text-primary)' }}>
                    In previous lives I've been a scholar of Religion, a PhD student in Machine Learning, and an HVAC certified technician.
                  </p>
                </section>

              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}