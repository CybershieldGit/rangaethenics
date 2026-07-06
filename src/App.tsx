import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Clothing } from './pages/Clothing'
import { Jewellery } from './pages/Jewellery'
import { Products } from './pages/Products'
import { About } from './pages/About'
import { Login } from './pages/auth/Login'
import { SignUp } from './pages/auth/SignUp'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { VerifyEmail } from './pages/auth/VerifyEmail'
import { ResetPassword } from './pages/auth/ResetPassword'
import { Profile } from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clothing" element={<Clothing />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
