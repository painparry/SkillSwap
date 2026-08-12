import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RegistrationStep3Page.module.css'
import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/Button'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { CrossIcon } from '../RegistrationStep1Page/icons/CrossIcon'
import { Input } from '@/shared/ui/Input'
import { MultiSelect, MultiSelectOption } from '@/shared/ui/MultiSelect'
import { Textarea } from '@/shared/ui/Textarea'
import { SkillImageUpload } from '../../features/skill-image-upload'
import boardimg from '@/assets/images/schoolBoard.svg'
import type { SkillCategory } from '@/shared/types'
import { ROUTES } from '@/shared/lib/constants'


export default function RegistrationStep3Page() {
  const [skill, setSkill] = useState('');
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [selectedCategoriesTeach, setSelectedCategoriesTeach] = useState<string[]>([]);
  const [selectedSubcategoriesTeach, setSelectedSubcategoriesTeach] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [, setSkillImage] = useState<File|null>(null); //переменная skillImage удалена, чтобы линтер не ругался

  useEffect(() => {
  fetch('/db/skills.json')
    .then((response) => response.json())
    .then((data: SkillCategory[]) => setCategories(data));
  }, []);

  const categoryOptions: MultiSelectOption[] = categories.map(category =>
    ({value: category.id, label: category.name})
  );
  const selectedCategoryObjects = categories.filter(category => (selectedCategoriesTeach.includes(category.id)));
  const subcategoryOptions: MultiSelectOption[] = selectedCategoryObjects.flatMap(category => category.subcategories.map(subcategory => ({value: subcategory.id, label: subcategory.name})));

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
       // TODO: сохранить введённые данные при отправке формы
    }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Logo />
        <Button variant="tertiary">
          <span className={styles.buttonContent} onClick={()=>navigate('/')}>
            Закрыть
            <CrossIcon />
          </span>
        </Button>
      </div>
      <div className={styles.stepper}>
        <StepIndicator stepsQuantity={3} activeStep={3} />
      </div>
      <div className={styles.content}>
        <div className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input value={skill} onChange={(e)=>setSkill(e.target.value)} label='Название навыка' placeholder='Введите название вашего навыка'/>
            <MultiSelect options={categoryOptions} selectedValues={selectedCategoriesTeach} onChange={setSelectedCategoriesTeach} placeholder='Выберите категорию навыка' label='Категория навыка' />
            <MultiSelect options={subcategoryOptions} selectedValues={selectedSubcategoriesTeach} onChange={setSelectedSubcategoriesTeach} placeholder='Выберите подкатегорию навыка' label='Подкатегория навыка' />
            <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} label='Описание' placeholder='Коротко опишите, чему можете научить'/>
            <SkillImageUpload onFileSelect={setSkillImage} label='Перетащите или выберите изображения навыка'/>
            <div className={styles.buttonsWrapper}>
              <Button variant='secondary' className={styles.button} onClick={() => navigate(ROUTES.REGISTRATION_STEP_2)}>Назад</Button>
              <Button variant='primary' type="submit" className={styles.button}>Продолжить</Button>
            </div>
          </form>
        </div>
        <div className={styles.formCard}>
          <img src={boardimg} alt="школьная доска" className={styles.image} />
          <h2 className={styles.cardHeader}>Укажите, чем вы готовы поделиться</h2>
          <span className={styles.cardText}>Так другие люди смогут увидеть ваши предложения и предложить вам обмен!</span>
        </div>
      </div>
    </main>
  )
}
