import { create } from 'zustand'

type Patient = {
  patientId: string
  birth: string
  patientName: string
  ageInDays?: number
  species?: string
  breed?: string
  gender?: string
  microchipNo?: string
  memo?: string
  weight?: string
  ownerName?: string
  ownerId?: string
  hosPatientId?: string
}

type IcuRegisterStore = {
  registeringPatient: Patient | null
  setRegisteringPatient: (patient: Patient) => void

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
        species: patient.species,
        breed: patient.breed,
        gender: patient.gender,
        microchipNo: patient.microchipNo,
        memo: patient.memo,
        weight: patient.weight,
        ownerName: patient.ownerName,
        ownerId: patient.ownerId,
        hosPatientId: patient.hosPatientId,
      },
    }),

  reset: () => set({ registeringPatient: null }),
}))
