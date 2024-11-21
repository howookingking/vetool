import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export const uploadTxImage = async (txId: string, txImages: File[]) => {
  const supabase = await createClient()

  Array.from(txImages).forEach(async (txImage, index) => {
    const { error } = await supabase.storage
      .from('tx_images')
      .upload(`${txId}/${txId + txImage.name}`, txImage)
    if (error) {
      console.error(error)
      redirect(`/error?message=${error.message}`)
    }
  })
}

export const getTxImageList = async (txId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from('tx_images')
    .list(`${txId}/`)

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const getTxImage = async (txId: string, txImageName: string) => {
  const supabase = await createClient()

  const { data: data } = await supabase.storage
    .from('tx_images')
    .getPublicUrl(`${txId}/${txImageName}`)

  return data.publicUrl
}
