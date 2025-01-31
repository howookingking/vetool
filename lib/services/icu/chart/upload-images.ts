'use client'

export const uploadTxImages = async (
  txImages: File[],
  txId: string,
  startIndex: string,
) => {
  if (txImages.length === 0) return

  try {
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
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error)
    throw new Error('이미지 업로드 중 오류가 발생했습니다')
  }
}
