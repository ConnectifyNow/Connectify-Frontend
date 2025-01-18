import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUserStore from "@/stores/setUserStore";
import { Post, Role } from "@/types";
import { Heart } from "lucide-react";

interface PostDialogProps {
  post: Post | null;
  onClose: () => void;
  onCommentLike: (postId: string, userId: string, commentId: string) => void;
}

export default function PostDialog({
  post,
  onClose,
  onCommentLike
}: PostDialogProps) {
  const currentUser = useUserStore();

  if (!post) return null;

  const handleCommentLike = (commentId: string) => {
    onCommentLike(post._id, currentUser._id, commentId);
  };

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="flex items-center mb-4">
            <img
              src={post.imageUrl}
              alt={post.author.username}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <span className="text-sm text-gray-500">
              {post.author.username}
            </span>
          </div>
          {post.comments.length > 0 ? (
            <>
              <p className="text-gray-700 mb-6">{post.content}</p>
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <div className="space-y-4">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  {post.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-gray-100 p-3 rounded-lg my-1"
                    >
                      <div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <img
                                src={
                                  comment.user.role === Role.Volunteer
                                    ? comment.user.volunteer?.imageUrl
                                    : comment.user.organization?.imageUrl
                                }
                                alt={comment.user.username}
                                width={24}
                                height={24}
                                className="rounded-full mr-2"
                              />
                              <span className="font-semibold text-sm">
                                {comment.user.role === Role.Volunteer
                                  ? `${comment.user.volunteer?.firstName} ${comment.user.volunteer?.lastName}`
                                  : comment.user.organization?.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.date).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{comment.text}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          handleCommentLike(comment._id);
                        }}
                        className="flex items-center space-x-1"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            comment.likes.length > 0
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                        <span className="text-xs">{comment.likes.length}</span>
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold mb-2">
              No comments on this post
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
