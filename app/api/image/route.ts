import { R2Client } from '@/lib/services/image/r2Client'
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextRequest, NextResponse } from 'next/server'

const createResponse = (body: any, status: number = 200) => {
  return NextResponse.json(body, { status })
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const prefix = searchParams.get('prefix')

    if (!prefix) {
      return createResponse({ error: 'prefix 파라미터가 필요합니다' }, 400)
    }

    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      Prefix: prefix,
    })

    const listResponse = await R2Client.send(listCommand)

    if (!listResponse.Contents?.length) {
      return createResponse({ error: '이미지를 찾을 수 없습니다' }, 404)
    }

    const urlPromises = listResponse.Contents.map(async (item) => {
      const getCommand = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: item.Key,
      })

      const signedUrl = await getSignedUrl(R2Client, getCommand, {
        expiresIn: 3600,
      })

      return {
        key: item.Key,
        url: signedUrl,
      }
    })

    const imageUrls = await Promise.all(urlPromises)
    return createResponse({ urls: imageUrls })
  } catch (error) {
    console.error('이미지 URL 생성 중 오류:', error)
    return createResponse({ error: '이미지 URL 생성에 실패했습니다' }, 500)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (!key) {
      return createResponse({ error: 'key 파라미터가 필요합니다' }, 400)
    }

    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      Prefix: key,
    })

    const listResponse = await R2Client.send(listCommand)

    if (!listResponse.Contents?.length) {
      return createResponse({ error: '삭제할 이미지가 존재하지 않습니다' }, 404)
    }

    const deletePromises = listResponse.Contents.map((item) => {
      const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: item.Key,
      })
      return R2Client.send(command)
    })

    await Promise.all(deletePromises)
    return createResponse({ message: '이미지들이 성공적으로 삭제되었습니다' })
  } catch (error) {
    console.error('이미지 삭제 중 오류:', error)
    return createResponse({ error: '이미지 삭제에 실패했습니다' }, 500)
  }
}
