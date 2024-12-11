import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function useCellAutofocus() {
  const searchParams = useSearchParams()
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const orderId = params.get('order-id')
    const orderTime = params.get('time')
    const cellInputId = document.getElementById(`${orderId}&${orderTime}`)
    if (cellInputId) cellInputId.focus()
  }, [searchParams])
}
