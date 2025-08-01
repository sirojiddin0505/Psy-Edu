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
        <Route path='/results/start' element={<StarterTestPage />} />
        <Route path='/results/lesson' element={<LessonTestPage />} />
        <Route path='/results/result-finish' element={<CategoryTestPage />} />
        <Route path='/results/category' element={<EndTestPage />} />
        <Route path='/lessons/2' element={<AddLesson />} />
        <Route path='/lessons/1' element={<AddModule />} />
        <Route path='/lessons/3' element={<AddTestForLesson />} />
        <Route path='/ads' element={<Adpage />} />
        <Route path='/regions' element={<RegionPage />} />
        <Route path='/tests/boshlangich' element={<BoshlangichTestPage/>} />
        <Route path='/tests/doimiy' element={<DoimiyTestPage/>} />
        <Route path='/tests/yakuniy' element={<YakuniyTestPage/>} />
      </Route>
     </Routes>
    </BrowserRouter>
  );
};

export default App;
