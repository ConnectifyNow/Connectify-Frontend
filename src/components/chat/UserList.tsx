import { useState } from "react";
import { User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User as UserItem } from "@/types";
import "./UserList.css";

interface UserListProps {
  users: UserItem[];
  onSelectUser: (user: UserItem) => void;
}

export default function UserList({ users, onSelectUser }: UserListProps) {
  const [filter, setFilter] = useState<"all" | "volunteers" | "organizations">(
    "all"
  );

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    if (filter === "volunteers") return !user.role;
    if (filter === "organizations") return user.role;
  });

  return (
    <div className="w-64 border-r h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === "volunteers" ? "default" : "outline"}
            onClick={() => setFilter("volunteers")}
          >
            Volunteers
          </Button>
          <Button
            size="sm"
            variant={filter === "organizations" ? "default" : "outline"}
            onClick={() => setFilter("organizations")}
          >
            Orgs
          </Button>
        </div>
      </div>
      <ul>
        {filteredUsers?.map((user) => (
          <li key={user._id} className="border-b last:border-b-0 ">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 space-x-2  "
              onClick={() => onSelectUser(user)}
            >
              {user.role ? (
                <Building2 className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
              <span className="ellipsis">{user.username}</span>
              {user.role && (
                <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Org
                </span>
              )}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
