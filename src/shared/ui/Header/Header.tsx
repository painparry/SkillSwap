

import React from 'react';
import styles from './Header.module.css';

// --- Импорты картинок (вверху) ---
import logoSrc from '../../../assets/images/logo.svg';
import themeLogo from '../../../assets/images/themeLogo.svg';
import searchIcon from '../../../assets/images/search.svg';
import navIcon from '../../../assets/images/nav.svg';

import businessSvg from '../../../assets/images/business.svg';
import creativitysvg from '../../../assets/images/creativity.svg';
import languagessvg from '../../../assets/images/languages.svg';
import educationsvg from '../../../assets/images/education.svg';
import homessvg from '../../../assets/images/home.svg';
import healthsvg from '../../../assets/images/health.svg';

// Импорты для модалок
import { useSkillsCatalogModal } from '@/features/skills-catalog-modal/model/useSkillsCatalogModal';
import { SkillsCatalogModal } from '@/features/skills-catalog-modal/ui/SkillsCatalogModal';

import { AboutProjectModal } from '@/features/filters/about-project/ui/AboutProjectModal';
import { useAboutProjectModal } from '@/features/filters/about-project/model/useAboutProjectModal';

import { filterCategories } from '@/features/filters/ui/FiltersSidebar/FiltersSidebar';



const getCategoryIcon = (id: string) => {
  const icons: Record<string, React.ReactNode> = {
    business: (
      <img src={businessSvg} alt="Бизнес" loading="eager" className={styles.categoryIconImg} />
    ),
    art: (
      <img src={creativitysvg} alt="Творчество"  loading="eager" className={styles.categoryIconImg} />
    ),
    languages: (
      <img src={languagessvg} alt="Языки"  loading="eager" className={styles.categoryIconImg} />
    ),
    education: (
      <img src={educationsvg} alt="Образование"  loading="eager" className={styles.categoryIconImg} />
    ),
    home: (
      <img src={homessvg} alt="Дом"  loading="eager" className={styles.categoryIconImg} />
    ),
    health: (
      <img src={healthsvg} alt="Здоровье"  loading="eager" className={styles.categoryIconImg} />
    ),
  };
  return icons[id] ?? null;
};

// --- Компоненты (интерфейсы и реализации) ---
const Logo = () => (
  <div className={styles.logo}>
    <img src={logoSrc} alt="SkillSwap Logo"  loading="eager" className={styles.logoImg} />
    <span className={styles.logoText}>SkillSwap</span>
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'default';
  onClick?: () => void;
}

const Button = ({ children, variant = 'default', onClick }: ButtonProps) => {
  const baseClass = styles.btn;
  const variantClass =
    variant === 'primary'
      ? styles.btnPrimary
      : variant === 'outline'
      ? styles.btnOutline
      : styles.btnDefault;

  return (
    <button className={`${baseClass} ${variantClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

interface AboutButtonProps {
  onClick?: () => void;
}

const AboutButton = ({ onClick }: AboutButtonProps) => (
  <button className={styles.btnAbout} onClick={onClick}>
    О проекте
  </button>
);

const Input = ({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch?: (query: string) => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(e.currentTarget.value);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.searchInput}
      aria-label="Поиск навыков"
      onKeyDown={handleKeyDown}
    />
  );
};

const ThemeToggle = () => (
  <button className={styles.themeToggle} title="Сменить тему">
    <img src={themeLogo} alt="Переключить тему" width="24" height="24" loading="eager" className={styles.iconTheme} />
  </button>
);

export const HeaderUI = () => {
  const { isOpen: isSkillsOpen, open: openSkills, close: closeSkills } = useSkillsCatalogModal();
  const { isOpen: isAboutOpen, open: openAbout, close: closeAbout } = useAboutProjectModal();

  const handleAboutClick = () => openAbout();

  const handleSearch = (query: string) => {
    console.log('Поиск навыка:', query);
  };

  const handleSelect = (skill: { id: string; label: string }) => {
    console.log('Выбран навык:', skill);
    closeSkills();
  };


  
  const subcategoriesMap = new Map<string, { id: string; label: string }[]>();
  filterCategories.forEach((cat) => {
    subcategoriesMap.set(cat.id, cat.subcategories.map((sub) => ({ id: sub.id, label: sub.label })));
  });


  const orderedCategoryIds = [
    'business',      
    'art',           
    'languages',    
    'education',   
    'home',          
    'health',       
  
  ];

  const categories = orderedCategoryIds.map((id) => {
    const originalCat = filterCategories.find((c) => c.id === id);
    if (!originalCat) {
      console.warn(`Категория с id "\${id}" не найдена в filterCategories`);
      return null;
    }

    return {
      id: originalCat.id,
      title: originalCat.label,
      icon: getCategoryIcon(originalCat.id),
      items: subcategoriesMap.get(originalCat.id) || [],
    };
  }).filter((cat): cat is NonNullable<typeof cat> => cat !== null);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Logo />
          <div className={styles.navGroup}>
            <AboutButton onClick={handleAboutClick} />
            <button
              type="button"
              className={styles.dropdown}
              onClick={openSkills}
              aria-haspopup="dialog"
              aria-expanded={isSkillsOpen}
            >
              <span>Все навыки</span>
              <img
                src={navIcon}
                alt="Меню"
                width="16"
                height="8"
                loading="eager"
                className={styles.iconNav}
              />
            </button>
          </div>
        </nav>

        <div className={styles.searchWrapper}>
          <img
            src={searchIcon}
            alt="Поиск"
            loading="eager"
            className={styles.iconSearch}
          />
          <Input placeholder="Искать навык" onSearch={handleSearch} />
        </div>

        <div className={styles.actions}>
          <ThemeToggle />
          <div className={styles.authGroup}>
            <Button variant="outline">Войти</Button>
            <Button variant="primary">Зарегистрироваться</Button>
          </div>
        </div>
      </header>

      <SkillsCatalogModal
        isOpen={isSkillsOpen}
        onClose={closeSkills}
        onSelect={handleSelect}
        categories={categories}
      />

      <AboutProjectModal
        isOpen={isAboutOpen}
        onClose={closeAbout}
      />
    </>
  );
};
