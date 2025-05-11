export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-black/80">
      <div className="text-center">
        <img
          src="/loading.gif"
          alt="Loading..."
          className="w-16 h-16 mx-auto mb-4 animate-spin-slow"
        />
        <span className="text-xl font-semibold text-amber-400 animate-pulse">
          Please wait, loading...
        </span>
      </div>
    </div>
  );
}
