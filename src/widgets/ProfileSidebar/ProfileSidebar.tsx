import { NavLink } from 'react-router-dom'
import style from './ProfileSidebar.module.css'
import { RequestsIcon } from './RequestsIcon'
import { MessageIcon } from './MessageIcon'
import { FavoritesIcon } from './FavoritesIcon'
import { SkillsIcon } from './SkillsIcon'
import { UserIcon } from './UserIcon'

export const ProfileSidebar = ({ className }: { className?: string }) => {
  return (
    <nav className={`${style.nav} ${className ?? ''}`}>
      <NavLink
        to={'/requests'}
        className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ''}`}
      >
        <RequestsIcon className={style.icon} />
        <span className={style.text}>Заявки</span>
      </NavLink>
      <NavLink
        to={'/exchanges'}
        className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ''}`}
      >
        <MessageIcon className={style.icon} />
        <span className={style.text}>Мои обмены</span>
      </NavLink>
      <NavLink
        to={'/favorites'}
        className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ''}`}
      >
        <FavoritesIcon className={style.icon} />
        <span className={style.text}>Избранное</span>
      </NavLink>
      <NavLink
        to={'/my-skills'}
        className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ''}`}
      >
        <SkillsIcon className={style.icon} />
        <span className={style.text}>Мои навыки</span>
      </NavLink>
      <NavLink
        to={'/profile'}
        className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ''}`}
      >
        <UserIcon className={style.icon} />
        <span className={style.text}>Личные данные</span>
      </NavLink>
    </nav>
  )
}
