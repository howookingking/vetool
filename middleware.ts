import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

const VETOOL_COMPANY_ROUTES = ['/', '/products', '/pricing', '/company']

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = await createClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (VETOOL_COMPANY_ROUTES.includes(request.nextUrl.pathname)) {
    if (authUser) {
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('hos_id')
        .match({ user_id: authUser?.id })

      if (userDataError) {
        return NextResponse.redirect(
          new URL(`error?message=${userDataError.message}`, request.url),
        )
      }

      // If the user does not exist, insert into users table and redirect to onboarding page
      if (userData.length === 0) {
        const { error: insertUserError } = await supabase.from('users').insert({
          user_id: authUser.id,
          name: authUser.user_metadata.full_name,
          email: authUser.email,
          avatar_url: authUser.user_metadata.avatar_url,
        })

        if (insertUserError) {
          return NextResponse.redirect(
            new URL(`/error?message=${insertUserError.message}`, request.url),
          )
        }

        return NextResponse.redirect(new URL('/on-boarding', request.url))
      }

      // If the user exists and has a registered hospital
      if (userData.at(0)?.hos_id) {
        return NextResponse.redirect(
          new URL(`/hospital/${userData.at(0)?.hos_id}`, request.url),
        )
      }

      // If the user exists but has no registered hospital
      const { data: userApprovalData, error: userApprovalDataError } =
        await supabase
          .from('user_approvals')
          .select()
          .match({ user_id: authUser?.id })

      if (userApprovalDataError) {
        console.error(userApprovalDataError)
        return NextResponse.redirect(
          new URL(
            `/error?message=${userApprovalDataError.message}`,
            request.url,
          ),
        )
      }

      // If the user has not applied for approval yet
      if (userApprovalData.length === 0) {
        return NextResponse.redirect(new URL('/on-boarding', request.url))
      }

      // If the user has applied for approval but not yet approved
      return NextResponse.redirect(
        new URL('/on-boarding/approval-waiting', request.url),
      )
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/hospital') &&
    request.nextUrl.pathname.endsWith('/api/notification')
  ) {
    return supabaseResponse
  }

  // Redirect to login page if the user is not logged in and tries to access hospital routes
  if (request.nextUrl.pathname.startsWith('/hospital')) {
    if (!authUser) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
