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
import userAvatarFallback from '@/public/user-avatar-fallback.svg'
import type { VetoolUser } from '@/types'
import { CrownIcon, PowerIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  hosId: string
  vetoolUser: VetoolUser
  setIsSheetOpen?: Dispatch<SetStateAction<boolean>>
  isMobile?: boolean
}

export default function SidebarUserDropdown({
  hosId,
  vetoolUser,
  setIsSheetOpen,
  isMobile,
}: Props) {
  const isAdmin = vetoolUser.is_admin

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={cn(isMobile && 'm-1')}>
          <Avatar className="h-8 w-8">
            <AvatarImage
              className="h-8 w-8"
              loading="lazy"
              src={vetoolUser.avatar_url ?? userAvatarFallback}
              alt={vetoolUser.name}
            />
            <AvatarFallback>{vetoolUser.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" side="top">
        <DropdownMenuLabel className="text-center">
          {vetoolUser.name} - {vetoolUser.position}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem asChild onClick={() => setIsSheetOpen?.(false)}>
              <Link
                href={`/hospital/${hosId}/admin/staff`}
                className="hidden cursor-pointer items-center gap-2 2xl:flex"
              >
                <CrownIcon size={18} />
                <span>관리자</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild onClick={() => setIsSheetOpen?.(false)}>
            <Link
              href={`/hospital/${hosId}/my-page`}
              className="flex cursor-pointer items-center gap-2"
            >
              <UserIcon size={18} />
              <span>사용자 계정</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="p-0">
          <form action={logout}>
            <Button type="submit" className="w-full" variant="secondary">
              <PowerIcon size={18} />
              로그아웃
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
