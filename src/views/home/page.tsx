import { AddPostButton } from "@/components/home/addPostButton";
import { NoPostsScreen } from "@/components/noPosts/noPosts";
import { useState } from "react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "../../components/home/sidebar";
import { usePostsStore } from "../../stores/postsStore";
import { Post as PostType } from "../../types";
import PostCard from "@/components/shared/Posts/post";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createPost, likePostApi, getPosts } from "@/services/postService";
import { Toaster } from "@/components/ui/toaster";
const POSTS_PER_PAGE = 3;

export default function Home() {
  const {
    posts,
    likePost,
    addComment,
    addPost,
    updatePost,
    deletePost,
    likeComment,
  } = usePostsStore();

  const { toast } = useToast();

  const [filters, setFilters] = useState({
    postType: "all",
    skillsIds: [] as number[],
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        if (response.status === 200) {
          const fetchedPosts = await response.data;
          usePostsStore.setState({ posts: fetchedPosts });
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

  const handleAddPost = async (post: PostType) => {
    addPost(post); // add to State

    const response = await createPost({
      title: post.title,
      content: post.content,
      userId: post.author.id,
      requiredSkills: post.skills.map((skill) => skill.id),
    }); // add to API

    if (response.status === 201) {
      toast({
        description: "Post created successfully!",
      });
    } else {
      console.error("Failed to create post:", response.statusText);
    }
  };

  const handleLikePost = async (postId: string, userId: string) => {
    likePost(postId);

    const response = await likePostApi(postId, userId);

    console.log(response);
    if (response.status !== 200) {
      console.error("Failed to like post:", response.statusText);
    }
  };

  const filteredPosts = sortedPosts.filter((post) => {
    const typeMatch =
      filters.postType === "all" || post.author.type === filters.postType;
    const skillsMatch: boolean =
      filters.skillsIds.length === 0 ||
      filters.skillsIds.some((skillId: number) =>
        post.skills.map((skill: { id: number }) => skill.id).includes(skillId)
      );
    return typeMatch && skillsMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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
              {paginatedPosts.map((post: PostType) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onComment={addComment}
                  onEdit={updatePost}
                  onDelete={deletePost}
                  onCommentLike={likeComment}
                  showEditDelete={true}
                />
              ))}
            </div>
            {paginatedPosts.length > 0 ? (
              <div
                className="mt-8 flex justify-center"
                style={{ cursor: "pointer" }}
              >
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={currentPage === 1 ? "disabled" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={currentPage === index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        className={currentPage === totalPages ? "disabled" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            ) : (
              <NoPostsScreen role={""} />
            )}
          </div>
        </div>
      </div>
      <AddPostButton onAddPost={handleAddPost} />
      <Toaster></Toaster>
    </main>
  );
}
