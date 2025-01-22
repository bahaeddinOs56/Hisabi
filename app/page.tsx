import { Suspense } from "react"
import dynamic from "next/dynamic"
import NavigationBar from "../components/NavigationBar"
import { IMAGES } from "../utils/images"

const DynamicHomeContent = dynamic(() => import("../components/HomeContent"), {
  ssr: false,
})

export default function Home() {
  return (
    <div className={`min-h-screen bg-gray-50 relative`}>
      <NavigationBar />
      {/* Background container */}
      <div
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url('/carte.jpg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <main className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Moroccan Tax Calculator 2025</h1>

          <Suspense fallback={<div>Loading...</div>}>
            <DynamicHomeContent />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

