import kwangjin from '@/public/company/logos/kwangjin.png'
import royalGangdong from '@/public/company/logos/royal-gangdong.png'
import snc from '@/public/company/logos/snc.png'

export const TESTIMONIALS = [
  {
    image: snc,
    description: (
      <>
        벳툴은 환자 상태 및 처치 유무 등 언제 어디서든 확인하고 조치할 수
        있습니다. <br />
        스탭이 많은 곳일수록 업무 효율이 증가합니다. <br />
        프로그램에 대한 피드백도 빨라 병원에 맞게 운영할 수 있습니다.
      </>
    ),
    name: '고준호',
    title: 'SNC동물메디컬센터 부원장',
  },
  {
    image: kwangjin,
    description: (
      <>
        벳툴은 수의사가 무엇을 불편해하는지를 정확히 알고 있습니다.
        <br /> 피드백이 빨라서 좋고 이어서 출시될 제품들도 기대가 됩니다.
      </>
    ),
    name: '소형재',
    title: '광진동물의료센터 원장',
  },
  {
    image: royalGangdong,
    description: (
      <>
        수의사들 뿐만 아니라 간호사들도 벳툴 입원환자 차트를 좋아합니다.
        <br />
        누락되는 처치가 없어서 좋습니다.
      </>
    ),
    name: '권린희',
    title: '강동로얄동물메디컬센터 원장',
  },
  // {
  //   image: kokkiri,
  //   description: (
  //     <>
  //       벳툴의 입원환자차트를 사용하고 업무효율이 크게 증가하였습니다. <br />
  //       집에서도 입원환자의 상태를 확인 할 수 있어서 정말 좋습니다.
  //     </>
  //   ),
  //   name: 'ㅇㅇㅇ',
  //   title: '24시코끼리동물의료센터 원장',
  // },
] as const
