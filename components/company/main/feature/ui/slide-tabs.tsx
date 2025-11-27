import React, { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/utils'

type TabProps = {
  children: React.ReactNode
  value: string
  setPosition: (position: {
    left: number
    width: number
    opacity: number
  }) => void
  onClick: (value: string) => void
  activeTab: string
}

type SlideTabsProps = {
  tabs: { name: string; path: string; isReady?: boolean }[]
  activeTab: string
  setActiveTab: (value: string) => void
}

const Tab = ({
  children,
  value,
  setPosition,
  onClick,
  activeTab,
}: TabProps) => {
  const ref = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return

        const { width } = ref.current.getBoundingClientRect()

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        })
      }}
      onClick={() => onClick(value)}
      className={cn(
        'relative z-10 cursor-pointer px-2 py-1.5 text-sm font-bold uppercase text-white hover:text-primary md:px-5 md:py-3 md:text-base',
        activeTab === value && 'rounded-full bg-white text-primary',
      )}
    >
      {children}
    </li>
  )
}

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number }
}) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-white md:h-12"
    />
  )
}

export default function SlideTabs({
  tabs,
  activeTab,
  setActiveTab,
}: SlideTabsProps) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }))
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-white bg-primary p-1"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.path}
          value={tab.path}
          setPosition={setPosition}
          onClick={handleTabChange}
          activeTab={activeTab}
        >
          {tab.name}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  )
}
