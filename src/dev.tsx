import React from 'react'
import ReactDOM from 'react-dom/client'
import { ImageCarousel } from './shared/ui/ImageCarousel'

const testImages = [
 "https://i.pinimg.com/736x/0c/dc/68/0cdc68801d5495ede0907ebb0a95e2da.jpg",
 "https://i.pinimg.com/originals/b9/d3/19/b9d3199aff69a6a4f64cfc918dd6bd4d.png?nii=t",
 "https://i.pinimg.com/originals/21/b1/84/21b184e00bde4c083e7b568784a22c50.jpg?nii=t",
 "https://amp.ridus.ru/images/2018/11/8/841225/in_article_9077cd91c7.webp",
 "https://fs.tonkosti.ru/8b/h2/8bh2261vbag4sg0k848c44ocw.jpg",
 "https://fs.tonkosti.ru/8b/h2/8bh2261vbag4sg0k848c44ocw.jpg"
  
]
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f0f0'
    }}>
      <ImageCarousel images={testImages} />
    </div>
  </React.StrictMode>
)