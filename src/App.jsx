import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Adminlayout from './components/layout/Index'
import LoginPage from './pages/login/Index'
import Statistics from './pages/statistics/Index'
import RegionPage from './pages/region'
import BoshlangichTestPage from './pages/testlar/boshlangich'
import DoimiyTestPage from './pages/testlar/doimiy'
import YakuniyTestPage from './pages/testlar/yakuniy'

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<Adminlayout/>}>
        <Route path='/statictics' element={<Statistics/>} />
        <Route path='/regions' element={<RegionPage />} />
        <Route path='/tests/boshlangich' element={<BoshlangichTestPage/>} />
        <Route path='/tests/doimiy' element={<DoimiyTestPage/>} />
        <Route path='/tests/yakuniy' element={<YakuniyTestPage/>} />
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App