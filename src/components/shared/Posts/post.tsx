import { ConfirmDialog } from "@/components/shared/Posts/confirm-dialog";
import { EditPostModal } from "@/components/shared/Posts/edit-post-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useUserStore from "@/stores/setUserStore";
import { Edit, Heart, MessageCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { ApiComment, Post, Role } from "../../../types";

interface PostProps {
  post: Post;
  onLike: (postId: string, userId: string) => void;
  onComment: (postId: string, comment: ApiComment) => void;
  onEdit: (updatedPost: Post) => void;
  onDelete: (postId: string) => void;
  onCommentLike: (postId: string, userId: string, commentId: string) => void;
  showEditDelete?: boolean;
  setSelectedPost: (selectedPost: Post) => void;
}

export default function PostCard({
  post,
  onLike,
  onComment,
  onEdit,
  onDelete,
  showEditDelete = false,
  setSelectedPost
}: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const currentUser = useUserStore();
  const handleLike = () => {
    onLike(post._id, currentUser._id);
  };

  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (newComment.trim()) {
      const comment: ApiComment = {
        _id: Date.now().toString(),
        user: currentUser._id,
        text: newComment.trim(),
        post: post._id,
        date: new Date().toISOString(),
        likes: 0
      };
      onComment(post._id, comment);
      setNewComment("");
    }
  };

  const handleDelete = () => {
    onDelete(post._id);
    setIsDeleteDialogOpen(false);
  };

  // const handleCommentLike = (commentId: string) => {
  //   onCommentLike(post._id, currentUser._id, commentId);
  // };

  const isCurrentUserPost = post.author._id === currentUser._id;
  const imagePath =
    post.author.role === Role.Volunteer
      ? post.author.volunteer?.imageUrl
      : post.author.organization?.imageUrl;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div style={{ display: "flex" }}>
        <div style={{ width: "60%" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={imagePath}
                alt={post.author.username}
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {post.author.username}
                </h3>
                <h4 className="text-gray-600">{post.title}</h4>
                <span className="text-sm text-gray-500">
                  {post.author.role === Role.Volunteer
                    ? "Volunteer"
                    : "Organization"}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-800 mb-4">{post.content}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.skills?.map((skill) => (
              <span
                key={skill._id}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-1"
            >
              <Heart
                className={`w-5 h-5 ${
                  post.likes > 0 ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowComments(!showComments);
                setSelectedPost(post);
              }}
              className="flex items-center space-x-1"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </Button>
          </div>

          {showEditDelete && (
            <>
              <EditPostModal
                post={post}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={onEdit}
              />
              <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Post"
                description="Are you sure you want to delete this post? This action cannot be undone."
              />
            </>
          )}
        </div>
        <div style={{ width: "40%" }}>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.author.username}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </div>
      <form onSubmit={handleAddComment} className="mt-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mb-2 bg-blue-50"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="submit"
            size="sm"
            className="bg-blue-900 hover:bg-blue-900 hover:shadow-md"
          >
            Add Comment
          </Button>
          {showEditDelete && isCurrentUserPost && (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
