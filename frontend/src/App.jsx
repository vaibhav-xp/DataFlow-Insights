import styled from 'styled-components'
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Piechart from './components/Piechart'
import Dashboard from './components/Dashboard'
import Barchart from './components/Barchart'

const Main = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #c94b4b;
    background: -webkit-linear-gradient(to right, #4b134f, #c94b4b);
    background: linear-gradient(to right, #4b134f, #c94b4b);
    min-height: 100vh;
    width: 100%;
`

function App() {

  return (
    <Main>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/barchart' element={<Barchart />} />
          <Route path='/piechart' element={<Piechart />} />
        </Routes>
      </Router>
    </Main>
  )
}

export default App
