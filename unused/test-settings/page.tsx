export default async function AdminTestSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  return <div>AdminTestSettingsPage</div>
}
