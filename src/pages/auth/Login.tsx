import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthButton } from '../../components/auth/AuthButton'
import { AlertMessage } from '../../components/auth/AlertMessage'
import { useAuth } from '../../context/AuthContext'
import { loginUser } from '../../utils/authApi'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await loginUser({ email, password })
      login(user)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard title="Welcome" subtitle="Login to continue to your account">
        {error && <AlertMessage title="Login failed" message={error} />}

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <div className="space-y-3">
            <AuthInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              icon={<Mail size={17} strokeWidth={1.5} />}
              required
            />

            <div>
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
              <div className="mt-2 text-right">
                <Link
                  to="/forgot-password"
                  className="font-inter text-[14px] font-medium text-maroon hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <AuthButton type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </AuthButton>
          </div>
        </form>

        <p className="mt-auto pt-6 text-center font-inter text-[16px] text-[#8E8E8E]">
          Don&apos;t have account?{' '}
          <Link to="/signup" className="font-bold text-maroon hover:underline">
            Register
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}
