import clsx from 'clsx'
import styles from './Header.module.css'
import { Logo } from '@/shared/ui/logo'
import { useSkillsCatalogModal } from '@/features/skills-catalog-modal/modal/useSkillsCatalogModal'
import { Button } from '@/shared/ui/Button'
import { SearchInput } from '@/shared/ui/SearchInput'
import { useAboutProjectModal } from '@/features/filters/about-project/model/useAboutProjectModal'
import { SkillsCatalogModal } from '@/features/skills-catalog-modal/ui/SkillsCatalogModal'
import { AboutProjectModal } from '@/features/filters/about-project/ui/AboutProjectModal'
import { useState } from 'react'

import NavIconUrl from '../../../assets/images/nav.svg'
import themeLogo from '../../../assets/images/themeLogo.svg'

export const HeaderUI = () => {
  const { open: openSkills, close: closeSkills, isOpen: isSkillsOpen } = useSkillsCatalogModal()
  const { isOpen: isAboutOpen, open: openAbout, close: closeAbout } = useAboutProjectModal()
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
  }

  return (
    <>
      <header className={clsx(styles.header)}>
        <nav className={clsx(styles.nav)}>
          <Logo />
          <div className={clsx(styles.navGroup)}>
            <Button variant="tertiary" onClick={openAbout} className={clsx(styles.navLinkBtn)}>
              О проекте
            </Button>
            <Button
              variant="tertiary"
              className={clsx(styles.navLinkBtn)}
              onClick={openSkills}
              aria-haspopup="dialog"
              aria-expanded={isSkillsOpen}
            >
              Все навыки
              <img src={NavIconUrl} alt="" className={clsx(styles.icon)} aria-hidden="true" />
            </Button>
          </div>
        </nav>

        <SearchInput
          value={query}
          onChange={handleChange}
          placeholder="Искать навык"
          className={clsx(styles.searchInputField)}
        />

        <div className={clsx(styles.actions)}>
          <Button variant="tertiary" aria-label="Переключить тему">
            <img src={themeLogo} alt="" className={clsx(styles.icontheme)} aria-hidden="true" />
          </Button>

          <Button variant="secondary" className={clsx(styles.authBtn)}>
            Войти
          </Button>

          <Button variant="primary" className={clsx(styles.authBtn)}>
            Регистрация
          </Button>
        </div>
      </header>

      <AboutProjectModal isOpen={isAboutOpen} onClose={closeAbout} />

      <SkillsCatalogModal isOpen={isSkillsOpen} onClose={closeSkills} />
    </>
  )
}
