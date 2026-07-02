const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005'

export interface AuthUser {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  token: string
}

interface ApiError {
  message: string
  cooldown?: number
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  const data = await res.json()

  if (!res.ok) {
    const error = new Error(data.message || 'Something went wrong') as Error & ApiError
    error.cooldown = data.cooldown
    throw error
  }

  return data as T
}

export function registerUser(payload: { name: string; email: string; password: string }) {
  return request<{ message: string; email: string; resendTime: number }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function verifySignupOtp(payload: { email: string; otp: string }) {
  return request<AuthUser>('/api/auth/verify-signup-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function resendOtp(payload: { email: string; purpose: 'signup' | 'reset' }) {
  return request<{ message: string; resendTime: number }>('/api/auth/resend-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function loginUser(payload: { email: string; password: string }) {
  return request<AuthUser>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function forgotPassword(payload: { email: string }) {
  return request<{ message: string; email: string; resendTime: number }>('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function verifyResetOtp(payload: { email: string; otp: string }) {
  return request<{ message: string; resetToken: string; email: string }>('/api/auth/verify-reset-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function resetPassword(payload: { resetToken: string; password: string }) {
  return request<AuthUser & { message: string }>('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const OTP_RESEND_TIME = 60
