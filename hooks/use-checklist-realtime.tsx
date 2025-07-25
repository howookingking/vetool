import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function useChecklistRealtime(hosId: string) {
  const [isRealtimeReady, setIsRealtimeReady] = useState(false)
  const supabase = createClient()
  const subscriptionRef = useRef<RealtimeChannel | null>(null)
  const { refresh } = useRouter()

  const debouncedRefresh = useDebouncedCallback(() => {
    console.log('Debouced refresh')
    refresh()
  }, 500)

  const handleChange = useCallback(
    (payload: any) => {
      if (payload.table === 'checklist') {
        refresh()
      }
      debouncedRefresh()

      console.log(
        `%c${payload.table} ${payload.eventType}`,
        `background:checklist`,
      )
    },
    [debouncedRefresh],
  )

  const subscribeToChannel = useCallback(() => {
    if (subscriptionRef.current) {
      console.log('Subscription already exists. Skipping...')
      return
    }

    console.log('Creating new subscription...')
    const channel = supabase.channel(`checkclist_realtime_${hosId}`)

    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'checklist',
          filter: `hos_id=eq.${hosId}`,
        },
        handleChange,
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'checklist',
          filter: `hos_id=eq.${hosId}`,
        },
        handleChange,
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'checklist' },
        handleChange,
      )

    subscriptionRef.current = channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Subscribed to all tables')
        setTimeout(() => {
          setIsRealtimeReady(true)
        }, 1000)
      } else {
        console.log('Subscription failed with status:', status)
        // setIsSubscriptionReady(false)
        setIsRealtimeReady(false)
      }
    })
  }, [hosId, handleChange])

  const unsubscribe = useCallback(() => {
    if (subscriptionRef.current) {
      console.log('Unsubscribing from channel...')
      supabase.removeChannel(subscriptionRef.current)
      subscriptionRef.current = null
      // setIsSubscriptionReady(false)
      setIsRealtimeReady(false)
    }
  }, [])

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      console.log('Page is hidden, unsubscribing...')
      unsubscribe()
    } else {
      console.log('Page is visible, resubscribing...')
      subscribeToChannel()
    }
  }, [subscribeToChannel, unsubscribe])

  useEffect(() => {
    console.log('initial subscription')
    subscribeToChannel()

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      console.log('Cleanup: unsubscribing and removing event listener...')
      unsubscribe()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [handleVisibilityChange, subscribeToChannel, unsubscribe])

  return isRealtimeReady
}

// function getLogColor(table: string): string {
//   switch (table) {
//     case 'icu_io':
//       return 'blue'
//     case 'icu_charts':
//       return 'red'
//     case 'icu_orders':
//       return 'green'
//     case 'icu_txs':
//       return 'purple'
//     default:
//       return 'gray'
//   }
// }
