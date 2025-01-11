import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/index";
import { Skill } from "@/types/index";

interface EditPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPost: Post) => void;
}

export function EditPostModal({
  post,
  isOpen,
  onClose,
  onSave,
}: EditPostModalProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [skills, setSkills] = useState(post.skills.join(", "));

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setSkills(post.skills.join(", "));
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPost: Post = {
      ...post,
      title,
      content,
      skills: skills
        .split(",")
        .map((skill) => ({ name: skill.trim() } as Skill)),
    };
    onSave(updatedPost);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-content">Content</Label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-skills">
              Skills/Requirements (comma-separated)
            </Label>
            <Input
              id="edit-skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
