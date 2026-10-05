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
        {/* Active Route: Only the Rangethnics Landing Page is shown */}
        <Route path="/" element={<Home />} />

        {/* 
          All other routes are hidden/derouted to the Landing Page as requested, 
          while keeping all component code and imports completely intact.
        */}
        <Route path="/clothing" element={<Home />} />
        <Route path="/jewellery" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/product/:id" element={<Home />} />
        <Route path="/wishlist" element={<Home />} />
        <Route path="/cart" element={<Home />} />
        <Route path="/checkout" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/forgot-password" element={<Home />} />
        <Route path="/verify-email" element={<Home />} />
        <Route path="/reset-password" element={<Home />} />
        <Route path="/profile" element={<Home />} />
        <Route path="/shipping-policy" element={<Home />} />
        <Route path="/return-policy" element={<Home />} />
        <Route path="/privacy-policy" element={<Home />} />
        <Route path="/terms-of-service" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

// Preserved original page components in code as requested
export const _preservedPages = {
  Clothing,
  Jewellery,
  Products,
  ProductDetail,
  Wishlist,
  Cart,
  Checkout,
  About,
  Contact,
  Login,
  SignUp,
  ForgotPassword,
  VerifyEmail,
  ResetPassword,
  Profile,
  ShippingPolicy,
  ReturnPolicy,
  PrivacyPolicy,
  TermsOfService,
}

export default App
