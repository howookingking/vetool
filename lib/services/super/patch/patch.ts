'use server'

import type {
  PatchDetailData,
  PatchFormProps,
  PatchListProps,
} from '@/types/vetool'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const createPatchNote = async (
  patchData: PatchFormProps,
  isDraft?: boolean,
) => {
  const supabase = await createClient()

  const { feedback_id, patch_title, patch_content, patch_category } = patchData

  const { error } = await supabase.from('vetool_patches').upsert({
    feedback_id,
    patch_title,
    patch_content,
    patch_category,
    is_draft: isDraft,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const getPatchList = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vetool_patches')
    .select('patch_id, patch_title, patch_category, created_at, is_draft')
    .order('created_at', { ascending: false })
    .returns<PatchListProps[]>()
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const getPatchDetailData = async (patchId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vetool_patches')
    .select(
      `
        patch_title,
        patch_content,
        created_at,
        patch_category,
        feedback_id(feedback_description)
      `,
    )
    .order('created_at')
    .match({ patch_id: patchId })
    .returns<PatchDetailData>()
    .maybeSingle()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const getPatchTitlesData = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vetool_patches')
    .select('patch_id, patch_title')
    .match({ is_draft: false })
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}
