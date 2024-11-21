import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function useIcuSidebarFilter() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    selectedGroup: searchParams.get('group')?.split(',') || [],
    selectedVet: searchParams.get('vet') || '',
  })

  return {
    filters,
    setFilters,
  }
}
