/**
 * SearchParamsWrapper Component
 * 
 * A reusable wrapper component that handles the Suspense boundary
 * required for useSearchParams() in Next.js 13+
 * 
 * Usage:
 * Import this component and wrap any component that uses useSearchParams()
 * 
 * Example:
 * <SearchParamsWrapper>
 *   <YourComponentThatUsesSearchParams />
 * </SearchParamsWrapper>
 */

"use client"

import { Suspense, ReactNode } from "react"

interface SearchParamsWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function SearchParamsWrapper({ 
  children, 
  fallback 
}: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={fallback || <DefaultFallback />}>
      {children}
    </Suspense>
  )
}

// Default loading fallback
function DefaultFallback() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  )
}