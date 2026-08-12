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

export default function RegistrationStep1Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError] = useState(false); //убран setEmailError, чтобы не было ошибок линтера и сборки
  const navigate = useNavigate();

  const passwordHelper = (password.length > 0) && (password.length < 8) ? 'Пароль должен содержать не менее 8 знаков' : '';

  const emailHelper = emailError ? 'Email уже используется' : undefined;

  //TODO: когда будет готов механизм авторизации - сравнить email с сохранённой почтой зарегистрированного пользователя и вызвать setEmailError(true), чтобы появилось сообщение об ошибке

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     // TODO: сохранить введённые email и password при отправке формы

    navigate(ROUTES.REGISTRATION_STEP_2);
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Logo />
        <Button variant="tertiary">
          <span className={styles.buttonContent}  onClick={()=>navigate('/')}>
            Закрыть
            <CrossIcon />
          </span>
        </Button>
      </div>
      <div className={styles.stepper}>
        <StepIndicator stepsQuantity={3} activeStep={1} />
      </div>
      <div className={styles.content}>
        <div className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} helperText={emailHelper}placeholder='Введите email' label='Email' />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} helperText={passwordHelper} error={emailError} rightIcon={<EyeIcon onClick={() => setShowPassword(prev => !prev)} className={styles.eyeIcon} />} placeholder='Придумайте надёжный пароль' label='Пароль' />
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
