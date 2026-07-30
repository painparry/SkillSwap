import { FiltersSidebar } from '@/features/filters'
import styles from './CatalogPage.module.css'

export default function CatalogPage() {
  return (
    <main className={styles.page}>
      <FiltersSidebar />
    </main>
  )
}
