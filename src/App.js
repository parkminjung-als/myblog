import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/font.css';
import './style/style.css';
import AnimatedCursor from 'react-animated-cursor';
import About from './pages/About'
import Contact from './pages/Contact'
import Layout from './pages/Layout';
import Main from './pages/Main';
import Post from './pages/Post';
import Git from './pages/Git'
// 관리자
import PostWrite from './pages/admin/PostWrite';
const App = () => {
  return (
    <>
    <AnimatedCursor 
      innerSize={6}
      outerSize={6}
      color='0, 191, 255'
      outerAlpha={0.3}
      innerScale={2}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="post" element={<Post />} />
            <Route path="about" element={<About />} />
            <Route path="git" element={<Git />} />
            <Route path="contact" element={<Contact />} />

            <Route path="adminWrite" element={<PostWrite/>} />
          </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App