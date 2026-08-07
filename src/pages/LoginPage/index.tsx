import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/Button'
import { CrossIcon } from '@/shared/ui/Tag/CrossIcon'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/shared/ui/Input'
import { useState } from 'react'
import { Eye } from './Eye'
import { CloseEye } from './CloseEye'
import bulb from './light-bulb.png'
import clsx from 'clsx'
import { getAuthUser } from '@/features/auth/model/authUtils'
import style from './loginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const user = getAuthUser()
    if (!user) {
      setError(true)
      return
    }
    if (user.email !== email) {
      setError(true)
      return
    }
    // if (user.password !== password) { У нас сейчас в типе данных AuthUser нет пароля, поэтому проверки на него пока нет
    //   setError(true)
    //   return
    // }
    navigate('/')
  }

  return (
    <div className={style.page}>
      <header className={style.header}>
        <Logo />
        <Button className={style.buttonClose} onClick={() => navigate('/')}>
          Закрыть <CrossIcon />
        </Button>
      </header>
      <main className={style.main}>
        <h1 className={style.title}>Вход</h1>
        <div className={style.inner}>
          <div className={style.container}>
            <form className={style.form} onSubmit={onSubmitForm}>
              <Input
                label="Email"
                type="email"
                value={email}
                placeholder="Введите email"
                className={error ? style.inputError : ''}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(false)
                }}
              />
              <Input
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Введите ваш пароль"
                className={error ? style.inputError : ''}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                rightIcon={
                  showPassword ? (
                    <CloseEye onClick={togglePasswordVisibility} />
                  ) : (
                    <Eye onClick={togglePasswordVisibility} />
                  )
                }
              />
              {error && (
                <p className={style.error}>
                  Email или пароль введён неверно. Пожалуйста проверьте правильность введённых
                  данных
                </p>
              )}
              <div className={style.buttons}>
                <Button variant="primary" type="submit">
                  Войти
                </Button>
                <Button variant="tertiary" type="button" onClick={() => navigate('/register')}>
                  Зарегистрироваться
                </Button>
              </div>
            </form>
          </div>
          <div className={clsx(style.container, style.greetings)}>
            <img src={bulb} alt="Горящая лампочка" className={style.img} />
            <div className={style.description}>
              <h3 className={style.subtitle}>С возвращением в SkillSwap!</h3>
              <p className={style.text}>Обменивайтесь знаниями и навыками с другими людьми</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
