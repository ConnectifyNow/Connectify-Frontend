import { create } from "zustand";
import { Post, ApiComment, ApiPost, Comment } from "../types";
import useSkillsStore from "./setSkillsStore";
import useUserStore from "./setUserStore";

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
      const skills = apiPost.skills.map((skill) => getSkillById(skill));
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
  likePost: (postId) => {
    set((state) => ({
      posts: state.posts?.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    }));
  },
  addComment: (postId, apiComment) => {
    const user = useUserStore.getState();
    const comment: Comment = {
      ...apiComment,
      user,
      likes: [],
    };

    set((state) => ({
      posts: state.posts?.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [...post.comments, comment],
            }
          : post
      ),
    }));
  },
  likeComment: (postId, commentId) => {
    console.log({ postId });

    const userId = useUserStore.getState()._id;
    set((state) => ({
      posts: state.posts?.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments?.map((comment) =>
                comment._id === commentId
                  ? { ...comment, likes: [...comment.likes, userId] }
                  : comment
              ),
            }
          : post
      ),
    }));
  },
}));

export default usePostsStore;
