import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CompanyProblems from './pages/CompanyProblems'
import MainLayout from './components/layout/MainLayout'
import TestAuth from './pages/TestAuth'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import PrivateRoute from './routes/Privateroute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route element={<PrivateRoute />} >
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/company/:companyId" element={<CompanyProblems />} />
            <Route path="/test-auth" element={<TestAuth />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
