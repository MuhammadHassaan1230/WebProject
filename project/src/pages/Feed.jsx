import React from 'react'
import Sidebar from '../components/feed/Sidebar'
import Feed from '../components/feed/Feed'
import Recommendation from '../components/feed/Recommendation'

export default function () {
  return (
    <div className="bg-gray-100 min-h-screen">
     
      <main className="pt-20 px-4">
        <div className="max-w-6xl mx-auto flex gap-6">
          <div className="w-1/4">
            <Sidebar />
          </div>
          <div className="flex-1">
            <Feed />
          </div>
          <div className="w-1/4">
            <Recommendation />
          </div>
        </div>
      </main>
    </div>
  )
}
