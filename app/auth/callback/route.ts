import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const supabase = createClient()

  const code = searchParams.get('code')

  if (code) {
    const { error: codeExchangeError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (!codeExchangeError) {
      const { error } = await supabase.auth.getUser()

      if (error) {
        return NextResponse.redirect(
          new URL(`/error?message=${error.message}`, request.url),
        )
      }

      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}
