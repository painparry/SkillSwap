import { Notifications } from '@/widgets/Notifications';
import { FiltersSidebar } from '@/features/filters'
import styles from './CatalogPage.module.css'

export default function CatalogPage() {
  return (
    <main className={styles.page}>
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
    </main>
  )
}
