import ProfileImage from '@/components/hospital/my-page/profile-image'
import UserInfoItem from '@/components/hospital/my-page/user-info-item'
import { getVetoolUserData } from '@/lib/services/auth/authorization'

export default async function MyPage() {
  const userData = await getVetoolUserData()
  const userInfoItems = [
    { label: '이름', value: userData.name, canEdit: true },
    { label: '이메일', value: userData.email },
    { label: '직책', value: userData.position },
  ]

  return (
    <div className="m-2 flex h-full max-w-[960px] flex-col items-center justify-center rounded-md border p-4">
      <ProfileImage src={userData.avatar_url} />

      <div className="mt-8 flex w-full flex-col items-center justify-center rounded-md border">
        {userInfoItems.map((item, index) => (
          <UserInfoItem
            key={index}
            label={item.label}
            value={item.value!}
            userId={userData.user_id}
            canEdit={item.canEdit}
          />
        ))}
      </div>
    </div>
  )
}
