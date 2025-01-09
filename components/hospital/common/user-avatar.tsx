import userAvatarFallback from '@/public/user-avatar-fallback.svg'
import Image from 'next/image'

export default function UserAvatar({
  src,
  alt,
}: {
  src: string | null
  alt: string
}) {
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
