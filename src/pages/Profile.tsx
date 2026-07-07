import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CircleUserRound,
  Package,
  MapPin,
  Heart,
  LogOut
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import {
  getUserProfileApi,
  updateUserProfileApi,
  getUserOrdersApi,
  cancelOrderApi,
  getUserWishlistApi,
  Address,
  Order
} from '../utils/authApi'
import { ValueProposition } from '../components/home/ValueProposition'
import { DatePicker } from '../components/ui/DatePicker'

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = true,
  type = 'text',
  className = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  type?: string
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm text-text-dark font-sans font-medium text-left">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full border border-[#BD8A3C]/50 bg-white px-3 text-sm text-text-dark outline-none transition-colors focus:border-maroon focus:bg-[#BD8A3C0F] rounded-none"
      />
    </label>
  )
}

export function Profile() {
  const navigate = useNavigate()
  const { user, logout, login } = useAuth()
  const { addToCart } = useCart()
  const { items: wishlistIds, removeFromWishlist, clearWishlist } = useWishlist()

  const [currentView, setCurrentView] = useState<'profile' | 'orders' | 'addresses' | 'wishlist' | 'logout'>('profile')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')

  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<any[]>([])

  // Single shipping address object (matches user.address in schema)
  const [address, setAddress] = useState<Address | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)

  // Addresses form states
  const [shippingLabel, setShippingLabel] = useState('')
  const [shippingFullName, setShippingFullName] = useState('')
  const [shippingPhone, setShippingPhone] = useState('')
  const [shippingHouseFlatNo, setShippingHouseFlatNo] = useState('')
  const [shippingStreetArea, setShippingStreetArea] = useState('')
  const [shippingLandmark, setShippingLandmark] = useState('')
  const [shippingCity, setShippingCity] = useState('')
  const [shippingState, setShippingState] = useState('')
  const [shippingPostalCode, setShippingPostalCode] = useState('')
  const [shippingCountry, setShippingCountry] = useState('India')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  // Fetch full profile info, orders, and wishlist on load
  useEffect(() => {
    if (!user?.token) return

    const fetchData = async () => {
      try {
        setError('')
        const profile = await getUserProfileApi(user.token)

        // Parse name into first and last name
        const nameParts = profile.name ? profile.name.trim().split(/\s+/) : []
        setFirstName(nameParts[0] || '')
        setLastName(nameParts.slice(1).join(' ') || '')
        setEmail(profile.email || '')
        setPhone(profile.phone || '')
        setDateOfBirth(profile.dateOfBirth || '')
        setGender(profile.gender || '')

        // Load shipping address details if they exist in the profile
        if (profile.address) {
          setAddress(profile.address)
          setShippingLabel(profile.address.label || '')
          setShippingFullName(profile.address.fullName || '')
          setShippingPhone(profile.address.phone || '')
          setShippingHouseFlatNo(profile.address.houseFlatNo || '')
          setShippingStreetArea(profile.address.streetArea || '')
          setShippingLandmark(profile.address.landmark || '')
          setShippingCity(profile.address.city || '')
          setShippingState(profile.address.state || '')
          setShippingPostalCode(profile.address.postalCode || '')
          setShippingCountry(profile.address.country || 'India')
        }

        // Fetch Orders
        try {
          const userOrders = await getUserOrdersApi(user.token)
          setOrders(userOrders || [])
        } catch (orderErr) {
          console.error('Failed to fetch user orders:', orderErr)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile details')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?.token])

  // Sync full product wishlist items when global wishlist context updates
  useEffect(() => {
    console.log('Profile syncWishlist triggered. wishlistIds:', wishlistIds, 'userToken:', user?.token)
    if (!user?.token) return
    const syncWishlist = async () => {
      try {
        const userWishlist = await getUserWishlistApi(user.token)
        console.log('Profile syncWishlist API response:', userWishlist)
        setWishlist(userWishlist || [])
      } catch (wishlistErr) {
        console.error('Failed to fetch user wishlist:', wishlistErr)
      }
    }
    syncWishlist()
  }, [wishlistIds, user?.token])

  const handleCancelOrder = async (orderId: string) => {
    if (!user?.token) return
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    try {
      setSaving(true)
      await cancelOrderApi(orderId, user.token)
      // Refresh orders
      const userOrders = await getUserOrdersApi(user.token)
      setOrders(userOrders || [])
      setSuccess('Order cancelled successfully!')
      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order')
      setTimeout(() => setError(''), 5000)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.token) return

    setErrorMessage('')
    setSuccess('')

    if (!shippingLabel.trim()) {
      setErrorMessage('Please enter Address Label')
      return
    }
    if (!shippingFullName.trim()) {
      setErrorMessage('Please enter Full Name')
      return
    }
    if (!shippingPhone.trim() || !/^\d{10}$/.test(shippingPhone.trim())) {
      setErrorMessage('Please enter a valid 10-digit Phone Number')
      return
    }
    if (!shippingHouseFlatNo.trim()) {
      setErrorMessage('Please enter House/Flat No.')
      return
    }
    if (!shippingStreetArea.trim()) {
      setErrorMessage('Please enter Street/Area')
      return
    }
    if (!shippingCity.trim()) {
      setErrorMessage('Please enter City')
      return
    }
    if (!shippingState.trim()) {
      setErrorMessage('Please enter State')
      return
    }
    if (!shippingPostalCode.trim() || !/^\d{6}$/.test(shippingPostalCode.trim())) {
      setErrorMessage('Please enter a valid 6-digit Pincode')
      return
    }

    setSaving(true)
    try {
      const updated = await updateUserProfileApi(
        {
          address: {
            label: shippingLabel,
            fullName: shippingFullName,
            phone: shippingPhone,
            houseFlatNo: shippingHouseFlatNo,
            streetArea: shippingStreetArea,
            landmark: shippingLandmark,
            city: shippingCity,
            state: shippingState,
            postalCode: shippingPostalCode,
            country: shippingCountry,
          }
        },
        user.token
      )

      login({
        ...user,
        address: updated.address
      })

      setAddress(updated.address || null)
      setSuccess('Address updated successfully!')
      setShowAddressForm(false)
      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update address')
    } finally {
      setSaving(false)
    }
  }

  const handleClearWishlist = async () => {
    setSaving(true)
    setErrorMessage('')
    setSuccess('')
    try {
      await clearWishlist()
      setSuccess('Wishlist cleared successfully!')
      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      setErrorMessage('Failed to clear wishlist')
      setTimeout(() => setErrorMessage(''), 5000)
    } finally {
      setSaving(false)
    }
  }

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId)
    } catch (err) {
      console.error('Failed to remove from wishlist:', err)
    }
  }

  const handleMoveAllToBag = async () => {
    if (!user?.token || wishlist.length === 0) return
    setSaving(true)
    setErrorMessage('')
    setSuccess('')
    try {
      let count = 0
      for (const item of wishlist) {
        if (item.countInStock > 0) {
          await addToCart(item._id, 1)
          await removeFromWishlist(item._id)
          count++
        }
      }
      if (count > 0) {
        setSuccess('All items moved to bag successfully!')
      } else {
        setErrorMessage('No items were moved (out of stock)')
      }
      setTimeout(() => {
        setSuccess('')
        setErrorMessage('')
      }, 5000)
    } catch (err) {
      setErrorMessage('Failed to move items to bag')
      setTimeout(() => setErrorMessage(''), 5000)
    } finally {
      setSaving(false)
    }
  }

  const handleAddProductToBag = async (item: any) => {
    if (!user?.token) return
    if (item.countInStock <= 0) {
      setErrorMessage('Product is out of stock')
      setTimeout(() => setErrorMessage(''), 5000)
      return
    }
    setSaving(true)
    setErrorMessage('')
    setSuccess('')
    try {
      await addToCart(item._id, 1)
      await removeFromWishlist(item._id)
      setSuccess(`${item.name} moved to bag successfully!`)
      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      setErrorMessage('Failed to add item to bag')
      setTimeout(() => setErrorMessage(''), 5000)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.token) return

    setErrorMessage('')
    setError('')
    setSuccess('')

    // Validate First Name
    if (!firstName.trim() || /[^a-zA-Z\s]/.test(firstName)) {
      setErrorMessage('Please enter a valid First Name')
      return
    }

    // Validate Last Name
    if (!lastName.trim() || /[^a-zA-Z\s]/.test(lastName)) {
      setErrorMessage('Please enter a valid Last Name')
      return
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid Email Address')
      return
    }

    // Validate Phone (must be digits only and exactly 10 digits)
    const phoneRegex = /^\d{10}$/
    if (!phone.trim() || !phoneRegex.test(phone.trim())) {
      setErrorMessage('Please enter a valid Phone Number')
      return
    }

    // Validate DOB format (DD/MM/YYYY)
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    if (!dateOfBirth.trim() || !dobRegex.test(dateOfBirth)) {
      setErrorMessage('Please enter a valid Date of Birth')
      return
    }

    setSaving(true)

    try {
      const updated = await updateUserProfileApi(
        {
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          dateOfBirth,
          gender,
        },
        user.token
      )

      // Update Auth context user state
      login({
        ...user,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        dateOfBirth: updated.dateOfBirth,
        gender: updated.gender,
        address: updated.address
      })

      setAddress(updated.address || null)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#F8F0E5]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#BD8A3C] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F0E5] pt-6 pb-12 font-sans text-text-dark text-[16px]">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-6">
        <div className="flex items-center gap-1 text-[16px] text-[#717171] font-sans">
          <Link to="/" className="hover:text-maroon">Home</Link>
          <span>/</span>
          <span className="hover:text-maroon">My Account</span>
          <span>/</span>
          <span
            className={`cursor-pointer hover:text-maroon ${currentView === 'profile' ? 'text-[#8C6036] font-semibold' : ''}`}
            onClick={() => setCurrentView('profile')}
          >
            Profile Details
          </span>
          {currentView === 'orders' && (
            <>
              <span>/</span>
              <span className="text-[#8C6036] font-semibold">My Order</span>
            </>
          )}
          {currentView === 'addresses' && (
            <>
              <span>/</span>
              <span className="text-[#8C6036] font-semibold">My Addresses</span>
            </>
          )}
          {currentView === 'wishlist' && (
            <>
              <span>/</span>
              <span className="text-[#8C6036] font-semibold">My Wishlist</span>
            </>
          )}
          {currentView === 'logout' && (
            <>
              <span>/</span>
              <span className="text-[#8C6036] font-semibold">Logout</span>
            </>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Profile Avatar Card */}
            <div className="w-full max-w-[420px] h-[96px] border border-[#BD8A3C]/30 bg-[#F8F0E5] p-5 flex items-center gap-4 shadow-sm shrink-0">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#420001] text-white">
                <CircleUserRound size={32} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 font-sans">
                <h3 className="font-serif text-[20px] font-bold leading-tight text-maroon truncate">
                  {firstName} {lastName}
                </h3>
                <p className="text-[16px] text-[#717171] truncate">{email}</p>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="w-full max-w-[420px] h-[440px] border border-[#BD8A3C80] bg-[#F8F0E5] pt-[30px] pb-[30px] px-[1px] flex flex-col gap-[10px] shadow-sm">
              <div className="px-[30px] mb-1">
                <h3 className="font-serif text-[20px] font-bold text-[#7a6e67]">My Account</h3>
              </div>
              <nav className="flex flex-col gap-[10px] overflow-y-auto text-[16px]">
                <button
                  type="button"
                  onClick={() => setCurrentView('profile')}
                  className={`flex items-center gap-3 px-[30px] py-3.5 text-[16px] text-left transition-colors font-sans font-medium cursor-pointer ${currentView === 'profile'
                    ? 'font-semibold text-maroon bg-[#F5ECE3] border-b border-[#420001]'
                    : 'text-[#222222] hover:bg-[#FAF6F0] hover:text-maroon'
                    }`}
                >
                  <CircleUserRound size={18} strokeWidth={1.5} />
                  Profile Details
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('orders')}
                  className={`flex items-center gap-3 px-[30px] py-3.5 text-[16px] text-left transition-colors font-sans font-medium cursor-pointer ${currentView === 'orders'
                    ? 'font-semibold text-maroon bg-[#F5ECE3] border-b border-[#420001]'
                    : 'text-[#222222] hover:bg-[#FAF6F0] hover:text-maroon'
                    }`}
                >
                  <Package size={18} strokeWidth={1.5} />
                  My Order
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('addresses')}
                  className={`flex items-center gap-3 px-[30px] py-3.5 text-[16px] text-left transition-colors font-sans font-medium cursor-pointer border-t border-[#BD8A3C]/10 w-full ${currentView === 'addresses'
                    ? 'font-semibold text-maroon bg-[#F5ECE3] border-b border-[#420001]'
                    : 'text-[#222222] hover:bg-[#FAF6F0] hover:text-maroon'
                    }`}
                >
                  <MapPin size={18} strokeWidth={1.5} />
                  Manage Addresses
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('wishlist')}
                  className={`flex items-center gap-3 px-[30px] py-3.5 text-[16px] text-left transition-colors font-sans font-medium cursor-pointer border-t border-[#BD8A3C]/10 w-full ${currentView === 'wishlist'
                    ? 'font-semibold text-maroon bg-[#F5ECE3] border-b border-[#420001]'
                    : 'text-[#222222] hover:bg-[#FAF6F0] hover:text-maroon'
                    }`}
                >
                  <Heart size={18} strokeWidth={1.5} />
                  Wishlist
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('logout')}
                  className={`flex w-full items-center gap-3 px-[30px] py-3.5 text-left text-[16px] font-sans font-medium cursor-pointer border-t border-[#BD8A3C]/10 transition-colors ${currentView === 'logout'
                    ? 'font-semibold text-maroon bg-[#F5ECE3] border-b border-[#420001]'
                    : 'text-[#222222] hover:bg-[#FAF6F0] hover:text-maroon'
                    }`}
                >
                  <LogOut size={18} strokeWidth={1.5} />
                  Logout
                </button>
              </nav>
            </div>

            {/* Need Help? Box */}
            <div className="w-full max-w-[420px] h-[218px]  bg-[#BD8A3C0F] p-[30px] flex flex-col justify-between text-left shadow-sm">
              <div className="flex flex-col gap-[10px]">
                <h4 className="font-serif text-[20px] font-bold text-[#420001] leading-none">Need Help?</h4>
                <p className="text-[16px] text-[#717171] font-sans leading-none">We are here fpr you</p>
              </div>
              <button
                type="button"
                className="w-full py-3.5 border border-[#420001] text-[#420001] text-[16px] font-sans font-semibold bg-[#BD8A3C0F] hover:bg-[#420001] hover:text-white transition-all rounded-none"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            {currentView === 'profile' && (
              <div className="flex flex-col w-full lg:w-[860px]">
                {/* Header section (Second Image specs: 528x58, gap 12) */}
                <div className="flex flex-col gap-[12px] w-full lg:w-[528px] lg:h-[58px] shrink-0 text-left">
                  <h2 className="font-serif text-[20px] font-bold text-[#420001] leading-none">Profile Details</h2>
                  <p className="text-[16px] text-[#717171] font-sans leading-none mt-1">
                    Manage your personal information and account details.
                  </p>
                </div>

                <div className="w-full lg:w-[860px] h-[650px] border border-[#BD8A3C80] bg-[#F8F0E5] p-[30px] flex flex-col shadow-sm mt-[62px]">
                  {errorMessage && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-[16px]">
                      {errorMessage}
                    </div>
                  )}
                  {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-[16px]">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-[16px]">
                      {success}
                    </div>
                  )}

                  <form onSubmit={handleUpdate} className="w-full h-full flex flex-col justify-between gap-[39px]">
                    {/* Form fields section */}
                    <div className="flex flex-col gap-[30px]">
                      {/* Profile Information Header */}
                      <div className="flex items-center pb-2 border-b border-[#BD8A3C]/20">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-[20px] font-bold text-maroon">Profile Information</h3>
                          <button
                            type="button"
                            onClick={() => {
                              document.getElementById('firstNameInput')?.focus()
                            }}
                            className="flex items-center gap-1 text-[16px] font-serif font-bold text-maroon hover:underline transition-colors cursor-pointer"
                          >
                            Edit
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Form Fields Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[39px] gap-y-[24px]">
                        {/* First Name */}
                        <div>
                          <label className="block text-[16px] font-medium text-[#717171] mb-1.5 font-sans">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstNameInput"
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value)
                              setErrorMessage('')
                              setSuccess('')
                            }}
                            className="w-full h-11 px-3 bg-[#F5ECE3]/50 focus:bg-[#BD8A3C0F] focus:border-maroon focus:outline-none border-none font-sans text-[16px] font-medium text-text-dark rounded-none transition-colors"
                          />
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-[16px] font-medium text-[#717171] mb-1.5 font-sans">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value)
                              setErrorMessage('')
                              setSuccess('')
                            }}
                            className="w-full h-11 px-3 bg-[#F5ECE3]/50 focus:bg-[#BD8A3C0F] focus:border-maroon focus:outline-none border-none font-sans text-[16px] font-medium text-text-dark rounded-none transition-colors"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[16px] font-medium text-[#717171] mb-1.5 font-sans">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              setErrorMessage('')
                              setSuccess('')
                            }}
                            className="w-full h-11 px-3 bg-[#F5ECE3]/50 focus:bg-[#BD8A3C0F] focus:border-maroon focus:outline-none border-none font-sans text-[16px] font-medium text-text-dark rounded-none transition-colors"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-[16px] font-medium text-[#717171] mb-1.5 font-sans">
                            Phone Number
                          </label>
                          <div className="flex items-center w-full h-11 px-3 bg-[#F5ECE3]/50 focus-within:bg-[#BD8A3C0F] focus-within:ring-1 focus-within:ring-maroon transition-colors rounded-none">
                            <span className="font-sans text-[16px] font-medium text-[#717171] mr-1.5 select-none">+91</span>
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => {
                                const validation = e.target.value
                                if (validation.length <= 10 && !isNaN(Number(validation))) {
                                  setPhone(validation)
                                }
                                setErrorMessage('')
                                setSuccess('')
                              }}
                              placeholder="5545 625 425"
                              className="w-full h-full bg-transparent focus:outline-none border-none font-sans text-[16px] font-medium text-text-dark p-0"
                            />
                          </div>
                        </div>

                        {/* DOB */}
                        <div>
                          <label className="block text-[16px] font-medium text-[#717171] mb-1.5 font-sans">
                            Date of Birth
                          </label>
                          <DatePicker
                            value={dateOfBirth}
                            onChange={(val) => {
                              setDateOfBirth(val)
                              setErrorMessage('')
                              setSuccess('')
                            }}
                            placeholder="DD/MM/YYYY"
                            className="w-full h-11 px-3 bg-[#F5ECE3]/50 focus:bg-[#BD8A3C0F] focus:border-maroon focus:outline-none border-none font-sans text-[16px] font-medium text-text-dark rounded-none transition-colors"
                          />
                        </div>

                        {/* Gender */}
                        <div>
                          <label className="block text-[16px] font-medium text-[#717171] mb-1.5 font-sans">
                            Gender
                          </label>
                          <div className="flex items-center gap-6 h-11">
                            {['Male', 'Female', 'Others'].map((option) => (
                              <label key={option} className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                  type="radio"
                                  name="gender"
                                  value={option}
                                  checked={gender?.toLowerCase() === option.toLowerCase()}
                                  onChange={() => {
                                    setGender(option)
                                    setErrorMessage('')
                                    setSuccess('')
                                  }}
                                  className="sr-only"
                                />
                                <span
                                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all ${gender?.toLowerCase() === option.toLowerCase()
                                    ? 'border-[#420001] bg-[#420001]'
                                    : 'border-[#CCCCCC] bg-[#EAEAEA]'
                                    }`}
                                >
                                  {gender?.toLowerCase() === option.toLowerCase() && (
                                    <span className="h-2 w-2 rounded-full bg-white" />
                                  )}
                                </span>
                                <span className="text-[16px] font-sans font-medium text-[#4a3f38]">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Update Profile button */}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-16 py-3.5 bg-[#A37A74] text-white text-[16px] font-sans font-semibold hover:bg-[#8D645E] transition-all rounded-none tracking-wide"
                      >
                        {saving ? 'Saving...' : 'Update Profile'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {currentView === 'orders' && (
              // My Order Section
              <div className="flex flex-col w-full lg:w-[860px]">
                {/* Header section (Second Image specs: 528x58, gap 12) */}
                <div className="flex flex-col gap-[12px] w-full lg:w-[528px] lg:h-[58px] shrink-0 text-left">
                  <h2 className="font-serif text-[20px] font-bold text-[#420001] leading-none">My Order</h2>
                  <p className="text-[16px] text-[#717171] font-sans leading-none mt-1">
                    Manage your personal information and account details.
                  </p>
                </div>

                {/* Filters Row */}
                <div className="flex items-center gap-6 border-b border-[#BD8A3C]/20 pb-2 text-[16px] font-sans font-semibold text-[#717171] mt-[62px]">
                  <span className="text-maroon border-b-2 border-maroon pb-2 cursor-pointer font-bold font-sans">All Orders ({orders.length})</span>
                  <span className="hover:text-maroon cursor-pointer pb-2 font-sans">Shipped (0)</span>
                  <span className="hover:text-maroon cursor-pointer pb-2 font-sans">Delivered (0)</span>
                  <span className="hover:text-maroon cursor-pointer pb-2 font-sans">Cancelled (0)</span>
                </div>

                {/* Orders List Container */}
                <div className="flex flex-col gap-[15px] mt-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12 border border-[#BD8A3C1A] bg-[#BD8A3C05] text-[16px] text-[#717171] font-sans">
                      No orders found in your account.
                    </div>
                  ) : (
                    orders.map((order) => {
                      const firstItem = order.orderItems[0];
                      if (!firstItem) return null;
                      const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      });
                      return (
                        <div key={order._id} className="w-full lg:w-[860px] lg:h-[200px] border border-[#BD8A3C1A] bg-[#BD8A3C05] p-[20px] flex items-center shadow-sm">
                          <div className="w-full lg:w-[820px] lg:h-[160px] flex flex-col lg:flex-row items-center gap-[38px]">
                            {/* Product Image */}
                            <img
                              src={firstItem.product?.image || '/images/Lehengas.png'}
                              alt={firstItem.name}
                              className="w-[160px] h-[160px] object-cover shrink-0"
                            />

                            {/* Details Column */}
                            <div className="w-[178px] h-[124px] flex flex-col gap-[20px] shrink-0 text-left">
                              <div className="flex flex-col gap-1">
                                <h4 className="font-sans text-[16px] font-bold text-[#420001] leading-none truncate w-[178px]">
                                  Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                                </h4>
                                <p className="text-[16px] text-[#717171] font-sans leading-none">{orderDate} • {order.orderItems.length} Item{order.orderItems.length > 1 ? 's' : ''}</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <p className="text-[16px] font-bold text-text-dark font-sans leading-none">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                                <div className="flex items-center gap-1.5 text-[16px] text-[#717171] font-sans leading-none">
                                  <span>Payment:</span>
                                  <span className="font-bold border border-[#BD8A3C]/40 px-1 py-0.5 rounded bg-white text-[9px] tracking-widest text-[#420001] font-sans uppercase">{order.paymentMethod}</span>
                                </div>
                              </div>
                            </div>

                            {/* Status Column */}
                            <div className="w-full lg:w-[188px] h-[124px] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#BD8A3C1A] lg:pl-[38px] shrink-0 text-left">
                              <div>
                                <p className="text-[16px] text-[#717171] uppercase tracking-wider mb-1 font-sans">Order Status</p>
                                {order.paymentStatus?.toLowerCase() === 'cancelled' || order.shippingStatus?.toLowerCase() === 'cancelled' ? (
                                  <span className="inline-flex items-center justify-center w-[97px] h-[26px] bg-[#7171711A] text-[#717171] text-[16px] leading-none font-semibold rounded-none tracking-wide uppercase font-sans">
                                    Cancelled
                                  </span>
                                ) : order.isPaid || order.paymentMethod === 'COD' ? (
                                  <span className="inline-flex items-center justify-center w-[97px] h-[26px] bg-[#4200011A] text-[#420001] text-[16px] leading-none font-semibold rounded-none tracking-wide uppercase font-sans">
                                    Delivered
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-[97px] h-[26px] bg-[#BD8A3C1A] text-[#BD8A3C] text-[16px] leading-none font-semibold rounded-none tracking-wide uppercase font-sans">
                                    Processing
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-[16px] text-[#717171] font-sans">
                                <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span className="truncate max-w-[150px]">Placed on {orderDate}</span>
                              </div>
                            </div>

                            {/* Actions Column */}
                            <div className="w-full lg:w-[180px] h-[160px] flex flex-col justify-center gap-2.5 shrink-0 font-sans">
                              <button className="w-full py-2 border border-[#BD8A3C]/50 text-text-dark text-[16px] font-semibold bg-white hover:bg-black/5 rounded-none transition-all cursor-pointer">
                                View Details
                              </button>
                              <button className="w-full py-2 bg-[#420001] text-white text-[16px] font-semibold hover:opacity-90 rounded-none flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                                Track Order
                              </button>
                              {order.paymentStatus?.toLowerCase() !== 'cancelled' && order.shippingStatus?.toLowerCase() !== 'cancelled' && (
                                <button
                                  onClick={() => handleCancelOrder(order._id)}
                                  className="w-full py-2 border border-[#BD8A3C]/50 text-text-dark text-[16px] font-semibold bg-white hover:bg-[#420001] hover:text-white rounded-none transition-all cursor-pointer"
                                >
                                  Cancel Order
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {currentView === 'addresses' && (
              // My Addresses Section
              <div className="flex flex-col w-full lg:w-[860px] shrink-0">
                {/* Header section (Second Image specs: 528x58, gap 12) */}
                <div className="flex flex-col gap-[12px] w-full lg:w-[528px] lg:h-[58px] shrink-0 text-left">
                  <h2 className="font-serif text-[20px] font-bold text-[#420001] leading-none">My Addresses</h2>
                  <p className="text-[16px] text-[#717171] font-sans leading-none mt-1">
                    Manage your delivery addresses for a smoother checkout experience.
                  </p>
                </div>

                {/* Main Card List Container (Third Image specs: 860x648, gap 28) */}
                <div className="flex flex-col gap-[28px] w-full lg:w-[860px] lg:h-auto shrink-0 mt-[62px]">
                  {/* Existing Addresses Card (Fourth Image specs: 860x332, border: 1px solid #717171) */}
                  <div className="w-full lg:w-[860px] lg:h-[332px] border border-[#717171] bg-[#F8F0E5] shadow-sm flex flex-col justify-between shrink-0">
                    {address && (address.fullName || address.houseFlatNo || address.city || address.streetArea) ? (
                      <div className="w-full lg:h-[166px] p-[20px] flex flex-col justify-between text-left shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-[#BD8A3C1A] text-[#BD8A3C] text-xs font-semibold uppercase tracking-wider font-sans">
                            Default Shipping Address
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={async () => {
                                if (!user?.token) return
                                if (window.confirm('Are you sure you want to clear this address?')) {
                                  try {
                                    setSaving(true)
                                    const updated = await updateUserProfileApi({
                                      address: {
                                        label: '',
                                        fullName: '',
                                        phone: '',
                                        houseFlatNo: '',
                                        streetArea: '',
                                        landmark: '',
                                        city: '',
                                        state: '',
                                        postalCode: '',
                                        country: 'India',
                                      }
                                    }, user.token)
                                    login({ ...user, address: updated.address })
                                    setAddress(null)
                                    setShippingLabel('')
                                    setShippingFullName('')
                                    setShippingPhone('')
                                    setShippingHouseFlatNo('')
                                    setShippingStreetArea('')
                                    setShippingLandmark('')
                                    setShippingCity('')
                                    setShippingState('')
                                    setShippingPostalCode('')
                                    setSuccess('Address cleared successfully!')
                                    setTimeout(() => setSuccess(''), 5000)
                                  } catch (err) {
                                    setErrorMessage('Failed to clear address')
                                  } finally {
                                    setSaving(false)
                                  }
                                }
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#BD8A3C]/50 text-[#BD8A3C] text-xs font-semibold hover:bg-black/5 rounded-none transition-all font-sans cursor-pointer"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                setShowAddressForm(true)
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#BD8A3C]/50 text-[#BD8A3C] text-xs font-semibold hover:bg-black/5 rounded-none transition-all font-sans cursor-pointer"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1 text-left font-sans mt-2">
                          <div className="flex items-center gap-4">
                            <span className="text-[16px] font-bold text-text-dark">{address.fullName}</span>
                            <span className="text-[16px] font-bold text-text-dark">{address.phone}</span>
                          </div>
                          <p className="text-[16px] text-[#717171] leading-relaxed">
                            {address.houseFlatNo}, {address.streetArea}, {address.landmark ? address.landmark + ', ' : ''}{address.city}, {address.state} - {address.postalCode}, {address.country}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#717171] font-sans text-[16px] p-6 text-center">
                        No address saved. Use the form below to add a shipping address.
                      </div>
                    )}
                  </div>

                  {/* Add New Address Card / Form (Fifth Image Outer specs: 860x288, border 1, padding, gap 10) */}
                  {showAddressForm ? (
                    <form onSubmit={handleUpdateAddress} className="w-full lg:w-[860px] border border-[#BD8A3C80] bg-[#BD8A3C05] p-[20px] md:p-[30px] flex flex-col gap-5 shrink-0 font-sans">
                      <p className="text-left font-serif text-lg text-text-dark font-medium">Add New Address</p>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
                        <Field
                          label="Address Label"
                          value={shippingLabel}
                          onChange={setShippingLabel}
                          placeholder="e.g. Home, Work"
                          className="sm:col-span-2"
                        />
                        <Field
                          label="Full Name"
                          value={shippingFullName}
                          onChange={setShippingFullName}
                          placeholder="Recipient name"
                        />
                        <Field
                          label="Phone Number"
                          value={shippingPhone}
                          onChange={setShippingPhone}
                          placeholder="10-digit mobile number"
                          type="tel"
                        />
                        <Field
                          label="House / Flat No."
                          value={shippingHouseFlatNo}
                          onChange={setShippingHouseFlatNo}
                          placeholder="e.g. A-101"
                        />
                        <Field
                          label="Street / Area"
                          value={shippingStreetArea}
                          onChange={setShippingStreetArea}
                          placeholder="Street, locality"
                        />
                        <Field
                          label="Landmark"
                          value={shippingLandmark}
                          onChange={setShippingLandmark}
                          placeholder="Nearby landmark (optional)"
                          required={false}
                          className="sm:col-span-2"
                        />
                        <Field
                          label="City"
                          value={shippingCity}
                          onChange={setShippingCity}
                          placeholder="City"
                        />
                        <Field
                          label="State"
                          value={shippingState}
                          onChange={setShippingState}
                          placeholder="State"
                        />
                        <Field
                          label="Pincode"
                          value={shippingPostalCode}
                          onChange={setShippingPostalCode}
                          placeholder="6-digit pincode"
                        />
                        <Field
                          label="Country"
                          value={shippingCountry}
                          onChange={setShippingCountry}
                          placeholder="Country"
                        />
                      </div>

                      <div className="flex items-center justify-start gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setShowAddressForm(false)}
                          className="px-6 py-2.5 border border-[#BD8A3C]/50 text-text-dark text-sm font-semibold bg-white hover:bg-black/5 rounded-none transition-all cursor-pointer font-serif"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-6 py-2.5 bg-[#420001] border border-[#420001] text-white text-sm font-serif font-semibold hover:bg-transparent hover:text-[#420001] rounded-none transition-all cursor-pointer"
                        >
                          {saving ? 'Saving...' : 'Save Address'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="w-full lg:w-[860px] lg:h-[288px] border border-[#BD8A3C80] bg-[#BD8A3C05] pt-[30px] pb-[30px] px-[163px] gap-[10px] flex items-center justify-center shrink-0">
                      <div className="w-full lg:w-[534px] lg:h-[228px] flex flex-col items-center justify-center text-center gap-[20px] shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BD8A3C0F]">
                          <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif text-[20px] font-bold text-[#420001] leading-none">Add a new address</h3>
                          <p className="text-[16px] text-[#717171] font-sans">
                            Add multiple addresses and choose the one that suits you at checkout.
                          </p>
                        </div>
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="px-10 py-3.5 bg-[#420001] text-white text-[16px] font-semibold hover:opacity-90 transition-all rounded-none flex items-center justify-center gap-2 cursor-pointer font-sans"
                        >
                          <span>+</span> Add New Address
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentView === 'wishlist' && (
              // My Wishlist Section (First Image specs: 860x760, gap 62)
              <div className="flex flex-col w-full lg:w-[860px] lg:h-[760px] shrink-0">
                {/* Header section (Second Image specs: 528x58, gap 12) */}
                <div className="flex items-center justify-between w-full lg:w-[860px] lg:h-[58px] shrink-0">
                  <div className="flex flex-col gap-1 text-left">
                    <h2 className="font-serif text-[20px] font-bold text-[#420001] leading-none">My Wishlist ({wishlist.length})</h2>
                    <p className="text-[16px] text-[#717171] font-sans leading-none mt-1">
                      Your saved favorites - handpicked for you.
                    </p>
                  </div>
                  {wishlist.length > 0 && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleClearWishlist}
                        className="px-6 py-2.5 border border-[#BD8A3C]/50 text-text-dark text-[16px] font-semibold bg-white hover:bg-black/5 rounded-none transition-all cursor-pointer font-sans"
                      >
                        Clear Wishlist
                      </button>
                      <button
                        onClick={handleMoveAllToBag}
                        className="px-6 py-2.5 bg-[#420001] border border-[#420001] text-white text-[16px] font-semibold hover:bg-transparent hover:text-[#420001] rounded-none transition-all cursor-pointer font-sans"
                      >
                        Move All to Bag
                      </button>
                    </div>
                  )}
                </div>

                {/* Wishlist Items List Container (gap 62px via mt-[62px]) */}
                <div className="flex flex-col gap-[20px] w-full lg:w-[860px] shrink-0 mt-[62px]">
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12 border border-[#BD8A3C1A] bg-[#BD8A3C05] text-[16px] text-[#717171] font-sans">
                      Your wishlist is empty.
                    </div>
                  ) : (
                    wishlist.map((item) => (
                      <div key={item._id} className="w-full lg:w-[860px] lg:h-[200px] border border-[#BD8A3C1A] bg-[#BD8A3C05] p-[20px] flex items-center gap-[20px] shadow-sm shrink-0">
                        <img
                          src={item.image || '/images/Lehengas.png'}
                          alt={item.name}
                          className="w-[160px] h-[160px] object-cover shrink-0"
                        />

                        {/* Inner Row (Third Image specs: 641x157, justify-content space-between) */}
                        <div className="w-full lg:w-[641px] lg:h-[157px] flex items-center justify-between gap-4 shrink-0">
                          {/* Product Details (Fourth Image specs: 238x124) */}
                          <div className="w-[238px] h-[124px] flex flex-col justify-between text-left shrink-0">
                            {/* Title & Info (238x52, gap 10) */}
                            <div className="flex flex-col gap-[10px] w-[238px] h-[52px] shrink-0">
                              <h4 className="font-serif text-[16px] font-bold text-[#420001] leading-none truncate w-[238px]">
                                {item.name}
                              </h4>
                              <p className="text-[16px] text-[#717171] font-sans leading-none">{item.category || 'Clothing'} • M</p>
                            </div>
                            {/* Price & Stock info */}
                            <div className="flex flex-col gap-2.5">
                              <p className="text-[16px] font-bold text-text-dark font-sans leading-none">₹{item.price?.toLocaleString('en-IN')}</p>
                              <div className="flex">
                                <span className="inline-flex items-center justify-center px-3 py-1 bg-[#BD8A3C1A] text-[#420001] text-[16px] font-medium font-sans leading-none rounded-none">
                                  {item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons (Fifth Image specs: 156x79, gap 11) */}
                          <div className="w-[156px] h-[79px] flex flex-col justify-between shrink-0 font-sans">
                            <button
                              onClick={() => handleAddProductToBag(item)}
                              className="w-[156px] h-[34px] bg-[#420001] text-white text-[16px] font-semibold hover:opacity-90 rounded-none flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                              </svg>
                              Add to Bag
                            </button>
                            <button
                              onClick={() => handleRemoveFromWishlist(item._id)}
                              className="w-[156px] h-[34px] border border-[#BD8A3C]/50 text-text-dark text-[16px] font-semibold bg-white hover:bg-black/5 rounded-none flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <svg className="w-4 h-4 text-text-dark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {currentView === 'logout' && (
              // Logout Card Outer container (First Image specs: 860x712, border-width 1, bg #BD8A3C05, border #BD8A3C1A)
              <div className="relative w-full lg:w-[860px] lg:h-auto border border-[#BD8A3C1A] bg-[#BD8A3C05] flex items-center justify-center shrink-0 p-[10px] md:p-[20px] lg:p-[28px] shadow-sm">

                {/* Inner Wrapper (Second Image specs: 820x672, border border-[#BD8A3C1A]) */}
                <div className="relative w-full lg:w-[820px] lg:h-auto flex items-center justify-center px-4 py-[45px] md:p-5 shrink-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 left-[100px] right-[100px] h-px bg-[#BD8A3C]"
                  />

                  {/* Bottom Line */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 left-[100px] right-[100px] h-px bg-[#BD8A3C]"
                  />

                  {/* Left Line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1 top-[100px] bottom-[100px] w-px bg-[#BD8A3C]"
                  />

                  {/* Right Line */}
                  <span
                    aria-hidden="true"
                    className="absolute right-1 top-[100px] bottom-[100px] w-px bg-[#BD8A3C]"
                  />

                  {/* corner_sqare.svg corners — top-left */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[1px] -left-[1px] h-[50px] w-[50px] md:h-[83px] md:w-[83px]"
                    style={{
                      backgroundColor: '#420001',
                      WebkitMaskImage: 'url(/corner_sqare.svg)',
                      maskImage: 'url(/corner_sqare.svg)',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                    }}
                  />
                  {/* corner_sqare.svg corners — top-right */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[1px] -right-[1px] h-[50px] w-[50px] md:h-[83px] md:w-[83px] -scale-x-100"
                    style={{
                      backgroundColor: '#420001',
                      WebkitMaskImage: 'url(/corner_sqare.svg)',
                      maskImage: 'url(/corner_sqare.svg)',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                    }}
                  />
                  {/* corner_sqare.svg corners — bottom-left */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[1px] -left-[1px] h-[50px] w-[50px] md:h-[83px] md:w-[83px] -scale-y-100"
                    style={{
                      backgroundColor: '#420001',
                      WebkitMaskImage: 'url(/corner_sqare.svg)',
                      maskImage: 'url(/corner_sqare.svg)',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                    }}
                  />
                  {/* corner_sqare.svg corners — bottom-right */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-[50px] w-[50px] md:h-[83px] md:w-[83px] -scale-100"
                    style={{
                      backgroundColor: '#420001',
                      WebkitMaskImage: 'url(/corner_sqare.svg)',
                      maskImage: 'url(/corner_sqare.svg)',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                    }}
                  />
                  {/* Content Wrapper (Third Image specs: 696x570, gap 70) */}
                  <div className="w-full lg:w-[696px] lg:h-[570px] flex flex-col justify-between items-center shrink-0">

                    {/* Header Block (Fourth Image specs: 696x136, gap 20) */}
                    <div className="flex flex-col items-center text-center gap-[20px] w-full lg:w-[696px] lg:h-[136px] shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BD8A3C0F]">
                        <LogOut className="w-6 h-6 text-maroon" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-[20px] font-bold text-[#420001] leading-none">
                          Are you sure you wat to logout?
                        </h3>
                        <p className="text-[16px] text-[#717171] font-sans leading-none mt-1">
                          You will be logged out of your account and need to login again to access your account.
                        </p>
                      </div>
                    </div>

                    {/* Reasons List (Fifth Image specs: 696x238, gap 38 via layout) */}
                    <div className="w-full lg:w-[696px] lg:h-[238px] flex flex-col justify-between shrink-0 text-left font-sans gap-[20px] my-5 ">
                      {/* Secure Account */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BD8A3C0F]">
                          <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-[#4a3f38] leading-none">Your account will be secure</h4>
                          <p className="text-[16px] text-[#717171] mt-1.5 leading-none">We keep your personal information safe and protected.</p>
                        </div>
                      </div>

                      {/* Wishlist Saved */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BD8A3C0F]">
                          <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-[#4a3f38] leading-none">Your wishlist will be saved</h4>
                          <p className="text-[16px] text-[#717171] mt-1.5 leading-none">All your favourite items will be waiting for you.</p>
                        </div>
                      </div>

                      {/* Cart Saved */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BD8A3C0F]">
                          <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-[#4a3f38] leading-none">Your cart will be saved</h4>
                          <p className="text-[16px] text-[#717171] mt-1.5 leading-none">Items in your cart will be available when you login again.</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons (width 696px, height 54px, gap 20px) */}
                    <div className="flex items-center gap-[20px] w-full lg:w-[696px] lg:h-[54px] shrink-0 font-sans mb-[15px]">
                      <button
                        type="button"
                        onClick={logout}
                        className="w-[338px] h-[54px] border border-[#420001] text-[#420001] text-[16px] font-semibold hover:bg-black/5 rounded-none transition-all cursor-pointer flex items-center justify-center bg-transparent"
                      >
                        Yes Logout
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentView('profile')}
                        className="w-[338px] h-[54px] bg-[#420001] text-white text-[16px] font-semibold hover:opacity-90 rounded-none transition-all cursor-pointer flex items-center justify-center"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-16">
        <ValueProposition />
      </div>
    </div>
  )
}
