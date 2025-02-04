'use client'

type UploadTxImagesResponse = {
  files: string[]
  message: string
}

export const uploadTxImages = async (
  txImages: File[],
  txId: string,
  startIndex: string,
): Promise<UploadTxImagesResponse> => {
  if (txImages.length === 0) {
    return { files: [], message: '업로드할 이미지가 없습니다' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL + '/api/image'
  const formData = new FormData()

  txImages.forEach((file) => {
    formData.append('files', file)
  })

  formData.append('route', 'icu')
  formData.append('id', txId)
  formData.append('startIndex', startIndex)

  const response = await fetch(baseUrl, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다')
  }

  return response.json()
}
