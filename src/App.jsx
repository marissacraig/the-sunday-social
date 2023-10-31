import HomePage from './pages/homePage'
import Header from './components/Header'
import ProfilePage from './pages/profilePage'
import Friends from './pages/friends'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/friends' element={<Friends />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
