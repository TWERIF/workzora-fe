import Main from '@/features/main/ui/Main'
import PageMeta from "@/shared/components/seo/PageMeta";
import React from 'react'

export default function MainPage() {
  return (
    <>
      <PageMeta page="home" />
      <Main />
    </>
  )
}
