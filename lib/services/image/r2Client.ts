import { S3Client } from '@aws-sdk/client-s3'

if (
  !process.env.R2_END_POINT ||
  !process.env.R2_ACCESS_KEY ||
  !process.env.R2_SECRET_KEY
) {
  throw new Error('R2 환경 변수가 설정되지 않았습니다.')
}

export const R2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_END_POINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
})
