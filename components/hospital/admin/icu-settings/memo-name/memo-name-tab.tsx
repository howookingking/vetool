'use client'

import MemoNameSetting from '@/components/hospital/admin/icu-settings/memo-name/memo-name-settting'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function MemoNameTab() {
  const {
    basicHosData: { memoNameListData },
  } = useBasicHosDataContext()

  return <MemoNameSetting memoNames={memoNameListData} />
}
