export default function InputSuffix({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none text-xs text-muted-foreground">
      {text}
    </div>
  )
}
