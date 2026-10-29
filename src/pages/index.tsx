import Main from '@/features/main/ui/Main'
import HomeJsonLd from "@/shared/components/seo/HomeJsonLd";
import PageMeta from "@/shared/components/seo/PageMeta";
import React from 'react'

export default function MainPage() {
  return (
    <>
      <PageMeta page="home" />
      <HomeJsonLd />
      <Main />
    </>
  )
}
