'use client'

import { getPresignedUrls } from '@/lib/services/image/presigned-url'

export const uploadTxImages = async (
  txImages: File[],
  txId: string,
  startIndex: string,
): Promise<string[]> => {
  if (txImages.length === 0) {
    return []
  }

  try {
    // 1. Presigned URL 받아오기
    const fileInfos = txImages.map((file) => ({
      name: file.name,
      type: file.type,
    }))

    // 2. Presigned URL 생성
    const presignedUrls = await getPresignedUrls(
      fileInfos,
      'icu',
      txId,
      Number(startIndex),
    )

    // 3. 클라이언트에서 직접 R2로 업로드
    const uploadPromises = txImages.map(async (file, index) => {
      const { presignedUrl, fileName, contentType } = presignedUrls[index]

      // 3.1 PUT: 중복 생성 방지, S3/R2의 presigned URL은 PUT 메서드를 권장
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
