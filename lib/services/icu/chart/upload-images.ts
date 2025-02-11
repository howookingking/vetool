'use client'

import { getPresignedUrls } from '@/lib/services/image/presigned-url'

// 이미지 최적화를 위한 유틸리티 함수
const optimizeImage = async (
  file: File,
  quality: number = 0.8,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      ctx?.drawImage(img, 0, 0)

      // WebP 형식으로 변환
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const optimizedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, '.webp'),
              { type: 'image/webp' },
            )
            resolve(optimizedFile)
          } else {
            reject(new Error('이미지 변환 실패'))
          }
        },
        'image/webp',
        quality,
      )
    }

    img.onerror = () => reject(new Error('이미지 로드 실패'))

    // File을 Data URL로 변환하여 이미지 로드
    const reader = new FileReader()
    reader.onload = (e) => {
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error('파일 읽기 실패'))
    reader.readAsDataURL(file)
  })
}

export const uploadTxImages = async (
  txImages: File[],
  txId: string,
  startIndex: string,
): Promise<string[]> => {
  if (txImages.length === 0) {
    return []
  }

  try {
    // 1. 이미지 최적화 및 WebP 변환
    const optimizedImages = await Promise.all(
      txImages.map((file) => optimizeImage(file, 0.8)),
    )

    // 2. Presigned URL 받아오기
    const fileInfos = optimizedImages.map((file) => ({
      name: file.name,
      type: file.type,
    }))

    // 3. Presigned URL 생성
    const presignedUrls = await getPresignedUrls(
      fileInfos,
      'icu',
      txId,
      Number(startIndex),
    )

    // 4. 클라이언트에서 직접 R2로 업로드
    const uploadPromises = optimizedImages.map(async (file, index) => {
      const { presignedUrl, fileName, contentType } = presignedUrls[index]

      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=604800, immutable',
        },
      })

      if (!response.ok) {
        throw new Error(`업로드 실패: ${fileName}`)
      }

      return fileName
    })

    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error)
    throw new Error('이미지 업로드에 실패했습니다')
  }
}
