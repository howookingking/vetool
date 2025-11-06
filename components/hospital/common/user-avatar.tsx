import userAvatarFallback from '@/public/user-avatar-fallback.svg'
import Image from 'next/image'

type Props = {
  src: string | null
  alt: string
}

export default function UserAvatar({ src, alt }: Props) {
  return (
    <Image
      unoptimized
      src={src ?? userAvatarFallback}
      alt={alt}
      width={20}
      height={20}
      className="rounded-full"
    />
  )
}
