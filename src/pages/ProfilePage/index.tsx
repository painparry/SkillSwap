import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { ProfileSidebar } from '@/widgets/ProfileSidebar'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import { DatePicker } from '@/shared/ui/DatePicker'
import { Autocomplete } from '@/shared/ui/Autocomplete'
import { AvatarUpload } from '@/shared/ui/AvatarUpload'
import { Button } from '@/shared/ui/Button'
import { fetchUsers } from '@/api/users'
import { fetchCities } from '@/api/cities'
import { saveAuthUser } from '@/features/auth/model/authUtils'
import { setUser } from '@/features/auth/model/authSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { AuthUser, City, GenderType } from '@/shared/types'
import { PencilIcon } from './PencilIcon'
import styles from './ProfilePage.module.css'

type ProfileFormState = {
  email: string
  name: string
  birthDate: string
  gender: GenderType
  city: string
  about: string
  avatarUrl: string | null
}

function toFormState(user: AuthUser | null): ProfileFormState {
  return {
    email: user?.email ?? '',
    name: user?.name ?? '',
    birthDate: user?.birthDate ?? '',
    gender: user?.gender ?? 'female',
    city: user?.city ?? '',
    about: user?.about ?? '',
    avatarUrl: user?.avatarUrl ?? null,
  }
}

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state.auth.user)
  const genderId = useId()

  const [cities, setCities] = useState<City[]>([])
  const [form, setForm] = useState<ProfileFormState>(() => toFormState(authUser))
  const [baseline, setBaseline] = useState<ProfileFormState>(() => toFormState(authUser))
  const seededUserIdRef = useRef<string | null>(authUser?.id ?? null)

  // TODO: Пока не готов реальный вход (LoginPage в разработке), используется первый тестовый пользователь, чтобы страницу профиля можно было проверить.
  useEffect(() => {
    if (authUser) return
    let cancelled = false

    fetchUsers().then((users) => {
      if (cancelled || users.length === 0) return

      const demoUser = users[0]
      const nextUser = saveAuthUser({
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        avatarUrl: demoUser.avatarUrl,
        city: demoUser.city,
        gender: demoUser.gender,
        about: demoUser.about,
      })
      dispatch(setUser(nextUser))
    })

    return () => {
      cancelled = true
    }
  }, [authUser, dispatch])

  useEffect(() => {
    fetchCities()
      .then(setCities)
      .catch(() => setCities([]))
  }, [])

  useEffect(() => {
    if (authUser && seededUserIdRef.current !== authUser.id) {
      const seeded = toFormState(authUser)
      setForm(seeded)
      setBaseline(seeded)
      seededUserIdRef.current = authUser.id
    }
  }, [authUser])

  const cityOptions = useMemo(
    () => cities.map((city) => ({ value: city.name, label: city.name })),
    [cities],
  )

  const isDirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(baseline), [form, baseline])

  const updateField = <Key extends keyof ProfileFormState>(key: Key, value: ProfileFormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleAvatarChange = (_file: File, previewUrl: string) => {
    updateField('avatarUrl', previewUrl)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!authUser || !isDirty) return

    const nextUser = saveAuthUser({
      id: authUser.id,
      name: form.name,
      email: form.email,
      avatarUrl: form.avatarUrl,
      city: form.city,
      birthDate: form.birthDate,
      gender: form.gender,
      about: form.about,
    })

    dispatch(setUser(nextUser))
    setBaseline(form)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ProfileSidebar className={styles.sidebar} />

        <section className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              label="Почта"
              type="email"
              value={form.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateField('email', event.target.value)}
              rightIcon={<PencilIcon />}
            />

            <button type="button" className={styles.passwordLink}>
              Изменить пароль
            </button>

            <Input
              label="Имя"
              value={form.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateField('name', event.target.value)}
              rightIcon={<PencilIcon />}
            />

            <div className={styles.row}>
              <DatePicker
                className={styles.dateField}
                value={form.birthDate}
                onChange={(value) => updateField('birthDate', value)}
              />

              <div className={styles.genderField}>
                <label className={styles.label} htmlFor={genderId}>
                  Пол
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id={genderId}
                    className={styles.select}
                    value={form.gender}
                    onChange={(event) => updateField('gender', event.target.value as GenderType)}
                  >
                    <option value="female">Женский</option>
                    <option value="male">Мужской</option>
                  </select>
                  <span className={styles.selectChevron} aria-hidden="true" />
                </div>
              </div>
            </div>

            <Autocomplete
              label="Город"
              placeholder="Введите город"
              showChevron
              options={cityOptions}
              value={form.city}
              onChange={(value) => updateField('city', value)}
              onSelect={(option) => updateField('city', option.label)}
            />

            <Textarea
              label="О себе"
              rows={4}
              value={form.about}
              onChange={(event) => updateField('about', event.target.value)}
              rightIcon={<PencilIcon />}
            />

            <Button className={styles.saveButton} type="submit" disabled={!isDirty}>
              Сохранить
            </Button>
          </form>

          <div className={styles.avatarColumn}>
            <AvatarUpload
              className={styles.avatar}
              size={244}
              value={form.avatarUrl}
              onChange={handleAvatarChange}
            />
          </div>
        </section>
      </main>
    </div>
  )
}