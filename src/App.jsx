import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Adminlayout from './components/layout/Index'
import LoginPage from './pages/login/Index'
import Statistics from './pages/statistics/Index'
import RegionPage from './pages/region'
import StarterTestPage from './pages/startest'
import LessonTestPage from './pages/lessontest'
import EndTestPage from './pages/endtest'
import CategoryTestPage from './pages/categorytest'
import AddLesson from './pages/darslar/addLesson'
import AddModule from './pages/darslar/addModule'
import AddTestForLesson from './pages/darslar/addTestForLesson'
import Adpage from './pages/ad/Index';
 

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<Adminlayout/>}>
        <Route path='/statistics' element={<Statistics/>} />
        <Route path='/results/start' element={<StarterTestPage />} />
        <Route path='/results/lesson' element={<LessonTestPage />} />
        <Route path='/results/result-finish' element={<CategoryTestPage />} />
        <Route path='/results/category' element={<EndTestPage />} />
        <Route path='/lessons/2' element={<AddLesson />} />
        <Route path='/lessons/1' element={<AddModule />} />
        <Route path='/lessons/3' element={<AddTestForLesson />} />
        <Route path='/ads' element={<Adpage />} />
        <Route path='/regions' element={<RegionPage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  );
};

export default App;
