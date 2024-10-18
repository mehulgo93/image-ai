import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader, TriangleAlert } from "lucide-react";
import { Editor } from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";

interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
}
const EditorProjectIdPage = async ({ params }: EditorProjectIdPageProps) => {
  const { data, isLoading, isError } = useGetProject(params.projectId);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="animate-spin size-6 text-muted-foreground" />
        ...Loading
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-y-5">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to load project</p>
        <Button asChild variant="secondary">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
