export default function VetName({
  label,
  name,
}: {
  label: string
  name: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span>{name}</span>
    </div>
  )
}
