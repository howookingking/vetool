export default function NavContent() {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-3 space-y-3">
        <h3 className="font-semibold">For Individuals</h3>
        <div className="block text-sm hover:underline">Introduction</div>
        <div className="block text-sm hover:underline">Pay as you go</div>
      </div>
      <div className="mb-6 space-y-3">
        <h3 className="font-semibold">For Companies</h3>
        <div className="block text-sm hover:underline">Startups</div>
        <div className="block text-sm hover:underline">SMBs</div>
        <div className="block text-sm hover:underline">Enterprise</div>
      </div>
      <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
        Contact sales
      </button>
    </div>
  )
}
