import Main from '@/features/main/ui/Main'
import Head from 'next/head'
import React from 'react'

export default function MainPage() {
  return (
    <>
      <Head>
        <title>Workzora — сервіс для пошуку проєктів та виконавців</title>
        <meta
          name="description"
          content="Workzora — платформа для пошуку проєктів, фрилансерів та спеціалістів. Публікуйте вакансії, знаходьте виконавців або отримуйте нові замовлення швидко, безпечно та зручно."
        />
      </Head>
      <Main />
    </>
  )
}
