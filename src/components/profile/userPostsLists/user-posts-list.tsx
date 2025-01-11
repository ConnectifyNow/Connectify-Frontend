import { usePostsStore } from '../../../stores/postsStore'
import useUserStore from '../../../stores/setUserStore'
import Post from '../../shared/Posts/post'

export default function PostsList() {
  const { posts, likePost, addComment, updatePost, deletePost, likeComment } = usePostsStore()
    const currentUser = useUserStore()

  const userPosts = posts.filter(post => post.author.id === currentUser.id)
  //TODO: get posts by user id
  console.log(userPosts)
  
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Posts</h1>
        <div className="space-y-6">
          {userPosts.map((post) => (
            <Post 
              key={post.id} 
              post={post} 
              onLike={likePost}
              onComment={addComment}
              onEdit={updatePost}
              onDelete={deletePost}
              onCommentLike={likeComment}
              showEditDelete={true}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

