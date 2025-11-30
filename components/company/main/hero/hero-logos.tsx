'use client'

import TranslateWrapper from '@/components/company/main/hero/ui/translate-wrapper'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const HOSPITAL_LIST = [
  {
    name: 'SNC 동물 메디컬센터',
    image: '/company/logos/snc.png',
    width: 20,
    link: 'http://sncamc.co.kr/',
  },
  {
    name: '광진 동물 의료센터',
    image: '/company/logos/kwangjin.png',
    width: 16,
    link: 'http://kjamc.com/',
  },
  {
    name: '로얄 동물 메디컬센터 강동',
    image: '/company/logos/royal-gangdong.png',
    width: 48,
    link: 'https://royalamcgd.com/',
  },
  // {
  //   name: '메이 동물 메디컬센터',
  //   image: '/company/logos/may.png',
  //   width: 32,
  //   link: 'http://www.mayanimal.com/',
  // },
  {
    name: '24시 코끼리 동물 의료센터',
    image: '/company/logos/kokkiri.png',
    width: 12,
    link: 'https://www.instagram.com/kokkiriah_ph/',
  },
]

export default function HeroLogos() {
  return (
    <div className="relative w-screen overflow-hidden border-y-2 border-zinc-900 bg-white">
      <ul className="relative z-0 flex">
        {Array.from({ length: 3 }).map((_, index) => (
          <TranslateWrapper key={index} reverse>
            {HOSPITAL_LIST.map((item) => (
              <Link
                key={item.name}
                href={item.link as any}
                target="_blank"
                className="flex items-center justify-center px-4 py-2 md:py-4"
              >
                <ArrowUpRight className="text-2xl text-primary md:text-3xl" />

                <div className="flex h-full w-full items-center">
                  <div className={`relative h-full w-${item.width}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </TranslateWrapper>
        ))}
      </ul>

      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 bg-gradient-to-r from-white to-white/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 bg-gradient-to-l from-white to-white/0" />
    </div>
  )
}
