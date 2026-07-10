import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Clothing } from './pages/Clothing'
import { Jewellery } from './pages/Jewellery'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Wishlist } from './pages/Wishlist'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Login } from './pages/auth/Login'
import { SignUp } from './pages/auth/SignUp'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { VerifyEmail } from './pages/auth/VerifyEmail'
import { ResetPassword } from './pages/auth/ResetPassword'
import { Profile } from './pages/Profile'
import { ShippingPolicy } from './pages/ShippingPolicy'
import { ReturnPolicy } from './pages/ReturnPolicy'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { Maintenance } from './pages/Maintenance'

function App() {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE !== 'false'

  if (isMaintenanceMode) {
    return <Maintenance />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clothing" element={<Clothing />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Route>
    </Routes>
  )
}

export default App
