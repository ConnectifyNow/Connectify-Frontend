import { ImageUpload } from "@/components/home/imageUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useSkillsStore from "@/stores/setSkillsStore";
import { Post, Skill } from "@/types/index";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";

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
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [image, setImage] = useState("");
  const skills = useSkillsStore((state) => state.skills);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setSelectedSkills(post.skills);
    setImage(post.imageUrl);
  }, [post]);

  const handleSkillsChange = (skill: Skill) => {
    setSelectedSkills(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((selectedskill) => selectedskill !== skill)
        : [...selectedSkills, skill]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedPost: Post = {
      ...post,
      title,
      content,
      skills: selectedSkills,
      imageUrl: image,
    };
    onSave(updatedPost);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby="edit-post"
        className="sm:max-w-[425px]"
        style={{ maxHeight: "100vh", overflowY: "auto" }}>
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
            <ScrollArea className="rounded-md ">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {skills?.map((skill: { _id: string; name: string }) => (
                    <Button
                      className="bg-green-600 hover:bg-green-700 hover:shadow-md"
                      key={skill._id}
                      type="button"
                      variant={
                        selectedSkills.includes(skill) ? "default" : "outline"
                      }
                      onClick={() => handleSkillsChange(skill)}>
                      {skill.name}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
          <div>
            <Label htmlFor="edit-image">image</Label>
            <Card>
              <CardContent className="pt-6">
                <ImageUpload preview={image} setPreview={setImage} />
              </CardContent>
            </Card>
          </div>
          <Button
            className="bg-blue-900 hover:bg-blue-900 hover:shadow-md"
            type="submit">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
