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
import { Post, Skill } from "@/types/index";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CustomSelect from "@/components/shared/customSelect";
import useSkillsStore from "@/stores/setSkillsStore";

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
  const skills = useSkillsStore((state) => state.skills);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setSelectedSkills(post.skills);
  }, [post]);

  const handleSkillsChange = (skill: Skill) => {
    setSelectedSkills(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((selectedskill) => selectedskill !== skill)
        : [...selectedSkills, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPost: Post = {
      ...post,
      title,
      content,
      skills: selectedSkills,
    };
    onSave(updatedPost);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="edit-post" className="sm:max-w-[425px]">
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
          <div>
            <Label htmlFor="edit-skills">Skills</Label>
            <ScrollArea className="h-32 rounded-md ">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {skills?.map((skill: { _id: string; name: string }) => (
                    <Button
                      key={skill._id}
                      type="button"
                      variant={
                        selectedSkills.includes(skill) ? "default" : "outline"
                      }
                      onClick={() => handleSkillsChange(skill)}
                    >
                      {skill.name}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
