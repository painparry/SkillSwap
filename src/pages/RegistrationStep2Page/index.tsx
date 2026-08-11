import { useState, useEffect, FormEvent } from 'react'
import styles from './RegistrationStep2Page.module.css'
import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/Button'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { Input } from '@/shared/ui/Input'
import { AvatarUpload } from '@/shared/ui/AvatarUpload'
import { DatePicker } from '@/shared/ui/DatePicker'
import { MultiSelect, MultiSelectOption } from '@/shared/ui/MultiSelect'
import { SingleSelect, SingleSelectOption } from '@/shared/ui/SingleSelect'
import type { SkillCategory, City } from '@/shared/types'
import { CrossIcon } from './icons/CrossIcon'
import userimg from '@/assets/images/user.svg'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'

export default function RegistrationStep1Page() {
  const [, setAvatar] = useState<File|null>(null); //переменная avatar пока убрана, чтобы избежать ошибок линтера
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [cityId, setCityId] = useState('');
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [selectedCategoriesLearn, setSelectedCategoriesLearn] = useState<string[]>([]);
  const [selectedSubcategoriesLearn, setSelectedSubcategoriesLearn] = useState<string[]>([]);

  const genderOptions: SingleSelectOption[] = [
    {value: 'male', label: 'Мужской'},
    {value:'female', label: 'Женский'}
  ]

  useEffect(() => {
  fetch('/db/cities.json')
    .then((response) => response.json())
    .then((data: City[]) => setCities(data));
  }, []);

  const CityOptions: SingleSelectOption[] = cities.map(city => ({value: String(city.id), label: city.name}));

  useEffect(() => {
  fetch('/db/skills.json')
    .then((response) => response.json())
    .then((data: SkillCategory[]) => setCategories(data));
  }, []);

  const categoryOptions: MultiSelectOption[] = categories.map(category =>
    ({value: category.id, label: category.name})
  )
  const selectedCategoryObjects = categories.filter(category => (selectedCategoriesLearn.includes(category.id)));
  const subcategoryOptions: MultiSelectOption[] = selectedCategoryObjects.flatMap(category => category.subcategories.map(subcategory => ({value: subcategory.id, label: subcategory.name})));

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     // TODO: сохранить введённые данные при отправке формы

    navigate(ROUTES.REGISTRATION_STEP_3);
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
        <StepIndicator stepsQuantity={3} activeStep={2} />
      </div>
      <div className={styles.content}>
        <div className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <AvatarUpload onChange={(file) => setAvatar(file)}/>
            <Input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Введите ваше имя' label='Имя' />
            <div className={styles.birthdateGenderWrapper}>
              <div className={styles.birthdate}>
                <DatePicker value={birthDate} onChange={setBirthDate}/>
              </div>
              <div className={styles.selectGendertWrapper}>
                <SingleSelect options={genderOptions} value={gender} onChange={setGender} label='Пол' placeholder='Не указан'/>
              </div>
            </div>
            <div className={styles.selectCitytWrapper}>
              <SingleSelect options={CityOptions} value={cityId} onChange={setCityId} label='Город' placeholder='Не указан' />
            </div>
            <MultiSelect options={categoryOptions} selectedValues={selectedCategoriesLearn} onChange={setSelectedCategoriesLearn} placeholder='Выберите категорию' label='Категория навыка, которому хотите научиться' />
            <MultiSelect options={subcategoryOptions} selectedValues={selectedSubcategoriesLearn} onChange={setSelectedSubcategoriesLearn} placeholder='Выберите подкатегорию' label='Подкатегория навыка, которому хотите научиться' />
            <div className={styles.buttonsWrapper}>
              <Button variant='secondary' className={styles.button} onClick={() => navigate(ROUTES.REGISTRATION_STEP_1)}>Назад</Button>
              <Button variant='primary' type="submit" className={styles.button}>Продолжить</Button>
              </div>
          </form>
        </div>
        <div className={styles.formCard}>
          <img src={userimg} alt="пользователь" className={styles.image} />
          <h2 className={styles.cardHeader}>Расскажите немного о себе</h2>
          <span className={styles.cardText}>Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена</span>
        </div>
      </div>
    </main>
  )
}
