import IcuSettingsTab from '@/components/hospital/admin/icu-settings/icu-settings-tab'

export default async function AdminIcuSettingsPage(
  props: {
    params: Promise<{ hos_id: string }>
  }
) {
  const params = await props.params;
  return <IcuSettingsTab hosId={params.hos_id} />
}
