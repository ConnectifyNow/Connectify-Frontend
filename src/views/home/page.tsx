import { useState } from 'react'
import { Post as PostType } from '../../types'
import { posts } from '../../data/posts'
import Post from '../../components/homePage/post'
import Sidebar from '../../components/homePage/sidebar'

export default function Home() {
  const [filters, setFilters] = useState({ postType: 'all', skills: [] as string[] })

  const filteredPosts = posts.filter((post) => {
    const typeMatch = filters.postType === 'all' || post.author.type === filters.postType
    const skillsMatch = filters.skills.length === 0 || filters.skills.some(skill => post.skills.includes(skill))
    return typeMatch && skillsMatch
  })

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Feed</h1>
        <div className="flex gap-8">
          <div className="w-1/4">
            <Sidebar onFilterChange={setFilters} />
          </div>
          <div className="w-3/4">
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}