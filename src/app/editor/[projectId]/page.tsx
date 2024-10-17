import { useGetProject } from "@/features/projects/api/use-get-project";
import { Editor } from "@/features/editor/components/editor";
import { Loader, TriangleAlert } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center h-full gap-y-5">
      <TriangleAlert className="size-6 " />
      <p className="text-muted-foreground text-sm">Failed to load project</p>
    </div>;
  }

  return <Editor />;
};

export default EditorProjectIdPage;
