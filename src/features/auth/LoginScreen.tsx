import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import { Logo } from '@/components/atoms/Logo'
import { Button } from '@/components/ui/Button'
import { ChevronLeftIcon, GiftIcon, ShieldIcon, TruckIcon } from '@/components/icons'
import { useAuth } from '@/context/AuthContext'

/** Dummy storefront sign-in. Any credentials are accepted. */
export function LoginScreen() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('sahabat@aloshop.id')
  const [password, setPassword] = useState('password')

  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    login(email)
    navigate(from, { replace: true })
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-surface">
      {/* Brand hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 px-5 pb-10 pt-5 text-white">
        <button
          type="button"
          aria-label="Kembali"
          onClick={() => navigate('/')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div className="mt-6">
          <img src="/iconaloshop.png" className='h-10' alt="" />
          <h1 className="mt-4 text-2xl font-extrabold leading-tight">Masuk untuk mulai belanja</h1>
          <p className="mt-1 text-sm text-white/80">Nikmati gratis ongkir, poin, dan promo eksklusif.</p>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </div>

      <form onSubmit={handleSubmit} className="-mt-6 flex-1 space-y-5 rounded-t-[1.75rem] bg-surface p-5">
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block pt-10 text-sm font-medium text-ink">Email atau No. HP</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <div className="text-right">
            <button type="button" className="text-sm font-semibold text-brand-600">
              Lupa password?
            </button>
          </div>
        </div>

        <Button type="submit" fullWidth>
          Masuk
        </Button>

        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <span className="h-px flex-1 bg-slate-200" />
          atau
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="secondary" onClick={handleSubmit}>
            Google
          </Button>
          <Button type="button" variant="secondary" onClick={handleSubmit}>
            Apple
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 text-center">
          {[
            { icon: <TruckIcon className="h-5 w-5" />, label: 'Gratis Ongkir' },
            { icon: <GiftIcon className="h-5 w-5" />, label: 'Poin Reward' },
            { icon: <ShieldIcon className="h-5 w-5" />, label: 'Aman' },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1 text-xs text-ink-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                {f.icon}
              </span>
              {f.label}
            </div>
          ))}
        </div>

        <p className="pt-2 text-center text-sm text-ink-soft">
          Belum punya akun?{' '}
          <button type="submit" className="font-semibold text-brand-600">
            Daftar sekarang
          </button>
        </p>
        <p className="text-center text-xs text-ink-muted">Demo — kredensial apa pun diterima.</p>
      </form>
    </div>
  )
}
