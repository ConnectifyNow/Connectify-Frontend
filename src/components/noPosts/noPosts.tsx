import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenLine } from "lucide-react";

export default function NoPostsScreen() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <PenLine className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">No Posts Yet</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            It looks like you haven't created any posts yet. Start writing and
            sharing your thoughts with the world!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Create Your First Post</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
