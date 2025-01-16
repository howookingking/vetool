import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'
import { R2Client } from '@/lib/services/image/r2Client'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'

export const config = {
  api: {
    bodyParser: false,
    maxDuration: 60,
  },
}

/**
 * 이미지 업로드 함수
 * @param files 업로드할 이미지 배열
 * @param route 이미지 업로드 경로 (ex: icu, surgery, echocardio, checkup)
 * @param id 이미지 업로드 아이디 (ex: icu_tx_id, surgery_tx_id, echocardio_tx_id, checkup_tx_id)
 */
const uploadImage = async (files: File[], route: string, id: string) => {
  try {
    const uploadPromises = files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer())

      const fileType = file.type.split('/')[0]
      // 파일 확장자 추출
      const fileExtension = file.name.split('.').pop()
      // 업로드용 파일 네이밍 구성 (ex: icu-tx_id.jpg)
      const fileName = `${route}-${id}-${index}.${fileExtension}`

      let optimizedBuffer = buffer
      let contentType = file.type

      if (fileType === 'image') {
        optimizedBuffer = await sharp(buffer)
          .resize()
          .webp({ quality: 80 })
          .toBuffer()

        contentType = 'image/webp'
      }

      // R2Client 업로드 명령 생성
      const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME!,
        Key: fileName,
        Body: optimizedBuffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=604800, immutable',
      })

      // 업로드
      return R2Client.send(command)
    })

    await Promise.all(uploadPromises)
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error)
    throw new Error('이미지 업로드에 실패했습니다')
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files')
    const route = formData.get('route')
    const id = formData.get('id')

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: '업로드할 파일이 없습니다' },
        { status: 400 },
      )
    }

    await uploadImage(files as File[], route as string, id as string)

    return NextResponse.json(
      { message: '이미지가 성공적으로 업로드되었습니다' },
      { status: 200 },
    )
  } catch (error) {
    console.error('이미지 업로드 처리 중 Route API 오류:', error)
    return NextResponse.json(
      { error: '이미지 업로드 중 오류가 발생했습니다' },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const prefix = searchParams.get('prefix')

    if (prefix) {
      // ListObjectsV2Command: R2 버킷 내 객체 목록을 조회 (prefix를 통해)
      const listCommand = new ListObjectsV2Command({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME!,
        Prefix: prefix,
      })

      const listResponse = await R2Client.send(listCommand)

      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        return NextResponse.json(
          { error: '이미지를 찾을 수 없습니다' },
          { status: 404 },
        )
      }

      const urlPromises = listResponse.Contents.map(async (item) => {
        // GetObjectCommand: 특정 객체 (이미지 / 동영상)의 실제 콘텐츠를 조회 및 Signed URL 생성 준비
        const getCommand = new GetObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME!,
          Key: item.Key,
        })

        // getSignedUrl: 접근 가능한 파일의 URL 생성
        const signedUrl = await getSignedUrl(R2Client, getCommand, {
          expiresIn: 3600,
        })

        return {
          key: item.Key,
          url: signedUrl,
        }
      })

      const imageUrls = await Promise.all(urlPromises)

      return NextResponse.json({ urls: imageUrls }, { status: 200 })
    }
  } catch (error) {
    console.error('이미지 URL 생성 중 오류 발생:', error)
    return NextResponse.json(
      { error: '이미지 URL 생성 중 오류가 발생했습니다' },
      { status: 500 },
    )
  }
}
