/* eslint-disable react-hooks/exhaustive-deps */
import { AddPostButton } from "@/components/home/addPostButton";
import { NoPostsScreen } from "@/components/noPosts/noPosts";
import PostCard from "@/components/shared/Posts/post";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import Sidebar from "../../components/home/sidebar";
import usePostsStore from "../../stores/setPostsStore";
import { ApiComment, IdName, Post, reqApiPost, Role, User } from "../../types";
import { Toaster } from "@/components/ui/toaster";
import {
  addCommentToPost,
  createPost,
  deletePostApi,
  getPosts,
  likeCommentApi,
  likePostApi,
  updatePostApi,
} from "@/services/postService";
import useUserStore from "@/stores/setUserStore";
import useSkillsStore from "@/stores/setSkillsStore";

const POSTS_PER_PAGE = 3;

export default function Home() {
  const {
    posts,
    likePost,
    setPosts,
    updatePost,
    deletePost,
    addComment,
    likeComment,
    addPost,
  } = usePostsStore();
  const [filters, setFilters] = useState({
    postType: "all",
    skillsIds: [] as string[],
  });
  const user = useUserStore();
  const getSkillById = useSkillsStore((state) => state.getSkillById);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        if (response.status === 200) {
          const fetchedPosts = await response.data;
          setPosts(fetchedPosts);
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

  const handleAddPost = async (post: reqApiPost) => {
    const response = await createPost({
      title: post.title,
      content: post.content,
      user: post.user,
      skills: post.skills,
      imageUrl: post.imageUrl,
    });

    if (response.status === 201) {
      const skills = post.skills
        .map((skillId) => getSkillById(skillId))
        .filter((skill) => skill !== undefined) as IdName[];

      const newPost: Post = {
        _id: response.data._id,
        author: user as User,
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        skills,
        comments: [],
        likes: 0,
      };

      addPost(newPost);
    } else {
      console.error("Failed to create post:", response.statusText);
    }
  };

  const handleEditPost = async (post: Post) => {
    const postToUpdate = {
      _id: post._id,
      user: post.author._id,
      title: post.title,
      content: post.content,
      skills: post.skills.map((skill) => skill._id),
      imageUrl: post.imageUrl,
    };

    const response = await updatePostApi(postToUpdate);

    if (response.status === 200) {
      updatePost(post);
    } else {
      console.error("Failed to update post:", response.statusText);
    }
  };

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
    } else if (response.status === 500) {
      console.error("Failed to like comment:", response.statusText);
    }
  };

  const handleLikePost = async (postId: string, userId: string) => {
    const response = await likePostApi(postId, userId);

    if (response.status === 200) {
      likePost(postId); //increment state
    } else if (response.status === 500) {
      console.error("Failed to like post:", response.statusText);
    }
  };

  const handleDeletePost = async (postId: string) => {
    deletePost(postId); // delete from state

    const response = await deletePostApi(postId); // delete from API

    if (response.status === 200) {
      // toast({
      //   description: "Post deleted successfully!",
      // });
    } else {
      console.error("Failed to delete post:", response.statusText);
    }
  };

  const filteredPosts = sortedPosts.filter((post) => {
    const isAllPosts = filters.postType === "all";
    const isMyPosts = filters.postType === "my" && post.author._id === user._id;

    const typeMatch =
      isAllPosts ||
      Role[post.author.role].toLowerCase() === filters.postType ||
      isMyPosts;
    const skillsMatch: boolean =
      filters.skillsIds.length === 0 ||
      filters.skillsIds.some((skillId: string) =>
        post.skills
          ?.map((skill: { _id: string }) => skill._id)
          .includes(skillId)
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
              {paginatedPosts?.map((post: Post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLikePost}
                  onComment={handleAddComment}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  onCommentLike={handleLikeComment}
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
                    {[...Array(totalPages)]?.map((_, index) => (
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
