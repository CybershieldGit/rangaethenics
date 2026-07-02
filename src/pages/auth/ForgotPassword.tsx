import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'
import { AlertMessage } from '../../components/auth/AlertMessage'
import { AuthButton } from '../../components/auth/AuthButton'
import { forgotPassword } from '../../utils/authApi'

export function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await forgotPassword({ email })
      navigate(`/verify-email?email=${encodeURIComponent(email)}&purpose=reset`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Forgot Password"
        subtitle="No worries! Enter your registered email and we'll send you a 6 digit OTP to reset your password."
      >
        {error && <AlertMessage title="Unable to send OTP" message={error} />}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <AuthInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            icon={<Mail size={17} strokeWidth={1.5} />}
            required
          />

          <AuthButton type="submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </AuthButton>
        </form>

        <p className="mt-6 text-center">
          <Link to="/login" className="font-inter text-[16px] font-bold text-maroon hover:underline">
            Back to Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}
