import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const supabase = await createClient()

  const code = searchParams.get('code')
  if (code) {
    const { error: codeExchangeError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (codeExchangeError) {
      console.error(codeExchangeError)
      return NextResponse.redirect(
        new URL(`/error?message=${codeExchangeError.message}`, request.url),
      )
    }

    const { error } = await supabase.auth.getUser()

    if (error) {
      console.error(error)
      return NextResponse.redirect(
        new URL(`/error?message=${error.message}`, request.url),
      )
    }

    return NextResponse.redirect(new URL('/', request.url))
  }
}
