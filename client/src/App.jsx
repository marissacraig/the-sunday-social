/* eslint-disable no-unused-vars */
import HomePage from './pages/homePage'
import Header from './components/Header'
import ProfilePage from './pages/profilePage'
import Messages from './pages/messages'
import Friends from './pages/friends'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [triggerRefreshAmongPages, setTriggerRefreshAmongPages] = useState(false)

  return (
    <>
      <BrowserRouter>
      <Header triggerRefreshAmongPages={triggerRefreshAmongPages} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage
            triggerRefreshAmongPages={triggerRefreshAmongPages}
            setTriggerRefreshAmongPages={setTriggerRefreshAmongPages}
           />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/friends' element={<Friends />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
