import { NoPostsScreen } from "@/components/emptyState/noPosts";
import PostDialog from "@/components/shared/Posts/comments-dialog";
import {
  addCommentToPost,
  deletePostApi,
  getUserPosts,
  likeCommentApi,
  likePostApi,
  updatePostApi
} from "@/services/postService";
import { ApiComment, Comment, Post as PostType } from "@/types";
import { useEffect, useState } from "react";
import usePostsStore from "../../../stores/setPostsStore";
import useUserStore from "../../../stores/setUserStore";
import Post from "../../shared/Posts/post";

export default function PostsList() {
  const {
    userPosts,
    likePost,
    addComment,
    updatePost,
    deletePost,
    likeComment,
    setUserPosts
  } = usePostsStore();
  const currentUser = useUserStore();
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getUserPosts(currentUser._id);
        if (response?.status === 200) {
          const fetchedPosts = await response.data;
          setUserPosts(fetchedPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  const handleAddComment = async (postId: string, comment: ApiComment) => {
    const response = await addCommentToPost(postId, comment);
    comment._id = response.data._id;
    addComment(postId, comment);

    if (response.status !== 201) {
      console.error("Failed to add comment:", response.statusText);
    }
  };

  const handleLikeComment = async (
    postId: string,
    userId: string,
    commentId: string
  ) => {
    const response = await likeCommentApi(userId, commentId);

    if (response.status === 200) {
      likeComment(postId, commentId);
      const updatedComments: Comment[] =
        selectedPost?.comments.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, likes: response.data.likes };
          }
          return comment;
        }) ?? [];

      setSelectedPost((prevPost) => {
        if (prevPost) {
          return {
            ...prevPost,
            comments: updatedComments
          };
        }
        return prevPost;
      });
    } else if (response.status === 500) {
      console.error("Failed to like comment:", response.statusText);
    }
  };

  const handleEditPost = async (post: PostType) => {
    const postToUpdate = {
      _id: post._id,
      user: post.author._id,
      title: post.title,
      content: post.content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      skills: post.skills.map((skill: any) => skill._id),
      imageUrl: post.imageUrl
    };

    const response = await updatePostApi(postToUpdate);

    if (response.status === 200) {
      updatePost(post);
    } else {
      console.error("Failed to update post:", response.statusText);
    }
  };

  const handleLikePost = async (postId: string, userId: string) => {
    const response = await likePostApi(postId, userId);

    if (response.status === 200) {
      likePost(postId);
    } else if (response.status === 500) {
      console.error("Failed to like post:", response.statusText);
    }
  };

  const handleDeletePost = async (postId: string) => {
    deletePost(postId);

    const response = await deletePostApi(postId);

    if (response.status === 200) {
      deletePost(postId);
    } else {
      console.error("Failed to delete post:", response.statusText);
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
                  onLike={handleLikePost}
                  onComment={handleAddComment}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
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
