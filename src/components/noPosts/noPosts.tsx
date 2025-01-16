import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenLine } from "lucide-react";

interface NoPostsProps {
  role: "organizations" | "volunteers" | "";
}

export function NoPostsScreen({ role }: NoPostsProps) {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <PenLine className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">{`No ${role} Posts`}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
