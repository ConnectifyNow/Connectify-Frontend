import { create } from "zustand";
import { posts as initialPosts } from "../data/posts";
import { Post, Comment } from "../types";

interface PostsStore {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  likeComment: (postId: string, commentId: string) => void;
}

const usePostsStore = create<PostsStore>((set) => ({
  posts: initialPosts,
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId)
    })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    })),
  likeComment: (postId, commentId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment._id === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              )
            }
          : post
      )
    }))
}));

export default usePostsStore;
