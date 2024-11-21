'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/lib/services/auth/authentication'
import { cn } from '@/lib/utils/utils'
import { Crown, User } from 'lucide-react'
import Link from 'next/link'

export default function SidebarUserInfo({
  hosId,
  userData,
  mobile,
  handleCloseMobileDrawer,
}: {
  hosId: string
  userData: {
    email: string | null
    name: string
    avatar_url: string | null
    position: string
    is_admin: boolean
    user_id: string
  }
  mobile?: boolean
  handleCloseMobileDrawer?: () => void
}) {
  return (
    <div className={cn('absolute bottom-0', mobile ? 'right-2' : 'left-2')}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                loading="lazy"
                src={userData.avatar_url ?? ''}
                alt={userData.name}
              />
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" side="top">
          <DropdownMenuLabel>
            <div className="text-center">
              {userData.name} - {userData.position}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {userData.is_admin && (
              <DropdownMenuItem
                asChild
                onClick={() =>
                  handleCloseMobileDrawer && handleCloseMobileDrawer()
                }
              >
                <Link
                  href={`/hospital/${hosId}/admin/staff`}
                  className="flex items-center gap-2"
                >
                  <Crown size={18} />
                  관리자
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              asChild
              onClick={() =>
                handleCloseMobileDrawer && handleCloseMobileDrawer()
              }
            >
              <Link
                href={`/hospital/${hosId}/my-page`}
                className="flex items-center gap-2"
              >
                <User size={18} />
                사용자 계정
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="p-0">
            <form action={logout}>
              <Button type="submit" variant="destructive" className="w-full">
                로그아웃
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
