import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Post } from "@/types";

interface PostDialogProps {
  post: Post | null;
  onClose: () => void;
}

export default function PostDialog({ post, onClose }: PostDialogProps) {
  if (!post) return null;

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="flex items-center mb-4">
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.author.username}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <span className="text-sm text-gray-500">
              {post.author.username}
            </span>
          </div>
          <p className="text-gray-700 mb-6">{post.content}</p>
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment._id} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold text-sm">{comment.user.username}</p>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
