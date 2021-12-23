import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Routes, BrowserRouter as Router  } from 'react-router-dom'

import {Header, Footer, TopScrollWrapper} from './components/pageFrameComponents.jsx'
import HomePage from './pages/home_page/HomePage.jsx';
import GraphicDesign from './pages/graphic_design/GraphicDesign.jsx';
import FirelinePage from './pages/FirelinePage.jsx';
import EchoesPage from './pages/echoes_in_glass/EchoesPage.jsx';
import EchoesMusicPage from './pages/echoes_in_glass/EchoesMusicPage.jsx';
import MusicPage from './pages/MusicPage';
import AnimationPage from './pages/animation/AnimationPage.jsx';
import LightingIndex from './pages/lighting_design/LightingIndex.jsx';
import Eurydice from './pages/lighting_design/Eurydice.jsx';
import StopKiss from './pages/lighting_design/StopKiss.jsx';
import LegallyBlonde from './pages/lighting_design/LegallyBlonde';
import CSPage from './pages/CSPage';
import WritingPage from './pages/WritingPage';
import OtherProjectsPage from './pages/OtherProjectsPage';
import TardigradeSongPage from './pages/TardigradeSongPage';
import PatchworkPoemsPage from './pages/PatchworkPoemsPage';


ReactDOM.render(
  <React.StrictMode>
    < Router >
    <Header />
    <main>
      <TopScrollWrapper>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/index" element={<HomePage/>} />
            <Route path="/graphic_design" element={< GraphicDesign />} />
            <Route path="/computer_science" element={< CSPage/>} />
            <Route path="/writing" element={<WritingPage/>} />
            <Route path="/animation" element={< AnimationPage />} />
            <Route path="/music" element={< MusicPage />} />
            <Route path="/other_projects" element={<OtherProjectsPage/>}/>
            <Route path="/fireline" element={< FirelinePage />} />
            <Route path="/echoes_in_glass" element={< EchoesPage />} />
            <Route path="/echoes_in_glass/music" element={< EchoesMusicPage />} />
            <Route path="/organism_song" element={<TardigradeSongPage/>}/>
            <Route path="/lighting_design" element={< LightingIndex />} />
            <Route path="/lighting/eurydice" element={< Eurydice />} />
            <Route path="/lighting/legally_blonde" element={< LegallyBlonde />} />
            <Route path="/lighting/stop_kiss" element={< StopKiss />} />
            <Route path="/patchwork_poems" element={<PatchworkPoemsPage/>}/>
          </Routes>
        </TopScrollWrapper>
      </main>
   <Footer />
   </ Router >
  </React.StrictMode>,
  document.getElementById('root')
);
