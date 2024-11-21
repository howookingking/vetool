import { create } from 'zustand'

type Patient = {
  patientId: string
  birth: string
  patientName: string
  ageInDays: number
}

type IcuRegisterStore = {
  registeringPatient: Patient | null
  setRegisteringPatient: (patient: Patient) => void
  step: 'patientRegister' | 'icuRegister' | 'patientSearch'
  setStep: (step: 'patientRegister' | 'icuRegister' | 'patientSearch') => void
  reset: () => void
}

export const useIcuRegisterStore = create<IcuRegisterStore>((set) => ({
  registeringPatient: null,
  setRegisteringPatient: (patient) =>
    set({
      registeringPatient: {
        patientId: patient.patientId,
        birth: patient.birth,
        patientName: patient.patientName,
        ageInDays: patient.ageInDays,
      },
    }),
  step: 'patientSearch',
  setStep: (step) => set({ step }),
  reset: () => set({ registeringPatient: null, step: 'patientSearch' }),
}))
