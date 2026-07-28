import React from 'react'
import styles from './logo.module.css'
import logoImg from '../../../assets/images/logo.svg'

export const Logo = () => (
  <a className={styles.logoLink}>
    <img className={styles.logo} src={logoImg} alt="логотип сайта" />
    <h1 className={styles.title}>SkillSwap</h1>
  </a>
)
