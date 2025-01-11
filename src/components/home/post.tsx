import { randomAvatarUrl } from "@/utils/functions";
import { useState } from "react";
import { Heart, MessageCircle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Post, Comment, Role } from "../../types";
import useUserStore from "@/stores/setUserStore";

interface PostProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: Comment) => void;
}

export default function PostCard({ post, onLike, onComment }: PostProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const currentUser = useUserStore()

  const handleLike = () => {
    onLike(post.id)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          id: currentUser.id,
          name: currentUser.username,
          avatar: currentUser.role === Role.Volunteer ? currentUser.volunteer?.imageUrl : currentUser.organization?.imageUrl,
          type: currentUser.role === Role.Volunteer ? "user" : "organization"
        },        content: newComment.trim(),
        createdAt: new Date().toISOString(),
      }
      onComment(post.id, comment)
      setNewComment('')
    }
  }
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
          <span className="text-sm text-gray-500">{post.author.type}</span>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{post.content}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.skills.map((skill) => (
          <span key={skill.id} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {skill.name}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center space-x-1">
          <Heart className={`w-5 h-5 ${post.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          <span>{post.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1">
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments.length}</span>
        </Button>
      </div>
      {showComments && (
        <div className="mt-4 space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded">
              <div className="flex items-center mb-2">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                <span className="font-semibold text-sm">{comment.author.name}</span>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
          ))}
          <form onSubmit={handleAddComment} className="mt-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="mb-2"
            />
            <Button type="submit" size="sm">Add Comment</Button>
          </form>
        </div>
      )}
    </div>
  )
}
