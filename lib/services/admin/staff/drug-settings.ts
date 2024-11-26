'use server'

import { createClient } from '@/lib/supabase/server'
import type { DrugProductDetail } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const getDrugProductDetails = async (hosId: string) => {
  const supabase = await createClient()

  const { data: drugProductDetailsData, error: drugProductDetailsDataError } =
    await supabase
      .rpc('get_drug_product_details', { hos_id_input: hosId })
      .returns<DrugProductDetail[]>()

  if (drugProductDetailsDataError) {
    console.log(drugProductDetailsDataError)
    redirect(`/error/?message=${drugProductDetailsDataError.message}`)
  }

  return drugProductDetailsData
}

export const updateDrugProduct = async (
  hosId: string,
  drugProductId: string,
  fieldName: string,
  value: string,
) => {
  const supabase = await createClient()

  // const { error: updateDrugDescriptionError } = await supabase
  //   .from('drug_products_rows')
  //   .update({ [fieldName]: value })
  //   .match({ drug_products_id: drugProductId, hos_id: hosId })

  // if (updateDrugDescriptionError) {
  //   console.log(updateDrugDescriptionError)
  //   redirect(`/error/?message=${updateDrugDescriptionError.message}`)
  // }
}

export const updateDrugIndication = async (
  hosId: string,
  drugDescriptionId: string,
  indication: string,
) => {
  const supabase = await createClient()

  // const { error: updateDrugDescriptionError } = await supabase
  //   .from('drugs_description')
  //   .update({ indication })
  //   .match({ drugs_description_id: drugDescriptionId, hos_id: hosId })

  // if (updateDrugDescriptionError) {
  //   console.log(updateDrugDescriptionError)
  //   redirect(`/error/?message=${updateDrugDescriptionError.message}`)
  // }
}

export const updateDrugType = async (
  drugProductId: string,
  hosId: string,
  type: string,
) => {
  const supabase = await createClient()

  // const { error: updateDrugTypeError } = await supabase
  //   .from('drug_products_rows')
  //   .update({ type })
  //   .match({ drug_products_id: drugProductId, hos_id: hosId })

  // if (updateDrugTypeError) {
  //   console.log(updateDrugTypeError)
  //   redirect(`/error/?message=${updateDrugTypeError.message}`)
  // }
}
