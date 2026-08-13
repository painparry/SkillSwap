import { useState, FormEvent } from 'react'
import styles from './RegistrationStep1Page.module.css'
import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/Button'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { Input } from '@/shared/ui/Input'
import { CrossIcon } from './icons/CrossIcon'
import { EyeIcon } from './icons/EyeIcon'
import lampimg from '../../assets/images/lamp.svg'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'

const REGISTRATION_KEY = 'skillswap_registration'

function getRegistrationData() {
  try {
    const raw = localStorage.getItem(REGISTRATION_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveRegistrationData(data: Record<string, unknown>) {
  localStorage.setItem(REGISTRATION_KEY, JSON.stringify({ ...getRegistrationData(), ...data }))
}

export default function RegistrationStep1Page() {
  const stored = getRegistrationData()
  const [email, setEmail] = useState(stored.email ?? '')
  const [password, setPassword] = useState(stored.password ?? '')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [emailHelper, setEmailHelper] = useState<string | undefined>(undefined)
  const navigate = useNavigate()

  const passwordHelper = password.length > 0 && password.length < 8
    ? 'Пароль должен содержать не менее 8 знаков'
    : ''

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setEmailError(true)
      setEmailHelper('Введите корректный email (например, user@example.com)')
      return
    }

    setEmailError(false)
    setEmailHelper(undefined)
    saveRegistrationData({ email, password })
    navigate(ROUTES.REGISTRATION_STEP_2)
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Logo />
        <Button className={styles.closeButton} onClick={() => navigate(ROUTES.HOME)}>
          Закрыть <CrossIcon />
        </Button>
      </div>
      <div className={styles.stepper}>
        <StepIndicator stepsQuantity={3} activeStep={1} />
      </div>
      <div className={styles.content}>
        <div className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailHelper}
              error={emailError}
              placeholder='Введите email'
              label='Email'
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              helperText={passwordHelper}
              rightIcon={<EyeIcon onClick={() => setShowPassword(prev => !prev)} className={styles.eyeIcon} />}
              placeholder='Придумайте надёжный пароль'
              label='Пароль'
            />
            <Button variant='primary' type="submit">Далее</Button>
          </form>
        </div>
        <div className={styles.formCard}>
          <img src={lampimg} alt="лампочка" className={styles.image} />
          <h2 className={styles.cardHeader}>Добро пожаловать в SkillSwap!</h2>
          <span className={styles.cardText}>Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми</span>
        </div>
      </div>
    </main>
  )
}