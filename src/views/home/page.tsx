import { AddPostButton } from "@/components/home/addPostButton";
import { NoPostsScreen } from "@/components/noPosts/noPosts";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";
import Post from "../../components/home/post";
import Sidebar from "../../components/home/sidebar";
import { usePostsStore } from "../../stores/postsStore";
import { Post as PostType } from "../../types";

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

  const [filters, setFilters] = useState({
    postType: "all",
    skillsIds: [] as number[],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

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
            {paginatedPosts.length > 0 ? (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <Pagination.Content>
                    <Pagination.Item>
                      <Pagination.Previous
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={currentPage === 1 ? "disabled" : ""}
                      />
                    </Pagination.Item>
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item key={index}>
                        <Pagination.Link
                          isActive={currentPage === index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Link>
                      </Pagination.Item>
                    ))}
                    <Pagination.Item>
                      <Pagination.Next
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        className={currentPage === totalPages ? "disabled" : ""}
                      />
                    </Pagination.Item>
                  </Pagination.Content>
                </Pagination>
              </div>
            ) : (
              <NoPostsScreen />
            )}
          </div>
        </div>
      </div>
      <AddPostButton onAddPost={addPost} />
    </main>
  );
}
