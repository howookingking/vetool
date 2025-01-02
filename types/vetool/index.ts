import { VetoolErrors, VetoolFeedbacks, VetoolPatches } from '@/types'

export type UserFeedbackType = VetoolFeedbacks & {
  user_id: { hos_id: { city: string; name: string } }
}

export type ErrorFeedbackType = VetoolErrors & {
  user_id: { hos_id: { city: string; name: string } }
}

export type PatchFormProps = Omit<
  VetoolPatches,
  'patch_id' | 'created_at' | 'is_draft'
>

export type PatchListProps = Omit<
  VetoolPatches,
  'patch_content' | 'feedback_id'
>

export type PatchDetailData = Pick<
  VetoolPatches,
  'created_at' | 'patch_title' | 'patch_category' | 'patch_content'
> & {
  feedback_id: Pick<VetoolFeedbacks, 'feedback_description'>
}
