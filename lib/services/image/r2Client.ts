import { S3Client } from '@aws-sdk/client-s3'

export const R2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.NEXT_PUBLIC_R2_END_POINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
})
