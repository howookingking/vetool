import { motion, useSpring, useTransform, useInView } from 'motion/react'
import { useEffect, useRef } from 'react'

export default function StatsCounter({
  value,
  decimals,
}: {
  value: number
  decimals?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: 2000,
  })

  const display = useTransform(spring, () =>
    decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString(),
  )

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [spring, value, isInView])

  return <motion.span ref={ref}>{display}</motion.span>
}
