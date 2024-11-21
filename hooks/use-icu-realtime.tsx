import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()
const TABLES = ['icu_io', 'icu_charts', 'icu_orders', 'icu_txs'] as const

export function useIcuRealtime(hosId: string) {
  const subscriptionRef = useRef<RealtimeChannel | null>(null)
  const { setIsSubscriptionReady } = useRealtimeSubscriptionStore()
  const { refresh } = useRouter()

  const debouncedRefresh = useDebouncedCallback(() => {
    console.log('Debouced refresh')
    refresh()
  }, 1000)

  const handleChange = useCallback(
    (payload: any) => {
      if (payload.table === 'icu_io') {
        refresh()
      }
      debouncedRefresh()

      console.log(
        `%c${payload.table} ${payload.eventType}`,
        `background:${getLogColor(payload.table)}; color:white`,
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
    const channel = supabase.channel(`icu_realtime_${hosId}`)

    TABLES.forEach((table) => {
      channel
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table,
            filter: `hos_id=eq.${hosId}`,
          },
          handleChange,
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table,
            filter: `hos_id=eq.${hosId}`,
          },
          handleChange,
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table },
          handleChange,
        )
    })

    subscriptionRef.current = channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Subscribed to all tables')
        setTimeout(() => {
          setIsSubscriptionReady(true)
        }, 5000)
      } else {
        console.log('Subscription failed with status:', status)
        setIsSubscriptionReady(false)
      }
    })
  }, [hosId, handleChange])

  const unsubscribe = useCallback(() => {
    if (subscriptionRef.current) {
      console.log('Unsubscribing from channel...')
      supabase.removeChannel(subscriptionRef.current)
      subscriptionRef.current = null
      setIsSubscriptionReady(false)
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
}

function getLogColor(table: string): string {
  switch (table) {
    case 'icu_io':
      return 'blue'
    case 'icu_charts':
      return 'red'

    case 'icu_orders':
      /*************  ✨ Codeium Command ⭐  *************/
      /**
       * Get the color for a given table's log.
       *
       * @param {string} table - The table name.
       * @returns {string} The color for the given table's log.
       */
      /******  be861dde-2353-4b83-856c-89f6ea4f5dee  *******/ return 'green'
    case 'icu_txs':
      return 'purple'
    default:
      return 'gray'
  }
}
