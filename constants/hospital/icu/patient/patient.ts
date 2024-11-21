export const CSV_HEADER_MAPPING = [
  { csvColumn: '고객번호', dbColumn: 'hos_owner_id' },
  { csvColumn: '고객이름', dbColumn: 'owner_name' },
  { csvColumn: '동물 번호', dbColumn: 'hos_patient_id' },
  { csvColumn: '동물이름', dbColumn: 'name' },
  { csvColumn: '종', dbColumn: 'species' },
  { csvColumn: '품 종', dbColumn: 'breed' },
  { csvColumn: '성별', dbColumn: 'gender' },
  { csvColumn: '생년월일', dbColumn: 'birth' },
  { csvColumn: '상태', dbColumn: 'is_alive' },
] as const
