import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCitiesStore from "@/stores/setCitiesStore";
import { Organization } from "@/types";

interface OrganizationProfileDialogProps {
  user: Organization | null;
  onClose: () => void;
  onChatClick: (userId: string) => void;
}

export default function OrganizationProfileDialog({
  user,
  onClose,
  onChatClick,
}: OrganizationProfileDialogProps) {
  if (!user) return null;
  const cities = useCitiesStore((state) => state.cities);
  const ProfileDataCity = cities?.find((city) => city._id === user.city);

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Organization Profile</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col items-center">
          <img
            src={user.imageUrl || "/placeholder.svg"}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-center mb-4">{user.description}</p>
          <p>{`Website link: ${user.websiteLink}`}</p>
          <p
            style={{ marginBottom: "20px" }}
          >{`City: ${ProfileDataCity?.name}`}</p>
          <Button onClick={() => onChatClick(user.userId)} className="w-full">
            Chat with {user.name}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
