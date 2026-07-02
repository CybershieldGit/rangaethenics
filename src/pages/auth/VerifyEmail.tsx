import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthCard } from '../../components/auth/AuthCard'
import { OtpInput } from '../../components/auth/OtpInput'
import { AlertMessage } from '../../components/auth/AlertMessage'
import { AuthButton } from '../../components/auth/AuthButton'
import { Spinner } from '../../components/ui/Spinner'
import { useAuth } from '../../context/AuthContext'
import {
  OTP_RESEND_TIME,
  resendOtp,
  verifyResetOtp,
  verifySignupOtp,
} from '../../utils/authApi'

type OtpPurpose = 'signup' | 'reset'

export function VerifyEmail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()

  const email = searchParams.get('email') || ''
  const purpose = (searchParams.get('purpose') as OtpPurpose) || 'signup'

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [cooldown, setCooldown] = useState(OTP_RESEND_TIME)

  useEffect(() => {
    if (!email) {
      navigate(purpose === 'reset' ? '/forgot-password' : '/signup')
    }
  }, [email, navigate, purpose])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = window.setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [cooldown])

  const otpValue = otp.join('')
  const actionText =
    purpose === 'reset' ? 'to reset your password' : 'to register your account'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setLoading(true)

    try {
      if (purpose === 'signup') {
        const user = await verifySignupOtp({ email, otp: otpValue })
        login(user)
        navigate('/')
        return
      }

      const result = await verifyResetOtp({ email, otp: otpValue })
      sessionStorage.setItem('resetToken', result.resetToken)
      sessionStorage.setItem('resetEmail', result.email)
      navigate('/reset-password')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0 || resendLoading) return

    setError('')
    setResendLoading(true)

    try {
      await resendOtp({ email, purpose })
      setCooldown(OTP_RESEND_TIME)
      setOtp(Array(6).fill(''))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to resend OTP'
      const cooldownValue = (err as Error & { cooldown?: number }).cooldown
      setError(message)
      if (cooldownValue) {
        setCooldown(cooldownValue)
      }
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard title="Verify Your Email">
        <p className="mb-6 text-center font-inter text-sm leading-relaxed text-[#717171]">
          Please enter the 6 digit code below we sent on{' '}
          <span className="font-semibold text-maroon">{email}</span> {actionText}.
        </p>

        {error && (
          <AlertMessage
            title={error.includes('Invalid') ? 'Incorrect OTP' : 'Verification failed'}
            message={
              error.includes('Invalid')
                ? 'The code you entered is invalid. Please try again.'
                : error
            }
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <OtpInput value={otp} onChange={setOtp} disabled={loading} hasError={Boolean(error)} />

          <div className="flex items-center justify-between gap-3">
            <span className="font-inter text-sm text-[#9a8f88]">Didn&apos;t receive the code?</span>
            {cooldown > 0 ? (
              <span className="font-inter text-sm font-semibold text-maroon">
                Resend OTP ({String(Math.floor(cooldown / 60)).padStart(2, '0')}:
                {String(cooldown % 60).padStart(2, '0')})
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-maroon hover:underline disabled:opacity-60"
              >
                {resendLoading && <Spinner size={14} />}
                {resendLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            )}
          </div>

          <AuthButton type="submit" loading={loading}>
            {loading ? 'Verifying...' : 'Confirm OTP'}
          </AuthButton>
        </form>

        <p className="mt-6 text-center">
          <Link to="/login" className="font-inter text-sm font-semibold text-maroon hover:underline">
            Back to Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}
