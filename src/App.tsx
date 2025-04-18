import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'

import AbilityGame from '@components/AbilityGame'
import AceGame from '@components/AceGame'
import Footer from '@components/Footer'
import Header from '@components/Header'
import MapGame from '@components/MapGame'
import Menu from '@components/Menu'

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="h-screen flex flex-col bg-background text-text">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div className="flex-grow flex flex-col items-center justify-center">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/ace" element={<AceGame />} />
              <Route path="/map" element={<MapGame />} />
              <Route path="/ability" element={<AbilityGame />} />
              <Route
                path="*"
                element={
                  <p className="text-center">
                    GET /404
                    <br />
                    This page does not exist (yet)
                  </p>
                }
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
