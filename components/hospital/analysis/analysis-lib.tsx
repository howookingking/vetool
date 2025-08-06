'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuIo } from './analysis-type'

export const getHosDatas = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('hospitals').select('*')

  if (error) {
    console.error(error)
  }
  return data
}

export const getHosIoDatas = async (
  ids: string[],
  predate: string,
  postdate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_io')
    .select('*')
    .in('hos_id', ids)
    .gte('in_date', predate)
    .lte('in_date', postdate)
    .order('in_date', { ascending: true })

  if (error) {
    console.error('Supabase error:', error.message, error.code, error.details)
  }
  return data as IcuIo[]
}

export const getKeywordDatas = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('keywords').select('*')

  if (error) {
    console.error(error)
  }
  return data
}

// #canine#PEKINGESE#sf#1486#밤밤#서예지#enteritis#inflammatory#intestinal#digestive#gastrointestinal#abdominal#vomiting#gastrointestinal sign#historical sign#history taking#enteritis#식욕절폐#구토

// tag[1]: 'species'
// tag[2] : 'breed'
// tag[3] : 'gender'
// tag[4] : 'age'
// tag[5] : 'name'
// tag[6] : 'owner_name'
