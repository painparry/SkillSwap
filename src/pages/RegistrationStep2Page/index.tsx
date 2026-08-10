import { useState, useEffect, FormEvent } from 'react'
import styles from './RegistrationStep2Page.module.css'
import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/Button'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { Input } from '@/shared/ui/Input'
import { AvatarUpload } from '@/shared/ui/AvatarUpload'
import { DatePicker } from '@/shared/ui/DatePicker'
import { MultiSelect } from '@/shared/ui/MultiSelect'
import type { MultiSelectOption } from '@/shared/ui/MultiSelect'
import type { SkillCategory } from '@/shared/types'
import { CrossIcon } from './icons/CrossIcon'
import { ChevronDownIcon } from '@/shared/ui/SkillsDropdown/icons'
import userimg from '@/assets/images/user.svg'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'

export default function RegistrationStep1Page() {
  const [, setAvatar] = useState<File|null>(null); //переменная avatar пока убрана, чтобы избежать ошибок линтера
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [cityId, setCityId] = useState('');
  const [categories, setCategories] = useState<SkillCategory[]>([]); //данные из «бэкенда»
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  useEffect(() => {
  fetch('/db/skills.json')
    .then((response) => response.json())
    .then((data: SkillCategory[]) => setCategories(data));
  }, []);

  const categoryOptions: MultiSelectOption[] = categories.map(category =>
    ({value: category.id, label: category.name})
  )
  const selectedCategoryObjects = categories.filter(category => (selectedCategories.includes(category.id)));
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
          <span className={styles.buttonContent}>
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
                <label htmlFor="gender" className={styles.label}>
                  Пол
                </label>
                <div className={styles.selectField}>
                  <select id="gender" className={styles.select} value={gender} onChange={(e)=>setGender(e.target.value)}>
                    <option value="">Не указан</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                  </select>
                  <ChevronDownIcon className={styles.chevron} />
                </div>
              </div>
            </div>
            <div className={styles.selectCitytWrapper}>
              <label htmlFor="city" className={styles.label}>
                Город
              </label>
              <div className={styles.selectField}>
                <select id="city" className={styles.select} value={cityId} onChange={(e)=>setCityId(e.target.value)}>
                  <option value="">Не указан</option>
                  <option value="1">Казань</option>
                  <option value="2">Санкт-Петербург</option>
                  <option value="3">Москва</option>
                  <option value="4">Новосибирск</option>
                  <option value="5">Самара</option>
                  <option value="6">Уфа</option>
                  <option value="7">Пермь</option>
                  <option value="8">Омск</option>
                  <option value="9">Воронеж</option>
                  <option value="10">Тула</option>
                  <option value="11">Краснодар</option>
                  <option value="12">Ростов-на-Дону</option>
                  <option value="13">Екатеринбург</option>
                  <option value="14">Тюмень</option>
                  <option value="15">Сочи</option>
                  <option value="16">Челябинск</option>
                  <option value="17">Великий Новгород</option>
                  <option value="18">Владимир</option>
                  <option value="19">Ярославль</option>
                  <option value="20">Тверь</option>
                  <option value="21">Красноярск</option>
                  <option value="22">Иркутск</option>
                </select>
                <ChevronDownIcon className={styles.chevron} />
              </div>
            </div>
            <MultiSelect options={categoryOptions} selectedValues={selectedCategories} onChange={setSelectedCategories} placeholder='Выберите категорию' label='Категория навыка, которому хотите научиться' />
            <MultiSelect options={subcategoryOptions} selectedValues={selectedSubcategories} onChange={setSelectedSubcategories} placeholder='Выберите подкатегорию' label='Подкатегория навыка, которому хотите научиться' />
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
