import { AddPostButton } from "@/components/home/addPostButton";
import { NoPostsScreen } from "@/components/emptyState/noPosts";
import PostCard from "@/components/shared/Posts/post";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/home/sidebar";
import usePostsStore from "../../stores/setPostsStore";
import {
  ApiComment,
  ApiPost,
  Comment,
  IdName,
  Post,
  reqApiPost,
  Role,
  User,
} from "../../types";
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
import PostDialog from "@/components/shared/Posts/comments-dialog";

const POSTS_PER_LOAD = 5;

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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      if (loading) return;
      setLoading(true);
      try {
<<<<<<< HEAD
        const response = await getPosts(
          skip,
          POSTS_PER_LOAD,
          filters.postType,
          filters.skillsIds
        );
        if (response.d.status === 200) {
          const fetchedPosts = await response.d.data;

          // Only append posts if not the initial load (page > 1)
          if (page === 1) {
            setPosts(fetchedPosts);
          } else {
            setPosts([...posts, ...fetchedPosts]);
          }

          setHasMore(response.hasMore);
          setSkip((prevSkip) => prevSkip + POSTS_PER_LOAD);
=======
        const response = await getPosts();
        if (response.status === 200) {
          const fetchedPosts = await response.data;
          setPosts(fetchedPosts);
          console.log(fetchedPosts);
>>>>>>> 7b2350aa92576e23f3ef3675670c840ea8431e39
        } else {
          console.error("Failed to fetch posts:", response.d.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    fetchPosts();
  }, [page, filters]); // Removed setPosts and posts dependencies to avoid infinite loops
=======
  const sortedPosts = [...posts].sort(
    (a, b) => b.likes.length - a.likes.length
  );
>>>>>>> 7b2350aa92576e23f3ef3675670c840ea8431e39

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
<<<<<<< HEAD
        likes: 0,
=======
        likes: [],
>>>>>>> 7b2350aa92576e23f3ef3675670c840ea8431e39
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
            comments: updatedComments,
          };
        }
        return prevPost;
      });
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

  return (
    <main className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Feed</h1>
        <div className="flex gap-8">
          <div className="w-1/4">
            <Sidebar onFilterChange={setFilters} />
          </div>
          <div className="w-3/4">
            <div className="space-y-6">
              {posts?.map((post: Post, index: number) => {
                if (posts.length === index + 1) {
                  return (
                    <div key={post._id} ref={lastPostElementRef}>
                      <PostCard
                        post={post}
                        onLike={handleLikePost}
                        onComment={handleAddComment}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        showEditDelete={true}
                        setSelectedPost={setSelectedPost}
                      />
                    </div>
                  );
                } else {
                  return (
                    <PostCard
                      key={post._id}
                      post={post}
                      onLike={handleLikePost}
                      onComment={handleAddComment}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePost}
                      showEditDelete={true}
                      setSelectedPost={setSelectedPost}
                    />
                  );
                }
              })}
            </div>
            {selectedPost && (
              <PostDialog
                onClose={() => setSelectedPost(null)}
                post={selectedPost}
                onCommentLike={handleLikeComment}
              />
            )}
<<<<<<< HEAD
            {loading && (
              <div className="text-center mt-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <div className="text-center text-gray-500 mt-6">
                No more posts to load.
              </div>
            )}
            {posts.length === 0 && !loading && (
              <div className="text-center text-gray-500 mt-6">
                no posts exsits, be the first one to post something!
=======
            {paginatedPosts.length > 0 ? (
              <div
                className="mt-8 flex justify-center"
                style={{ cursor: "pointer" }}>
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
                          onClick={() => setCurrentPage(index + 1)}>
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
>>>>>>> 7b2350aa92576e23f3ef3675670c840ea8431e39
              </div>
            )}
          </div>
        </div>
      </div>
      <AddPostButton onAddPost={handleAddPost} />
      <Toaster></Toaster>
    </main>
  );
}
