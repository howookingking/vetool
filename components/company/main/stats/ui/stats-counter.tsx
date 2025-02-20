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
    stiffness: 50, // 스프링의 강성
    damping: 25, // 감쇠력
    duration: 2000, // 지속 시간
  })

  // spring 값이 변경될 때마다 값을 계산
  // latest는 변화하는 중간값을 받아서 표시함
  const display = useTransform(spring, (latest) =>
    decimals ? latest.toFixed(decimals) : Math.round(latest).toLocaleString(),
  )

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [spring, value, isInView])

  return <motion.span ref={ref}>{display}</motion.span>
}
