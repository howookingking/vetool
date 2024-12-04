import * as z from 'zod'

export const registerIcuPatientFormSchema = z.object({
  in_date: z.date({ required_error: '입원일을 입력해주세요' }),
  out_due_date: z
    .date({ required_error: '퇴원예정일을 입력해주세요' })
    .optional(),
  main_vet: z.string({ required_error: '주치의를 선택해주세요' }),

  group_list: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: '적어도 하나의 그룹을 선택해주세요',
    }),
})
