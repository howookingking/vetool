import React from 'react'
import UserAvatar from './user-avatar'
import type { Vet } from '@/types'

type Props = {
  avatarUrl: Vet['avatar_url']
  name: Vet['name']
  position: Vet['position']
}

export default function UserSelectItem({ avatarUrl, name, position }: Props) {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar src={avatarUrl} alt={name} />
      <div className="flex items-center gap-0.5">
        <span>{name}</span>
        <span className="text-xs text-muted-foreground">({position})</span>
      </div>
    </div>
  )
}
