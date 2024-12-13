import { useState } from 'react'
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

function App() {

  return (
      <div>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App
