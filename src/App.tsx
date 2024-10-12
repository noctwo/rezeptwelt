import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import Detail from './Pages/Detail/Detail'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element ={<Detail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
