import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Adminlayout from './components/layout/Index'
import LoginPage from './pages/login/Index'
import Statistics from './pages/statistics/Index'
import RegionPage from './pages/region'

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<Adminlayout/>}>
        <Route path='/statictics' element={<Statistics/>} />
        <Route path='/regions' element={<RegionPage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App