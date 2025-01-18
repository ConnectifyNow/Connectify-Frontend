import { NoPostsScreen } from "@/components/noPosts/noPosts";
import { useState } from "react";
import usePostsStore from "../../../stores/setPostsStore";
import useUserStore from "../../../stores/setUserStore";
import Post from "../../shared/Posts/post";
import { Post as PostType } from "@/types";
import PostDialog from "@/components/shared/Posts/comments-dialog";
import { likeCommentApi } from "@/services/postService";

export default function PostsList() {
  const { posts, likePost, addComment, updatePost, deletePost, likeComment } =
    usePostsStore();
  const currentUser = useUserStore();
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const userPosts = posts.filter((post) => post.author._id === currentUser._id);

  const handleLikeComment = async (
    postId: string,
    userId: string,
    commentId: string
  ) => {
    const response = await likeCommentApi(userId, commentId);

    if (response.status === 200) {
      likeComment(postId, commentId);
      const updatedComments: any =
        selectedPost?.comments.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, likes: response.data.likes };
          }
          return comment;
        }) ?? [];

      setSelectedPost((prevPost: any) => {
        if (prevPost) {
          return {
            ...prevPost,
            comments: updatedComments,
          };
        }
        return prevPost;
      });
    } else if (response.status === 500) {
      console.error("Failed to like comment:", response.statusText);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Posts</h1>
        <div className="space-y-6">
          {userPosts.length > 0 ? (
            <>
              {userPosts?.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  onLike={likePost}
                  onComment={addComment}
                  onEdit={updatePost}
                  onDelete={deletePost}
                  showEditDelete={true}
                  setSelectedPost={setSelectedPost}
                />
              ))}
              {selectedPost && (
                <PostDialog
                  onClose={() => setSelectedPost(null)}
                  post={selectedPost}
                  onCommentLike={handleLikeComment}
                />
              )}
            </>
          ) : (
            <NoPostsScreen role={""} />
          )}
        </div>
      </div>
    </main>
  );
}
