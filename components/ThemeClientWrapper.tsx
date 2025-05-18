'use client'

import { useState, useEffect } from 'react'

export function ThemeClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null   // or a loader/spinner if you want

  return <>{children}</>
}