import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

export default function DeleteClassroom({
  classroomId,
}: {
  classroomId: string;
}) {
  const { toast } = useToast();
  const cookies = useCookies();
  const userId = cookies.get("userId");
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          <Trash2 size={18} className="mr-2" />
          Delete classroom
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await fetch(`/api/classroom/${classroomId}`, {
                method: "DELETE",
                body: JSON.stringify({
                  userId,
                }),
                next: {
                  revalidate: 0,
                },
              })
                .then((res) => {
                  if (res.ok) {
                    toast({
                      title: "Classroom deleted 🎉",
                      description: "Classroom has been deleted",
                    });
                  } else {
                    toast({
                      title: `${res.statusText} ⛔️`,
                      description: "Please contact our support",
                    });
                  }
                })
                .catch((error) => {
                  toast({
                    title: "Opps! something wrong ⛔️",
                    description: error,
                  });
                })
                .finally(() => router.push("/dashboard"));
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
