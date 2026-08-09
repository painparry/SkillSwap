<<<<<<< HEAD
import { Notifications } from '@/widgets/Notifications';
import { FiltersSidebar } from '@/features/filters'
=======
import { FiltersSidebar, type FiltersSidebarValue } from '@/features/filters'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectFilters } from '@/entities/skill/model/selectors'
import {
  setTypeFilter,
  setCategoryFilter,
  setSubcategoryFilter,
  setGenderFilter,
  setCityFilter,
} from '@/entities/skill/model/skillsSlice'
>>>>>>> develop
import styles from './CatalogPage.module.css'

export default function CatalogPage() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)

  const value: FiltersSidebarValue = {
    skillType: filters.type ?? 'all',
    categories: filters.category ?? [],
    subcategories: filters.subcategory ?? [],
    gender: filters.gender ?? 'any',
    cities: filters.city ?? [],
  }

  const handleChange = (next: FiltersSidebarValue) => {
    dispatch(setTypeFilter(next.skillType === 'all' ? null : next.skillType))
    dispatch(setCategoryFilter(next.categories.length ? next.categories : null))
    dispatch(setSubcategoryFilter(next.subcategories.length ? next.subcategories : null))
    dispatch(setGenderFilter(next.gender === 'any' ? null : next.gender))
    dispatch(setCityFilter(next.cities.length ? next.cities : null))
  }

  return (
    <main className={styles.page}>
<<<<<<< HEAD
       <div style={{ 
        display: 'flex', 
        justifyContent: 'right', 
        alignItems: 'center', 
        minHeight: '100vh',
        padding: '40px',
        background: '#f0f0f0'
      }}>
        <Notifications />
      </div>
      <FiltersSidebar />
=======
      <FiltersSidebar value={value} onChange={handleChange} />
>>>>>>> develop
    </main>
  )
}
