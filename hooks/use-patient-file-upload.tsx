import { useState } from 'react'
import { read, utils } from 'xlsx'

type FileData = string[][]

export default function usePatientFileUpload(
  hos_id: string,
  onComplete: () => void,
) {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // csv 파일을 파싱
  const parseCSV = (content: string): string[][] => {
    const rows = content.split('\n')

    // csv 파일에서 쉼표가 따옴표로 묶인 값 사이에 있는지 확인하는 정규식 ("a", "b", "c" ... )
    return rows.map((row) =>
      row.split(/(?:,)(?=(?:[^"]*"[^"]*")*[^"]*$)/g).map((cell) => cell.trim()),
    )
  }

  // xlsx 파일을 파싱
  const parseExcel = (content: ArrayBuffer): string[][] => {
    try {
      const workbook = read(content, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]

      const data = utils.sheet_to_json(sheet, {
        header: 1,
        raw: false, // 모든 값을 문자열로 변환
        defval: '', // 빈 셀을 빈 문자열로 처리
      })

      // 빈 행 제거
      return data.filter((row: any) =>
        row.some((cell: any) => cell !== ''),
      ) as string[][]
    } catch (error) {
      console.error('Excel 파싱 오류:', error)
      throw new Error('Excel 파일 파싱 중 오류가 발생했습니다.')
    }
  }

  // FileReader를 통해 input으로 받은 파일을 string[][]으로 변환
  const readFileContent = (file: File): Promise<FileData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async (event) => {
        try {
          const content = event.target?.result as ArrayBuffer | string
          const fileExtension = file.name.toLowerCase().split('.').pop()

          switch (fileExtension) {
            case 'csv':
              resolve(parseCSV(content as string))
              break
            case 'xlsx':
            case 'xls':
              resolve(parseExcel(content as ArrayBuffer))
              break
            default:
              throw new Error('지원하지 않는 파일 형식입니다.')
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '파일 읽기 중 오류가 발생했습니다.'
          setUploadStatus(`🚨 ${errorMessage}`)
          reject(error)
        }
      }

      reader.onerror = () => {
        setUploadStatus('🚨 파일 읽기 중 오류가 발생했습니다.')
        reject(new Error('파일 읽기 실패'))
      }

      const fileExtension = file.name.toLowerCase().split('.').pop()
      if (fileExtension === 'csv') {
        reader.readAsText(file)
      } else if (['xlsx', 'xls'].includes(fileExtension || '')) {
        reader.readAsArrayBuffer(file)
      } else {
        setUploadStatus('🚨 지원하지 않는 파일 형식입니다.')
        reject(new Error('지원하지 않는 파일 형식'))
      }
    })
  }

  const handleFileSelection = (file: File | null) => {
    setSelectedFile(file)
    setUploadStatus(null)
  }

  // 업로드 핸들러 함수
  const handleUpload = async (uploadType: string) => {
    if (!selectedFile) return

    setIsLoading(true)

    const csvData = await readFileContent(selectedFile)

    if (uploadType === 'intoVet') {
      await fetch(`/api/patient/upload/intovet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: csvData, hos_id }),
      })
    }

    if (uploadType === 'efriends') {
      await fetch(`/api/patient/upload/efriends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: csvData, hos_id }),
      })
    }

    setIsLoading(false)
    setSelectedFile(null)
    onComplete()
  }

  return {
    selectedFile,
    uploadStatus,
    isLoading,
    handleFileSelection,
    handleUpload,
  }
}
