import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-destructive">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600">
            요청하신 페이지를 찾을 수 없습니다. <br />
            주소를 다시 확인해주세요.
          </p>
          <Link href="/">
            <Button variant="default" className="w-full">
              <HomeIcon />
              홈으로 돌아가기
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
