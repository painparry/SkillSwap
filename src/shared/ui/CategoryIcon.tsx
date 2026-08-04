import React from 'react'
import clsx from 'clsx'

import businessIcon from '@/assets/images/business.svg'
import artIcon from '@/assets/images/art.svg' // Файл art.svg -> переменная artIcon
import educationIcon from '@/assets/images/education.svg'
import healthIcon from '@/assets/images/health.svg'
import homeIcon from '@/assets/images/home.svg'
import languagesIcon from '@/assets/images/languages.svg'

interface CategoryIconProps {
  id: string
  className?: string
}

export const CategoryIcon = ({ id, className }: CategoryIconProps) => {
  const iconMap: Record<string, string> = {
    business: businessIcon,
    art: artIcon,
    education: educationIcon,
    health: healthIcon,
    home: homeIcon,
    languages: languagesIcon,
  }

  const src = iconMap[id]
  if (!src) return null

  return (
    <img
      src={src}
      className={clsx(className, 'category-icon-img')}
      width="40"
      height="40"
      loading="eager"
    />
  )
}
