import { ConfirmDialog } from "@/components/shared/Posts/confirm-dialog";
import { EditPostModal } from "@/components/shared/Posts/edit-post-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useUserStore from "@/stores/setUserStore";
import { Edit, Heart, MessageCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { Comment, Post, Role } from "../../../types";
import { randomAvatarUrl } from "@/utils/functions";
import img from "../../../assets/hilaAndYoav.jpg";

interface PostProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: Comment) => void;
  onEdit: (updatedPost: Post) => void;
  onDelete: (postId: string) => void;
  onCommentLike: (postId: string, commentId: string) => void;
  showEditDelete?: boolean;
}

export default function PostCard({
  post,
  onLike,
  onComment,
  onEdit,
  onDelete,
  onCommentLike,
  showEditDelete = false
}: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const currentUser = useUserStore();

  const handleLike = () => {
    onLike(post._id);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        _id: Date.now().toString(),
        author: {
          _id: currentUser._id,
          name: currentUser.username,
          avatar:
            currentUser.role === Role.Volunteer
              ? currentUser.volunteer?.imageUrl ?? randomAvatarUrl()
              : currentUser.organization?.imageUrl ?? randomAvatarUrl(),
          type: currentUser.role === Role.Volunteer ? "user" : "organization"
        },
        content: newComment.trim(),
        createdAt: new Date().toISOString(),
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

  const handleCommentLike = (commentId: string) => {
    onCommentLike(post._id, commentId);
  };

  const isCurrentUserPost = post.author._id === currentUser._id;

  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 mb-6"
      style={{ display: "flex" }}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={post.author.avatar ?? randomAvatarUrl()}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">{post.author.name}</h3>
              <h4 className="text-gray-600">{post.title}</h4>
              <span className="text-sm text-gray-500">{post.author.type}</span>
            </div>
          </div>
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
        <p className="text-gray-800 mb-4">{post.content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.skills.map((skill) => (
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
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </Button>
        </div>
        {showComments && (
          <div className="mt-4 space-y-4">
            {post.comments.map((comment) => (
              <div key={comment._id} className="bg-gray-50 p-3 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      width={24}
                      height={24}
                      className="rounded-full mr-2"
                    />
                    <span className="font-semibold text-sm">
                      {comment.author.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCommentLike(comment._id)}
                  className="flex items-center space-x-1"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      comment.likes > 0 ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="text-xs">{comment.likes}</span>
                </Button>
              </div>
            ))}
            <form onSubmit={handleAddComment} className="mt-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="mb-2"
              />
              <Button type="submit" size="sm">
                Add Comment
              </Button>
            </form>
          </div>
        )}
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
      <div style={{ width: "50%" }}>
        <img
          src={img}
          alt={post.author.name}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
