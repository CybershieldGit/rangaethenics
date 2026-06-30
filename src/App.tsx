import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Clothing } from './pages/Clothing'
import { Jewellery } from './pages/Jewellery'
import { Products } from './pages/Products'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clothing" element={<Clothing />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  )
}

export default App
