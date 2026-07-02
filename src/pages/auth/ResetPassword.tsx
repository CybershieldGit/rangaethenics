import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'
import { AlertMessage } from '../../components/auth/AlertMessage'
import { AuthButton } from '../../components/auth/AuthButton'
import { useAuth } from '../../context/AuthContext'
import { resetPassword } from '../../utils/authApi'

export function ResetPassword() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetToken, setResetToken] = useState('')

  useEffect(() => {
    const token = sessionStorage.getItem('resetToken')
    if (!token) {
      navigate('/forgot-password')
      return
    }
    setResetToken(token)
  }, [navigate])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Use 8 or more characters with mix of letters, numbers, & symbols.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const result = await resetPassword({ resetToken, password })
      sessionStorage.removeItem('resetToken')
      sessionStorage.removeItem('resetEmail')
      login(result)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Create New Password"
        subtitle="Your OTP has been Verified. Please create a new password for your account."
      >
        {error && <AlertMessage title="Unable to reset password" message={error} />}

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-3">
          <div>
            <AuthInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
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
            <p className="mt-2 text-left font-inter text-[11px] text-[#9A9088]">
              Use 8 or more characters with mix of letters, numbers, &amp; symbols.
            </p>
          </div>

          <AuthInput
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            icon={<Lock size={17} strokeWidth={1.5} />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[#A89E96] hover:text-maroon"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            }
            required
          />

          <div className="pt-2">
            <AuthButton type="submit" disabled={loading || !resetToken}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </AuthButton>
          </div>
        </form>

        <p className="mt-auto pt-6 text-center">
          <Link to="/login" className="font-inter text-[16px] font-bold text-maroon hover:underline">
            Back to Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}
