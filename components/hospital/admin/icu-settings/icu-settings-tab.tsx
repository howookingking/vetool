import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ADMIN_SETTING_ITEMS } from '@/constants/admin/admin-setting-items'

export default function IcuSettingsTab({ hosId }: { hosId: string }) {
  return (
    <Tabs defaultValue="defaultOrder">
      <TabsList className="grid h-auto grid-cols-4 grid-rows-2 gap-1 text-xs sm:grid-cols-9 sm:grid-rows-1">
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
          <item.Component hosId={hosId} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
