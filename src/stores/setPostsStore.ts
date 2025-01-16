import { create } from "zustand";
import { Post,ApiComment, ApiPost } from "../types";
import useSkillsStore from "./setSkillsStore";

interface PostsStore {
  posts: Post[];
  apiPosts: ApiPost[];
  setPosts: (posts: ApiPost[]) => void;
  addPost: (post: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: ApiComment) => void;
  likeComment: (postId: string, commentId: string) => void;
}

const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  apiPosts: [],
  setPosts: (apiPosts) => {
    const { getSkillById } = useSkillsStore.getState();
    const posts = apiPosts.map((apiPost) => {
      const skills = apiPost.requiredSkills.map((skill) => getSkillById(skill));
      const filteredSkills = skills.filter((skill) => skill !== undefined);

      return {
        _id: apiPost._id,
        author: apiPost.user,
        content: apiPost.content,
        title: apiPost.title,
        likes: apiPost.likes.length,
        skills: filteredSkills,
        comments: apiPost.comments,
        imageUrl: apiPost.imageUrl,
      };
    });
    set(() => ({ apiPosts, posts }));
  },
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (updatedPost) =>
    set((state) => ({
      posts: state.posts?.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      ),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
    })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts?.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts?.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [...post.comments, comment],
            }
          : post
      ),
    })),
  likeComment: (postId, commentId) =>
    set((state) => ({
      posts: state.posts?.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments?.map((comment) =>
                comment._id === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              ),
            }
          : post
      ),
    })),
}));

export default usePostsStore;
