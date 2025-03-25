import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ADMIN_SETTING_ITEMS } from '@/constants/admin/admin-setting-items'

export default function IcuSettingsTab({ hosId }: { hosId: string }) {
  return (
    <Tabs defaultValue="defaultOrder">
      <TabsList className="grid grid-cols-8">
        {ADMIN_SETTING_ITEMS.map((item) => (
          <TabsTrigger key={item.value} value={item.value} className="text-sm">
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
