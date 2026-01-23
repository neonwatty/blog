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
      
      <div className="min-h-screen flex flex-col transition-colors" style={{ backgroundColor: 'transparent' }}>
        <Header />
        
        <main className="mb-10">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-indigo-500/[0.08] border border-indigo-500/20 shadow-md shadow-indigo-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
              <div className="mb-4 text-center">
                <img
                  src="/images/jeremy-watt-headshot.jpg"
                  alt="Jeremy Watt"
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-500/30 shadow-xl mb-6"
                />
                <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Hi, I'm Jeremy!</h1>
              </div>

              <div className="space-y-3">
                <section>
                  <p className="text-lg text-center" style={{ color: 'var(--color-text-secondary)' }}>
                    AI Engineer. In previous lives I've been a scholar of Religion, a PhD student in Machine Learning, and an HVAC certified technician.
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