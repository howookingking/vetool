import ChecklistFooter from '@/components/hospital/checklist/footer/checklist-footer'
import ChecklistSidebar from '@/components/hospital/checklist/sidebar/checklist-sidebar'
import { ChecklistContextProvider } from '@/providers/cl-context-provider'

export default async function ChecklistPageLayout(props: {
  children: React.ReactNode
  params: Promise<{ target_date: string; hos_id: string }>
}) {
  const { hos_id, target_date } = await props.params

  return (
    <ChecklistContextProvider
      // TODO : 실제 데이터 fetching
      clContextData={{
        groupListData: ['외과', '호텔링', 'ICU', '내과', '영상'],
        plan: 'free',
        vetsListData: [
          {
            user_id: 'e44e3c36-0ff3-4800-9c8b-2a34810179a9',
            name: '슈퍼샤이',
            avatar_url:
              'https://lh3.googleusercontent.com/a/ACg8ocL-5Eyk6_wJr8q4YeIFZNQ4WtRtyJiu1Yub6EOZ999Emni8i8c=s96-c',
            position: '벳툴왕',
            rank: 1,
          },
          {
            user_id: '890bcf84-fa23-4ad3-a4cc-8599fb310d9e',
            name: '이정우',
            avatar_url:
              'https://lh3.googleusercontent.com/a/ACg8ocLG_wvw9s2wG7bh6ckY3r55N1wKwXXJ7oQ4vlLaYxegFfQVAuYOvQ=s96-c',
            position: '나다',
            rank: 2,
          },
        ],
      }}
    >
      <div className="flex h-desktop">
        <ChecklistSidebar hosId={hos_id} targetDate={target_date} />

        <div className="ml-0 w-screen flex-1 2xl:ml-48 2xl:w-auto">
          {props.children}
        </div>
      </div>

      <ChecklistFooter hosId={hos_id} targetDate={target_date} />
    </ChecklistContextProvider>
  )
}
