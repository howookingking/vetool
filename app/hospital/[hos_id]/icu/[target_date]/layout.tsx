import IcuFooter from '@/components/hospital/icu/footer/icu-footer'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { fetchIcuLayoutData } from '@/lib/services/icu/icu-layout'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'

type Props = {
  children: React.ReactNode
  params: Promise<{ target_date: string; hos_id: string }>
}

export default async function IcuPageLayout(props: Props) {
  // 자신의 병원에만 접근가능
  // RLS 사용할 경우
  // TO authenticated
  // USING (
  //     hos_id = (
  //         SELECT hos_id
  //         FROM users
  //         WHERE auth.uid() = users.user_id
  //     )
  //     OR
  //     EXISTS (
  //         SELECT 1
  //         FROM users
  //         WHERE auth.uid() = users.user_id
  //         AND is_super = true
  //     )
  // )
  // 일단 아래 코드 비활성화
  // const vetoolUser = await getVetoolUserData()
  // redirectToOwnHospital(vetoolUser, params.hos_id, vetoolUser.is_super)

  const { hos_id, target_date } = await props.params

  const {
    basicHosSettings: {
      group_list,
      icu_memo_names,
      is_in_charge_system,
      order_color,
      order_color_display,
      order_font_size,
      plan,
      show_orderer,
      show_tx_user,
      time_guidelines,
      vital_ref_range,
    },
    icuSidebarPatients,
    vetList,
  } = await fetchIcuLayoutData(hos_id, target_date)

  return (
    <>
      <BasicHosDataProvider
        basicHosData={{
          // 수의사 정보
          vetList: vetList,

          // 사이드바에 표시되는 환자 정보 => 차트 생성 단계에서 필요함
          icuSidebarPatients: icuSidebarPatients,

          // 병원 ICU 설정값들
          groupListData: group_list,
          orderColorsData: order_color,
          memoNameListData: icu_memo_names,
          showOrderer: show_orderer,
          showTxUser: show_tx_user,
          vitalRefRange: vital_ref_range,
          orderFontSizeData: order_font_size,
          timeGuidelineData: time_guidelines,
          orderColorDisplay: order_color_display,
          plan: plan,
          isInChargeSystem: is_in_charge_system,
        }}
      >
        <div className="flex h-desktop">
          <IcuSidebar
            hosId={hos_id}
            targetDate={target_date}
            hosGroupList={group_list}
            icuSidebarPatients={icuSidebarPatients}
            vetList={vetList}
          />

          <div className="ml-0 w-screen flex-1 2xl:ml-48 2xl:w-auto">
            {props.children}
          </div>
        </div>
      </BasicHosDataProvider>

      <IcuFooter hosId={hos_id} targetDate={target_date} />
    </>
  )
}
