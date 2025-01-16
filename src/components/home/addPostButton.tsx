import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CustomSelect from "@/components/shared/customSelect";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUserStore from "@/stores/setUserStore";
import { Post, Role } from "@/types";
import { Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ImageUpload } from "./imageUpload";
import useSkillsStore from "@/stores/setSkillsStore";

interface AddPostButtonProps {
  onAddPost: (post: Post) => void;
}

export function AddPostButton({ onAddPost }: AddPostButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const skills = useSkillsStore((state) => state.skills);

  const currentUser = useUserStore();

  const handleSkillsChange = (value: string) => {
    setSelectedSkills((prev) =>
      prev.includes(value)
        ? prev.filter((skill) => skill !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    const selectedSkillsObjects =
      selectedSkills?.map((id) => skills.find((skill) => skill._id === id)) ??
      [];
    const filteredSelectedSkills = selectedSkillsObjects.filter(
      (selectedSkill) => selectedSkill !== undefined
    );

    event.preventDefault();
    const newPost: Post = {
      _id: Date.now().toString(),
      author: {
        _id: currentUser._id,
        name: currentUser.username,
        avatar:
          currentUser.role === Role.Volunteer
            ? currentUser.volunteer?.imageUrl
            : currentUser.organization?.imageUrl,
        type:
          currentUser.role === Role.Volunteer ? "volunteer" : "organization",
      },
      imageUrl: image,
      title,
      content,
      skills: filteredSelectedSkills,
      comments: [],
      likes: 0,
    };
    onAddPost(newPost);
    setImage("");
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedSkills([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-description="edit-post" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">
              {currentUser.role === Role.Organization
                ? "Requirements"
                : "Skills"}
            </Label>
            <ScrollArea className="rounded-md ">
              <CustomSelect
                options={skills}
                selectedOptions={selectedSkills}
                onChange={handleSkillsChange}
              />
            </ScrollArea>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">image</Label>
            <Card>
              <CardContent className="pt-6">
                <ImageUpload preview={image} setPreview={setImage} />
              </CardContent>
            </Card>
          </div>
          <Button type="submit">Create Post</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
