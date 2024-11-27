import LargeLoaderCircle from '@/components/common/large-loader-circle'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ADMIN_SETTING_ITEMS } from '@/constants/admin/admin-setting-items'
import { Suspense } from 'react'

export default function IcuSettingsTab({ hosId }: { hosId: string }) {
  return (
    <Tabs defaultValue="defaultOrder">
      <TabsList className="grid grid-cols-7 text-xs">
        {ADMIN_SETTING_ITEMS.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="text-xs sm:text-sm"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {ADMIN_SETTING_ITEMS.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
            <item.Component hosId={hosId} />
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  )
}
