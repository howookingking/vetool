export const SPECIES = ['canine', 'feline'] as const
export type SpeciesTypeEnum = (typeof SPECIES)[number]

export const SEX = [
  { label: 'Castrated Male', value: 'cm' },
  { label: 'Spayed Female', value: 'sf' },
  { label: 'Intact Male', value: 'im' },
  { label: 'Intact Female', value: 'if' },
  { label: 'Unknown', value: 'un' },
] as const

export type SexTypeEnum = (typeof SEX)[number]

export const CANINE_BREEDS = [
  {
    id: 1,
    kor: '고든 세터',
    eng: 'GORDON SETTER',
  },
  {
    id: 2,
    kor: '골든 리트리버',
    eng: 'GOLDEN RETRIEVER',
  },
  {
    id: 3,
    kor: '그레이터 스위스 마운틴 도그',
    eng: 'GREATER SWISS MOUNTAIN DOG',
  },
  {
    id: 4,
    kor: '그레이트 데인',
    eng: 'GREAT DANE',
  },
  {
    id: 5,
    kor: '그레이트 피레니즈',
    eng: 'GREAT PYRENEES',
  },
  {
    id: 6,
    kor: '그레이하운드',
    eng: 'GREYHOUND',
  },
  {
    id: 7,
    kor: '그린란드견',
    eng: 'GREENLAND DOG',
  },
  {
    id: 8,
    kor: '기타종',
    eng: 'OTHER BREED',
  },
  {
    id: 9,
    kor: '나폴리탄 마스티노',
    eng: 'NEAPOLITAN MASTIFF',
  },
  {
    id: 10,
    kor: '나폴리탄 마스티프',
    eng: 'NEAPOLITAN MASTIFF',
  },
  {
    id: 11,
    kor: '노르웨이 룬트훈트',
    eng: 'LUNDEHUND',
  },
  {
    id: 12,
    kor: '노르웨이안 부훈트',
    eng: 'NORWEGIAN BUHUND',
  },
  {
    id: 13,
    kor: '노르웨이언 엘크하운드',
    eng: 'NORWEGIAN ELKHOUND',
  },
  {
    id: 14,
    kor: '노리치 테리어',
    eng: 'NORWICH TERRIER',
  },
  {
    id: 15,
    kor: '노바 스코셔 덕 톨링 레트리버',
    eng: 'NOVA SCOTIA DUCK TOLLING RETRIEVER',
  },
  {
    id: 16,
    kor: '노퍽 테리어',
    eng: 'NORFOLK TERRIER',
  },
  {
    id: 17,
    kor: '뉴펀들랜드 도그',
    eng: 'NEWFOUNDLAND DOG',
  },
  {
    id: 18,
    kor: '닥스훈트',
    eng: 'DACHSHUND',
  },
  {
    id: 19,
    kor: '달마시안',
    eng: 'DALMATIAN',
  },
  {
    id: 20,
    kor: '댄디 딘몬트 테리어',
    eng: 'DANDIE DINMONT TERRIER',
  },
  {
    id: 21,
    kor: '데니쉬 스웨디쉬 팜도그',
    eng: 'DANISH-SWEDISH FARMDOG',
  },
  {
    id: 22,
    kor: '도고 아르헨티노',
    eng: 'DOGO ARGENTINO',
  },
  {
    id: 23,
    kor: '도그 드 보르도',
    eng: 'DOGUE DE BORDEAUX',
  },
  {
    id: 24,
    kor: '도베르만 핀셔',
    eng: 'DOBERMAN PINSCHER',
  },
  {
    id: 25,
    kor: '도사견',
    eng: 'TOSA',
  },
  {
    id: 26,
    kor: '드렌츠 패트리지 도그',
    eng: 'DRENTSE PARTRIJSHOND',
  },
  {
    id: 27,
    kor: '디어하운드',
    eng: 'DEERHOUND',
  },
  {
    id: 28,
    kor: '라사 압소',
    eng: 'LHASA APSO',
  },
  {
    id: 29,
    kor: '래브라도 리트리버',
    eng: 'LABRADOR RETRIEVER',
  },
  {
    id: 30,
    kor: '랭카셔 힐러',
    eng: 'LANCASHIRE HEELER',
  },
  {
    id: 31,
    kor: '레온베르거',
    eng: 'LEONBERGER',
  },
  {
    id: 32,
    kor: '레이클랜드 케리어',
    eng: 'LAKELAND TERRIER',
  },
  {
    id: 33,
    kor: '로디지안 리지백',
    eng: 'RHODESIAN RIDGEBACK',
  },
  {
    id: 34,
    kor: '로첸',
    eng: 'LOWCHEN',
  },
  {
    id: 35,
    kor: '로트바일러',
    eng: 'ROTTWEILER',
  },
  {
    id: 36,
    kor: '로트와일러',
    eng: 'ROTTWEILER',
  },
  {
    id: 37,
    kor: '룬트훈트',
    eng: 'LUNDEHUND',
  },
  {
    id: 38,
    kor: '르웰린',
    eng: 'ENGLISH SETTER',
  },
  {
    id: 39,
    kor: '마스티프',
    eng: 'MASTIFF',
  },
  {
    id: 40,
    kor: '말라뮤트',
    eng: 'ALASKAN MALAMUTE',
  },
  {
    id: 41,
    kor: '말티즈',
    eng: 'MALTESE',
  },
  {
    id: 42,
    kor: '말티푸',
    eng: 'MALTIPOO',
  },
  {
    id: 43,
    kor: '맥냅',
    eng: 'MCNAB DOG',
  },
  {
    id: 44,
    kor: '맥냅 셰퍼드',
    eng: 'MCNAB DOG',
  },
  {
    id: 45,
    kor: '맥냅 콜리',
    eng: 'MCNAB DOG',
  },
  {
    id: 46,
    kor: '맨체스터 테리어',
    eng: 'MANCHESTER TERRIER',
  },
  {
    id: 47,
    kor: '맬러뮤트',
    eng: 'ALASKAN MALAMUTE',
  },
  {
    id: 48,
    kor: '멕시칸 헤어리스',
    eng: 'MEXICAN HAIRLESS',
  },
  {
    id: 49,
    kor: '미니어처 불 테리어',
    eng: 'MINIATURE BULL TERRIER',
  },
  {
    id: 50,
    kor: '미니어처 푸들',
    eng: 'MINIATURE POODLE',
  },
  {
    id: 51,
    kor: '미니어처 핀셔',
    eng: 'MINIATURE PINSCHER',
  },
  {
    id: 52,
    kor: '믹스',
    eng: 'MIXED',
  },
  {
    id: 53,
    kor: '믹스견',
    eng: 'MIXED',
  },
  {
    id: 54,
    kor: '바센지',
    eng: 'BASENJI',
  },
  {
    id: 55,
    kor: '바셋하운드',
    eng: 'BASSET HOUND',
  },
  {
    id: 56,
    kor: '바이마라너',
    eng: 'WEIMARANER',
  },
  {
    id: 57,
    kor: '버니즈 마운틴 독',
    eng: 'BERNESE MOUNTAIN DOG',
  },
  {
    id: 58,
    kor: '베들링턴 테리어',
    eng: 'BEDLINGTON TERRIER',
  },
  {
    id: 59,
    kor: '벨기에 셰퍼드',
    eng: 'BELGIAN SHEPHERD DOG',
  },
  {
    id: 60,
    kor: '벨기에 테뷰런',
    eng: 'BELGIAN TERVUREN',
  },
  {
    id: 61,
    kor: '벨지안 셰퍼드',
    eng: 'BELGIAN SHEPHERD DOG',
  },
  {
    id: 62,
    kor: '벨지안 테뷰런',
    eng: 'BELGIAN TERVUREN',
  },
  {
    id: 63,
    kor: '보더 콜리',
    eng: 'BORDER COLLIE',
  },
  {
    id: 64,
    kor: '보더 테리어',
    eng: 'BORDER TERRIER',
  },
  {
    id: 65,
    kor: '보더콜리',
    eng: 'BEARDED COLLIE',
  },
  {
    id: 66,
    kor: '보르조이',
    eng: 'BORZOI',
  },
  {
    id: 67,
    kor: '보스롱',
    eng: 'BEAUCERON',
  },
  {
    id: 68,
    kor: '보스턴 테리어',
    eng: 'BOSTON TERRIER',
  },
  {
    id: 69,
    kor: '보스톤 테리어',
    eng: 'BOSTON TERRIER',
  },
  {
    id: 70,
    kor: '보어보엘',
    eng: 'BOERBOEL',
  },
  {
    id: 71,
    kor: '보이킨 스파니엘',
    eng: 'BOYKIN SPANIEL',
  },
  {
    id: 72,
    kor: '보이킨 스패니얼',
    eng: 'BOYKIN SPANIEL',
  },
  {
    id: 73,
    kor: '복서',
    eng: 'BOXER',
  },
  {
    id: 74,
    kor: '볼로네즈',
    eng: 'BOLOGNESE DOG',
  },
  {
    id: 75,
    kor: '부비에 데 플랑드르',
    eng: 'BOUVIER DES FLANDRES',
  },
  {
    id: 76,
    kor: '불 테리어',
    eng: 'BULL TERRIER',
  },
  {
    id: 77,
    kor: '불마스티프',
    eng: 'BULLMASTIFF',
  },
  {
    id: 78,
    kor: '브뤼셀 그리펀',
    eng: 'BRUSSELS GRIFFON',
  },
  {
    id: 79,
    kor: '브리아드',
    eng: 'BRIARD',
  },
  {
    id: 80,
    kor: '브리트니 스파니엘',
    eng: 'BRITTANY SPANIEL',
  },
  {
    id: 81,
    kor: '브리트니 스패니얼',
    eng: 'BRITTANY SPANIEL',
  },
  {
    id: 82,
    kor: '블랙 러시안 테리어',
    eng: 'BLACK RUSSIAN TERRIER',
  },
  {
    id: 83,
    kor: '블러드 하운드',
    eng: 'BLOODHOUND',
  },
  {
    id: 84,
    kor: '비글',
    eng: 'BEAGLE',
  },
  {
    id: 85,
    kor: '비숑 프리제',
    eng: 'BICHON FRISE',
  },
  {
    id: 86,
    kor: '비즐라',
    eng: 'VISZLA',
  },
  {
    id: 87,
    kor: '빠삐용',
    eng: 'PAPILLON',
  },
  {
    id: 88,
    kor: '사모예드',
    eng: 'SAMOYED',
  },
  {
    id: 89,
    kor: '살루키',
    eng: 'SALUKI',
  },
  {
    id: 90,
    kor: '삽살개',
    eng: 'SAPSALI',
  },
  {
    id: 91,
    kor: '샤페이',
    eng: 'SHAR PEI',
  },
  {
    id: 92,
    kor: '서식스 스파니엘',
    eng: 'SUSSEX SPANIEL',
  },
  {
    id: 93,
    kor: '서식스 스패니얼',
    eng: 'SUSSEX SPANIEL',
  },
  {
    id: 94,
    kor: '세인트 버나드',
    eng: 'SAINT BERNARD',
  },
  {
    id: 95,
    kor: '셔틀랜드 시프독',
    eng: 'SHETLAND SHEEPDOG',
  },
  {
    id: 96,
    kor: '셔틀랜드 십독',
    eng: 'SHETLAND SHEEPDOG',
  },
  {
    id: 97,
    kor: '쉬즈',
    eng: 'SHIH TZU',
  },
  {
    id: 98,
    kor: '슈나우저',
    eng: 'SCHNAUZER',
  },
  {
    id: 99,
    kor: '스몰 문스터랜더',
    eng: 'MUNSTERLANDER',
  },
  {
    id: 100,
    kor: '스웨덴 엘크하운드',
    eng: 'SWEDISH ELKHOUND',
  },
  {
    id: 101,
    kor: '스웨디시 라프훈트',
    eng: 'SWEDISH LAPLAND',
  },
  {
    id: 102,
    kor: '스코티시 디어하운드',
    eng: 'DEERHOUND',
  },
  {
    id: 103,
    kor: '스코티시 테리어',
    eng: 'SCOTTISH TERRIER',
  },
  {
    id: 104,
    kor: '스키퍼키',
    eng: 'SCHIPPERKE',
  },
  {
    id: 105,
    kor: '스타포드셔 불 테리어',
    eng: 'STAFFORDSHIRE BULL TERRIER',
  },
  {
    id: 106,
    kor: '스탠다드푸들',
    eng: 'STANDARD POODLE',
  },
  {
    id: 107,
    kor: '스패니쉬 워터 독',
    eng: 'SPANISH WATER DOG',
  },
  {
    id: 108,
    kor: '스프링어 스파니엘',
    eng: 'SPRINGER SPANIEL',
  },
  {
    id: 109,
    kor: '스프링어 스패니얼',
    eng: 'SPRINGER SPANIEL',
  },
  {
    id: 110,
    kor: '스피노네 이탈리아노',
    eng: 'SPINONE ITALIANO',
  },
  {
    id: 111,
    kor: '슬루기',
    eng: 'SLOUGHI',
  },
  {
    id: 112,
    kor: '시바견',
    eng: 'SHIBA INU',
  },
  {
    id: 113,
    kor: '시베리안 허스키',
    eng: 'SIBERIAN HUSKY',
  },
  {
    id: 114,
    kor: '시추',
    eng: 'SHIH TZU',
  },
  {
    id: 115,
    kor: '시츄',
    eng: 'SHIH TZU',
  },
  {
    id: 116,
    kor: '실리엄 테리어',
    eng: 'SEALYHAM TERRIER',
  },
  {
    id: 117,
    kor: '실켄 윈드하운드',
    eng: 'SILKEN WINDHOUND',
  },
  {
    id: 118,
    kor: '실키 테리어',
    eng: 'SILKY TERRIER',
  },
  {
    id: 119,
    kor: '아나톨리아 셰퍼드',
    eng: 'ANATOLIAN SHEPHERD DOG',
  },
  {
    id: 120,
    kor: '아메리칸 불독',
    eng: 'AMERICAN BULLDOG',
  },
  {
    id: 121,
    kor: '아메리칸 스태퍼드셔 테리어',
    eng: 'AMERICAN STAFFORDSHIRE TERRIER',
  },
  {
    id: 122,
    kor: '아메리칸 에스키모 독',
    eng: 'ESKIMO DOG',
  },
  {
    id: 123,
    kor: '아메리칸 워터 스파니엘',
    eng: 'AMERICAN WATER SPANIEL',
  },
  {
    id: 124,
    kor: '아메리칸 워터 스패니얼',
    eng: 'AMERICAN WATER SPANIEL',
  },
  {
    id: 125,
    kor: '아메리칸 핏불 테리어',
    eng: 'AMERICAN PIT BULL TERRIER',
  },
  {
    id: 126,
    kor: '아이리쉬 소프트코티드 휘튼 테리어',
    eng: 'SOFT-COATED WHEATEN TERRIER',
  },
  {
    id: 127,
    kor: '아이리시 레드 앤드 화이트 세터',
    eng: 'IRISH RED AND WHITE SETTER',
  },
  {
    id: 128,
    kor: '아이리시 세터',
    eng: 'IRISH SETTER',
  },
  {
    id: 129,
    kor: '아이리시 울프하운드',
    eng: 'IRISH WOLFHOUND',
  },
  {
    id: 130,
    kor: '아이리시 워터 스패니얼',
    eng: 'IRISH WATER SPANIEL',
  },
  {
    id: 131,
    kor: '아이리시 워터 스페니엘',
    eng: 'IRISH WATER SPANIEL',
  },
  {
    id: 132,
    kor: '아이리시 테리어',
    eng: 'IRISH TERRIER',
  },
  {
    id: 133,
    kor: '아키타',
    eng: 'AKITA',
  },
  {
    id: 134,
    kor: '아키타견',
    eng: 'AKITA',
  },
  {
    id: 135,
    kor: '아펜핀셔',
    eng: 'AFFENPINSCHER',
  },
  {
    id: 136,
    kor: '아프간 하운드',
    eng: 'AFGHAN HOUND',
  },
  {
    id: 137,
    kor: '알래스칸 말라뮤트',
    eng: 'ALASKAN MALAMUTE',
  },
  {
    id: 138,
    kor: '알래스칸 맬러뮤트',
    eng: 'ALASKAN MALAMUTE',
  },
  {
    id: 139,
    kor: '알래스칸 클리 카이',
    eng: 'ALASKAN KLEE KAI',
  },
  {
    id: 140,
    kor: '에어데일 테리어',
    eng: 'AIREDALE TERRIER',
  },
  {
    id: 141,
    kor: '엔틀버쳐 마운틴 독',
    eng: 'ENTLEBUCHER MOUNTAIN DOG',
  },
  {
    id: 142,
    kor: '오스트레일리안 실키 테리어',
    eng: 'SILKY TERRIER',
  },
  {
    id: 143,
    kor: '오스트레일리안 캐틀독',
    eng: 'AUSTRALIAN CATTLE DOG',
  },
  {
    id: 144,
    kor: '오스트레일리안 켈피',
    eng: 'AUSTRALIAN KELPIE',
  },
  {
    id: 145,
    kor: '오스트레일리언 셰퍼드',
    eng: 'AUSTRALIAN SHEPHERD DOG',
  },
  {
    id: 146,
    kor: '오스트레일리언 테리어',
    eng: 'AUSTRALIAN TERRIER',
  },
  {
    id: 147,
    kor: '오터 하운드',
    eng: 'OTTERHOUND',
  },
  {
    id: 148,
    kor: '올드 잉글리시 마스티프',
    eng: 'MASTIFF',
  },
  {
    id: 149,
    kor: '올드 잉글리시 쉽독',
    eng: 'OLD ENGLISH SHEEPDOG',
  },
  {
    id: 150,
    kor: '요크셔 테리어',
    eng: 'YORKSHIRE TERRIER',
  },
  {
    id: 151,
    kor: '웨스트 하일랜드 화이트 테리어',
    eng: 'WEST HIGHLAND WHITE TERRIER',
  },
  {
    id: 152,
    kor: '웰시 코기',
    eng: 'WELSH CORGI',
  },
  {
    id: 153,
    kor: '웰시 테리어',
    eng: 'WELSH TERRIER',
  },
  {
    id: 154,
    kor: '이비전 하운드',
    eng: 'IBIZAN HOUND',
  },
  {
    id: 155,
    kor: '이탈리안 그레이하운드',
    eng: 'ITALIAN GREYHOUND',
  },
  {
    id: 156,
    kor: '이탈리안 스피노네',
    eng: 'SPINONE ITALIANO',
  },
  {
    id: 157,
    kor: '잉글리쉬불독',
    eng: 'ENGLISH BULLDOG',
  },
  {
    id: 158,
    kor: '잉글리시 세터',
    eng: 'ENGLISH SETTER',
  },
  {
    id: 159,
    kor: '잉글리시 셰퍼드',
    eng: 'ENGLISH SHEPHERD',
  },
  {
    id: 160,
    kor: '잉글리시 포인터',
    eng: 'POINTER',
  },
  {
    id: 161,
    kor: '잉글리시불독',
    eng: 'ENGLISH BULLDOG',
  },
  {
    id: 162,
    kor: '잡종',
    eng: 'MIXED',
  },
  {
    id: 163,
    kor: '잭 러셀 테리어',
    eng: 'JACK RUSSELL TERRIER',
  },
  {
    id: 164,
    kor: '쟘툰드',
    eng: 'SWEDISH ELKHOUND',
  },
  {
    id: 165,
    kor: '저먼 셰퍼드',
    eng: 'GERMAN SHEPHERD',
  },
  {
    id: 166,
    kor: '저먼 핀셔',
    eng: 'GERMAN PINSCHER',
  },
  {
    id: 167,
    kor: '제퍼니스 친',
    eng: 'JAPANESE CHIN',
  },
  {
    id: 168,
    kor: '제페니스 친',
    eng: 'JAPANESE CHIN',
  },
  {
    id: 169,
    kor: '진도견',
    eng: 'JINDO DOG',
  },
  {
    id: 170,
    kor: '진돗개',
    eng: 'JINDO DOG',
  },
  {
    id: 171,
    kor: '차우차우',
    eng: 'CHOW CHOW',
  },
  {
    id: 172,
    kor: '차이니스 크레스티드',
    eng: 'CHINESE CRESTED DOG',
  },
  {
    id: 173,
    kor: '체서피크 베이 리트리버',
    eng: 'CHESAPEAKE BAY RETRIEVER',
  },
  {
    id: 174,
    kor: '치와와',
    eng: 'CHIHUAHUA',
  },
  {
    id: 175,
    kor: '카발리에 킹 찰스 스파니엘',
    eng: 'CAVALIER KING CHARLES SPANIEL',
  },
  {
    id: 176,
    kor: '카발리에 킹 찰스 스패니얼',
    eng: 'CAVALIER KING CHARLES SPANIEL',
  },
  {
    id: 177,
    kor: '컬리 코티드 리트리버',
    eng: 'CURLY COATED RETRIEVER',
  },
  {
    id: 178,
    kor: '케리 블루 테리어',
    eng: 'KERRY BLUE TERRIER',
  },
  {
    id: 179,
    kor: '케언 테리어',
    eng: 'CAIRN TERRIER',
  },
  {
    id: 180,
    kor: '켈피',
    eng: 'AUSTRALIAN KELPIE',
  },
  {
    id: 181,
    kor: '코몬돌',
    eng: 'KOMONDOR',
  },
  {
    id: 182,
    kor: '코커 스파니엘',
    eng: 'COCKER SPANIEL',
  },
  {
    id: 183,
    kor: '코커 스패니얼',
    eng: 'COCKER SPANIEL',
  },
  {
    id: 184,
    kor: '코통 드 튈레아르',
    eng: 'COTON DE TULEAR',
  },
  {
    id: 185,
    kor: '콜리',
    eng: 'COLLIE',
  },
  {
    id: 186,
    kor: '쿠바츠',
    eng: 'KUVASZ',
  },
  {
    id: 187,
    kor: '쿠이커혼제',
    eng: 'KOOIKERHONDJE',
  },
  {
    id: 188,
    kor: '쿤하운드',
    eng: 'COONHOUND',
  },
  {
    id: 189,
    kor: '클럼버 스파니엘',
    eng: 'CLUMBER SPANIEL',
  },
  {
    id: 190,
    kor: '클럼버 스패니얼',
    eng: 'CLUMBER SPANIEL',
  },
  {
    id: 191,
    kor: '키스혼드',
    eng: 'KEESHOND',
  },
  {
    id: 192,
    kor: '토이푸들',
    eng: 'TOY POODLE',
  },
  {
    id: 193,
    kor: '트리잉 워커 쿤 하운드',
    eng: 'TREEING WALKER COONHOUND',
  },
  {
    id: 194,
    kor: '티베탄 마스티프',
    eng: 'TIBETAN MASTIFF',
  },
  {
    id: 195,
    kor: '티베탄 테리어',
    eng: 'TIBETAN TERRIER',
  },
  {
    id: 196,
    kor: '티벳탄 스파니엘',
    eng: 'TIBETAN SPANIEL',
  },
  {
    id: 197,
    kor: '티벳탄 스패니얼',
    eng: 'TIBETAN SPANIEL',
  },
  {
    id: 198,
    kor: '파슨 러셀 테리어',
    eng: 'PARSON RUSSELL TERRIER',
  },
  {
    id: 199,
    kor: '퍼그',
    eng: 'PUG',
  },
  {
    id: 200,
    kor: '페로 드 프레사 카나리오',
    eng: 'PRESA CANARIO',
  },
  {
    id: 201,
    kor: '페키니스',
    eng: 'PEKINGESE',
  },
  {
    id: 202,
    kor: '페키니즈',
    eng: 'PEKINGESE',
  },
  {
    id: 203,
    kor: '포르투갈 워터 독',
    eng: 'PORTUGUESE WATER DOG',
  },
  {
    id: 204,
    kor: '포메라니안',
    eng: 'POMERANIAN',
  },
  {
    id: 205,
    kor: '포메라니안/스피츠',
    eng: 'Pompitz',
  },
  {
    id: 206,
    kor: '포인터',
    eng: 'POINTER',
  },
  {
    id: 207,
    kor: '폭스테리어',
    eng: 'FOX TERRIER',
  },
  {
    id: 208,
    kor: '폭스하운드',
    eng: 'FOXHOUND',
  },
  {
    id: 209,
    kor: '폴리쉬 로랜드 쉽독',
    eng: 'POLISH LOWLAND SHEEPDOG',
  },
  {
    id: 210,
    kor: '폼피츠',
    eng: 'Pompitz',
  },
  {
    id: 211,
    kor: '푸들',
    eng: 'POODLE',
  },
  {
    id: 212,
    kor: '풀리',
    eng: 'PULI',
  },
  {
    id: 213,
    kor: '풍산개',
    eng: 'POONGSAN DOG',
  },
  {
    id: 214,
    kor: '프레사 카나리오',
    eng: 'PRESA CANARIO',
  },
  {
    id: 215,
    kor: '프렌치 마스티프',
    eng: 'DOGUE DE BORDEAUX',
  },
  {
    id: 216,
    kor: '프렌치 불독',
    eng: 'FRENCH BULLDOG',
  },
  {
    id: 217,
    kor: '프렌치 스파니엘',
    eng: 'FRENCH SPANIEL',
  },
  {
    id: 218,
    kor: '프렌치 스패니얼',
    eng: 'FRENCH SPANIEL',
  },
  {
    id: 219,
    kor: '프티 바세 그리퐁 방댕',
    eng: 'PETIT BASSET GRIFFON VENDEEN',
  },
  {
    id: 220,
    kor: '플랫 코티드 리트리버',
    eng: 'FLAT-COATED RETRIEVER',
  },
  {
    id: 221,
    kor: '피니시 스피츠',
    eng: 'FINNISH SPITZ',
  },
  {
    id: 222,
    kor: '필드 스파니엘',
    eng: 'FIELD SPANIEL',
  },
  {
    id: 223,
    kor: '필드 스패니얼',
    eng: 'FIELD SPANIEL',
  },
  {
    id: 224,
    kor: '필란드 사미개',
    eng: 'FINNISH LAPPHUND',
  },
  {
    id: 225,
    kor: '필란드 스피츠',
    eng: 'FINNISH SPITZ',
  },
  {
    id: 226,
    kor: '하바나 독',
    eng: 'HAVANESE',
  },
  {
    id: 227,
    kor: '하바나 실크 독',
    eng: 'HAVANESE',
  },
  {
    id: 228,
    kor: '하바네즈',
    eng: 'HAVANESE',
  },
  {
    id: 229,
    kor: '헌터웨이',
    eng: 'HUNTAWAY',
  },
  {
    id: 230,
    kor: '호바와트',
    eng: 'HOVAWART',
  },
  {
    id: 231,
    kor: '혼합견종',
    eng: 'MIXED',
  },
  {
    id: 232,
    kor: '혼합종',
    eng: 'MIXED',
  },
  {
    id: 233,
    kor: '휘핏',
    eng: 'WHIPPET',
  },
  {
    id: 234,
    kor: '아이누견',
    eng: 'AINU DOG',
  },
  {
    id: 235,
    kor: '아이누견',
    eng: 'AINU DOG',
  },
  {
    id: 236,
    kor: '스피츠',
    eng: 'SPITZ',
  },
  {
    id: 237,
    kor: 'Polish Greyhound(폴리쉬 그레이 하운드)',
    eng: 'POLISH GREYHOUND',
  },
] as const

export const FELINE_BREEDS = [
  {
    id: 1,
    kor: '기타종',
    eng: 'OTHER BREED',
  },
  {
    id: 2,
    kor: '노르웨이숲',
    eng: 'NORWEGIAN FOREST',
  },
  {
    id: 3,
    kor: '데본 렉스',
    eng: 'DEVON REX',
  },
  {
    id: 4,
    kor: '도메스틱 롱 헤어',
    eng: 'DOMESTIC LONGHAIRED',
  },
  {
    id: 5,
    kor: '도메스틱 숏헤어',
    eng: 'DOMESTIC SHORTHAIRED',
  },
  {
    id: 6,
    kor: '두색털 고양이',
    eng: 'TUXEDO CAT',
  },
  {
    id: 7,
    kor: '랙돌',
    eng: 'RAGDOLL',
  },
  {
    id: 8,
    kor: '러시안 블루',
    eng: 'RUSSIAN BLUE',
  },
  {
    id: 9,
    kor: '롱헤어 스코티시 폴드',
    eng: 'LONGHAIR SCOTTISH FOLD',
  },
  {
    id: 10,
    kor: '맹크스',
    eng: 'MANX',
  },
  {
    id: 11,
    kor: '먼치킨',
    eng: 'MUNCHKIN',
  },
  {
    id: 12,
    kor: '메인쿤',
    eng: 'MAINE COON',
  },
  {
    id: 13,
    kor: '믹스',
    eng: 'MIXED',
  },
  {
    id: 14,
    kor: '믹스고양이',
    eng: 'MIXED',
  },
  {
    id: 15,
    kor: '믹스묘',
    eng: 'MIXED',
  },
  {
    id: 16,
    kor: '버만',
    eng: 'BIRMAN',
  },
  {
    id: 17,
    kor: '버미즈',
    eng: 'BURMESE',
  },
  {
    id: 18,
    kor: '벵갈',
    eng: 'BENGAL',
  },
  {
    id: 19,
    kor: '봄베이',
    eng: 'BOMBAY',
  },
  {
    id: 20,
    kor: '브리티시 숏헤어',
    eng: 'BRITISH SHORTHAIR',
  },
  {
    id: 21,
    kor: '빌리니즈',
    eng: 'BALINESE',
  },
  {
    id: 22,
    kor: '샤르트뢰',
    eng: 'CHARTREAUX',
  },
  {
    id: 23,
    kor: '샴',
    eng: 'SIAMESE',
  },
  {
    id: 24,
    kor: '샹틀리-티파니',
    eng: 'TIFFANY',
  },
  {
    id: 25,
    kor: '소말리',
    eng: 'SOMALI',
  },
  {
    id: 26,
    kor: '스노우슈',
    eng: 'SNOSHOE',
  },
  {
    id: 27,
    kor: '스코티시 폴드',
    eng: 'SCOTTISH FOLD',
  },
  {
    id: 28,
    kor: '스코티시 폴드 숏헤어',
    eng: 'SCOTTISH FOLD',
  },
  {
    id: 29,
    kor: '스핑크스',
    eng: 'SPHYNX',
  },
  {
    id: 30,
    kor: '싱가푸라',
    eng: 'SINGAPURA',
  },
  {
    id: 31,
    kor: '아메리칸 밥테일',
    eng: 'AMERICAN BOBTAIL',
  },
  {
    id: 32,
    kor: '아메리칸 숏헤어',
    eng: 'AMERICAN SHORTHAIR',
  },
  {
    id: 33,
    kor: '아비시니안',
    eng: 'ABYSSINIAN',
  },
  {
    id: 34,
    kor: '엑조틱 쇼트헤어',
    eng: 'EXOTIC SHORTHAIR',
  },
  {
    id: 35,
    kor: '오리엔탈 롱헤어',
    eng: 'ORIENTAL LONGHAIR',
  },
  {
    id: 36,
    kor: '오리엔탈 숏헤어',
    eng: 'ORIENTAL SHORTHAIR',
  },
  {
    id: 37,
    kor: '오스트레일리안 미스트',
    eng: 'AUSTRALIAN MIST',
  },
  {
    id: 38,
    kor: '오시캣',
    eng: 'OCICAT',
  },
  {
    id: 39,
    kor: '이집션 마우',
    eng: 'EGYPTIAN MAU',
  },
  {
    id: 40,
    kor: '자바니즈',
    eng: 'JAVANESE',
  },
  {
    id: 41,
    kor: '잡종',
    eng: 'MIXED',
  },
  {
    id: 42,
    kor: '재패니즈밥테일',
    eng: 'JAPANESE BOBTAIL',
  },
  {
    id: 43,
    kor: '카오 마니',
    eng: 'Khao Manee',
  },
  {
    id: 44,
    kor: '카오마니',
    eng: 'Khao Manee',
  },
  {
    id: 45,
    kor: '코니시 렉스',
    eng: 'CORNISH REX',
  },
  {
    id: 46,
    kor: '코랏',
    eng: 'KORAT',
  },
  {
    id: 47,
    kor: '코리안 숏헤어',
    eng: 'DOMESTIC SHORTHAIRED',
  },
  {
    id: 48,
    kor: '코숏',
    eng: 'DOMESTIC SHORTHAIRED',
  },
  {
    id: 49,
    kor: '터키시 앙고라',
    eng: 'TURKISH ANGORA',
  },
  {
    id: 50,
    kor: '턱시도',
    eng: 'TUXEDO CAT',
  },
  {
    id: 51,
    kor: '톤키니즈',
    eng: 'TONKINESE',
  },
  {
    id: 52,
    kor: '티파니',
    eng: 'TIFFANY',
  },
  {
    id: 53,
    kor: '페르시안',
    eng: 'PERSIAN',
  },
  {
    id: 54,
    kor: '페르시안 친칠라',
    eng: 'PERSIAN CHINCHILLA',
  },
  {
    id: 55,
    kor: '하바나 브라운',
    eng: 'HAVANA BROWN',
  },
  {
    id: 56,
    kor: '혼합묘종',
    eng: 'MIXED',
  },
  {
    id: 57,
    kor: '혼합종',
    eng: 'MIXED',
  },
  {
    id: 58,
    kor: '히말라얀',
    eng: 'HIMALAYAN',
  },
] as const

export const COLORS = [
  { label: 'White', value: 'white', hex: ['#ffffff'] },
  { label: 'Black', value: 'black', hex: ['#000000'] },
  { label: 'Brown', value: 'brown', hex: ['#552F1A'] },
  { label: 'Cream', value: 'cream', hex: ['#E4D7C5'] },
  { label: 'Gold', value: 'gold', hex: ['#F5E1B3'] },
  { label: 'Orange', value: 'orange', hex: ['#E2BA7F'] },
  { label: 'Gray', value: 'gray', hex: ['#85838F'] },
  { label: 'Black & White', value: 'black-white', hex: ['#000000', '#ffffff'] },
  { label: 'Black & Brown', value: 'black-brown', hex: ['#000000', '#552F1A'] },
  { label: 'Gold & white', value: 'gold-white', hex: ['#F5E1B3', '#ffffff'] },
  { label: 'Brown & White', value: 'brown-white', hex: ['#552F1A', '#ffffff'] },
  { label: 'Chaos', value: 'chaos', hex: ['#000000', '#E2BA7F', '#ffffff'] },
] as const
