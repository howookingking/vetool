// app/api/patient/upload/route.ts

import { createClient } from '@/lib/supabase/server'
import { transformCsvData } from '@/lib/utils/insert-patient'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export async function POST(req: NextRequest) {
  try {
    const { data, hos_id } = await req.json()
    const header = data[1] // 실제 헤더 행

    // null이 아닌 데이터만 필터링하고 유효성 검사 추가
    const patientData = data
      .slice(2, -1)
      .map((row: string[]) => {
        const transformedRow = transformCsvData(row, header)
        if (transformedRow) {
          return { ...transformedRow, hos_id }
        }
        return null
      })
      .filter((row: any): row is NonNullable<typeof row> => {
        if (!row || !row.hos_patient_id!) {
          return false
        }
        return true
      })

    if (patientData.length === 0) {
      return NextResponse.json(
        { error: '유효한 데이터가 없습니다.' },
        { status: 400 },
      )
    }

    const supabase = await createClient()
    const { error } = await supabase.from('patients').upsert(patientData, {
      onConflict: 'hos_patient_id, birth, name',
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('업로드 처리 중 오류:', error)
    const message = error instanceof Error ? error.message : '업로드 처리 실패'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
