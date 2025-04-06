import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'

import FinisherGame from '@components/FinisherGame'
import Footer from '@components/Footer'
import Header from '@components/Header'
import KillGame from '@components/KillGame'
import Menu from '@components/Menu'

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="h-screen flex flex-col bg-background text-text">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '/' : '/vlr-guessr'}>
          <Header />
          <div className="flex-grow flex flex-col items-center justify-center">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/finisher" element={<FinisherGame />} />
              <Route path="/kill" element={<KillGame />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
