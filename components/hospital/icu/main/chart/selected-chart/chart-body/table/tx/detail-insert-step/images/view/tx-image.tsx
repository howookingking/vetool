import { isVideoFile } from '@/lib/utils/utils'
import Image from 'next/image'
import { cn } from '@/lib/utils/utils'

type TxImageProps = {
  url: string
  contentType: string
  index: number
  control?: boolean
  className?: string
}

/**
 * 사진, 비디오를 구분하여 렌딩하는 컴포넌트
 */
export default function TxImage({
  url: src,
  contentType,
  index,
  control,
  className,
}: TxImageProps) {
  return (
    <>
      {isVideoFile(contentType) ? (
        <video
          src={src}
          controls={control}
          className={cn('h-full w-full', className)}
        >
          <source src={src} />
        </video>
      ) : (
        <Image
          src={src}
          alt={`처치 이미지 ${index + 1}`}
          fill
          className={cn('object-contain', className)}
          unoptimized
        />
      )}
    </>
  )
}
