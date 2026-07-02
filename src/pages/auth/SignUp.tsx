import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthButton } from '../../components/auth/AuthButton'
import { AlertMessage } from '../../components/auth/AlertMessage'
import { registerUser } from '../../utils/authApi'

export function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      await registerUser({ name, email, password })
      navigate(`/verify-email?email=${encodeURIComponent(email)}&purpose=signup`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard title="Create Account" subtitle="Sign Up discover our exclusive collection">
        {error && <AlertMessage title="Registration failed" message={error} />}

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <div className="space-y-3">
            <AuthInput
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              icon={<User size={17} strokeWidth={1.5} />}
              required
            />

            <AuthInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              icon={<Mail size={17} strokeWidth={1.5} />}
              required
            />

            <AuthInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              icon={<Lock size={17} strokeWidth={1.5} />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#A89E96] hover:text-maroon"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
              required
            />
          </div>

          <p className="mt-3 text-left font-inter text-[11px] leading-relaxed text-[#9A9088]">
            By proceeding ahead you agreed our Terms &amp; Conditions.
          </p>

          <div className="mt-4">
            <AuthButton type="submit" loading={loading}>
              {loading ? 'Sending OTP...' : 'Register'}
            </AuthButton>
          </div>
        </form>

        <p className="mt-auto pt-6 text-center font-inter text-[16px] text-[#8E8E8E]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-maroon hover:underline">
            Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}
