import dynamic from 'next/dynamic'

const TxUpsertDialogDynamc = dynamic(() => import('./tx-upsert-dialog'), {
  ssr: false,
})

export default TxUpsertDialogDynamc
