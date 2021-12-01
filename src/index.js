import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Routes, BrowserRouter as Router  } from 'react-router-dom'

import {Header, Footer} from './components/pageFrameComponents.jsx'
import HomePage from './pages/home_page/HomePage.jsx';
import GraphicDesign from './pages/graphic_design/GraphicDesign.jsx';
import FirelinePage from './pages/FirelinePage.jsx';
import EchoesPage from './pages/EchoesPage.jsx';
import AnimationPage from './pages/animation/AnimationPage.jsx';
import LightingIndex from './pages/lighting_design/LightingIndex.jsx';
import Eurydice from './pages/lighting_design/Eurydice.jsx';
import StopKiss from './pages/lighting_design/StopKiss.jsx';
import LegallyBlonde from './pages/lighting_design/LegallyBlonde';
import CSPage from './pages/CSPage';



ReactDOM.render(
  <React.StrictMode>
    < Router >
    <Header />
    <main>
      <Routes>
         <Route exact path="/" element={<HomePage/>} />
         <Route path="/index" element={<HomePage/>} />
         <Route path="/graphic_design" element={< GraphicDesign />} />
         <Route path="/computer_science" element={< CSPage/>} />
         <Route path="/animation" element={< AnimationPage />} />
         <Route path="/fireline" element={< FirelinePage />} />
         <Route path="/echoes_in_glass" element={< EchoesPage />} />
         <Route path="/lighting_design" element={< LightingIndex />} />
         <Route path="/lighting/eurydice" element={< Eurydice />} />
         <Route path="/lighting/legally_blonde" element={< LegallyBlonde />} />
         <Route path="/lighting/stop_kiss" element={< StopKiss />} />
      </Routes>
      </main>
   <Footer />
   </ Router >
  </React.StrictMode>,
  document.getElementById('root')
);
