import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import lightningIcon from '../assets/ui/lightning.svg'
import targetIcon from '../assets/ui/target.svg'
import gamepadIcon from '../assets/ui/gamepad.svg'
import bookIcon from '../assets/ui/book.svg'
import phoneIcon from '../assets/ui/phone.svg'
import rocketIcon from '../assets/ui/rocket.svg'

const features = [
  {
    icon: gamepadIcon,
    title: 'Gamified',
    body: 'Earn XP and complete missions',
  },
  {
    icon: bookIcon,
    title: 'Educational',
    body: 'Learn real physics concepts',
  },
  {
    icon: phoneIcon,
    title: 'Mobile-Friendly',
    body: 'Learn anywhere, anytime',
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="h-screen w-full flex items-center justify-center px-4">
        <div className="glass-panel p-12 max-w-2xl w-full">
          <div className="text-center mb-8">
            <img
              src={lightningIcon}
              alt=""
              aria-hidden
              className="home-hero-icon mx-auto mb-6"
              draggable="false"
            />
            <h1 className="text-5xl font-bold glow-text mb-4">
              Physics Lab
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Interactive STEM Learning for Rural Students
            </p>
            <p className="text-gray-400">
              Learn electricity concepts through hands-on experimentation
            </p>
          </div>

          <div className="bg-glass-light rounded-lg p-6 my-8 border border-electric-blue border-opacity-20">
            <h2 className="font-semibold text-electric-blue mb-3 flex items-center gap-2">
              <img
                src={targetIcon}
                alt=""
                aria-hidden
                className="inline-icon"
                draggable="false"
              />
              Your Mission:
            </h2>
            <p className="text-gray-300">
              Restore electricity to the village water pump by building a complete electric circuit. 
              Learn how electricity flows, connect components, and watch the magic happen!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {features.map((feature) => (
              <div key={feature.title} className="glass-panel p-4 text-center">
                <img
                  src={feature.icon}
                  alt=""
                  aria-hidden
                  className="feature-icon mx-auto mb-2"
                  draggable="false"
                />
                <h3 className="font-semibold text-neon-green">{feature.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{feature.body}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/physics-lab')}
            className="btn-primary w-full text-lg flex items-center justify-center gap-2"
          >
            <img
              src={rocketIcon}
              alt=""
              aria-hidden
              className="button-icon"
              draggable="false"
            />
            Launch Physics Lab
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Part of the rural STEM learning platform
          </p>
        </div>
      </div>
    </Layout>
  )
}
