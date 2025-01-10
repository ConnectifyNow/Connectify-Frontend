import { Post } from '../../data/posts'

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-lg">{post.author.name}</h3>
          <h4 className="text-gray-600">{post.title}</h4>
          <span className="text-sm text-gray-500">{post.author.type === 'user' ? 'Volunteer' : 'Association'}</span>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{post.content}</p>
      <div className="flex flex-wrap gap-2">
        {post.skills.map((skill) => (
          <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

