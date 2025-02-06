'use server'

import { R2Client } from '@/lib/services/image/r2Client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

/**
 * Presigned URL 생성
 * @param fileInfos 파일 정보
 * @param route ICU, SURGERY, ECHOCARDIO ...
 * @param id TX_ID, SURGERY_ID, ECHOCARDIO_ID ...
 * @param startIndex 시작 인덱스
 * @returns
 */
export const getPresignedUrls = async (
  fileInfos: { name: string; type: string }[],
  route: string,
  id: string,
  startIndex: number,
) => {
  try {
    const urlPromises = fileInfos.map(async (fileInfo, index) => {
      const fileExtension = fileInfo.name.split('.').pop()
      const fileName = `${route}-${id}-${index + startIndex}.${fileExtension}`

      // 1. PutObjectCommand 생성
      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: fileName,
        ContentType: fileInfo.type,
        CacheControl: 'public, max-age=604800, immutable',
      })

      // 2. Presigned URL 생성
      const presignedUrl = await getSignedUrl(R2Client, command, {
        expiresIn: 3600,
      })

      return {
        fileName,
        presignedUrl,
        contentType: fileInfo.type,
      }
    })

    return await Promise.all(urlPromises)
  } catch (error) {
    console.error('Presigned URL 생성 중 오류:', error)
    throw error
  }
}
