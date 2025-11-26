import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'motion/react'
import { useEffect, useRef } from 'react'

type Props = {
  value: number
  decimals?: number
}

export default function StatsCounter({ value, decimals }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    decimals ? latest.toFixed(decimals) : Math.round(latest).toLocaleString(),
  )

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2 })
      return controls.stop
    }
  }, [count, value, isInView])

  return <motion.span ref={ref}>{rounded}</motion.span>
}
