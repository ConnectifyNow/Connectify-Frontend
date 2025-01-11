import { useState } from "react";
import { posts } from "../../data/posts";
import { posts as initialPosts } from "../../data/posts";
import { Post as PostType, Comment } from "../../types";
import { AddPostButton } from "@/components/home/addPostButton";
import Post from "../../components/home/post";
import Sidebar from "../../components/home/sidebar";

export default function Home() {
  const [filters, setFilters] = useState({
    postType: "all",
    skillsIds: [] as number[],
  });

  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  const handleAddPost = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId: string, comment: Comment) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

  const filteredPosts = sortedPosts.filter((post) => {
    const typeMatch =
      filters.postType === "all" || post.author.type === filters.postType;
    const skillsMatch =
      filters.skillsIds.length === 0 ||
      filters.skillsIds.some((skillId) =>
        post.skills.map((skill) => skill.id).includes(skillId)
      );
    return typeMatch && skillsMatch;
  });

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
                <Post
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddPostButton onAddPost={handleAddPost} />
    </main>
  );
}
