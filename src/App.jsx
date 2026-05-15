import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PhysicsLabPage from './pages/PhysicsLabPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/physics-lab" element={<PhysicsLabPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
