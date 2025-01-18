import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCitiesStore from "@/stores/setCitiesStore";
import { Volunteer } from "@/types";

interface VolunteerProfileDialogProps {
  user: Volunteer | null;
  onClose: () => void;
  onChatClick: (userId: string) => void;
}

export default function VolunteerProfileDialog({
  user,
  onClose,
  onChatClick,
}: VolunteerProfileDialogProps) {
  if (!user) return null;

  const cities = useCitiesStore((state) => state.cities);
  const ProfileDataCity = cities?.find((city) => city._id === user.city);

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Volunteer Profile</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col items-center">
          <img
            src={user.imageUrl || "/placeholder.svg"}
            alt={`${user.firstName} ${user.lastName}`}
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-center mb-4">{user.about}</p>
          <p>{`Phone number: ${user.phone}`}</p>
          <p
            style={{ marginBottom: "20px" }}
          >{`City: ${ProfileDataCity?.name}`}</p>
          <Button onClick={() => onChatClick(user.userId)} className="w-full">
            Chat with {`${user.firstName} ${user.lastName}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
