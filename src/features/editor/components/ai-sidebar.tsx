import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "@/features/editor/types";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { toast } from "sonner";

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const mutation = useGenerateImage();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
          toast.success("Image Generated Successfully");
          setValue("");
        },
      }
    );
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate Image using AI" />
      <ScrollArea>
        <div className="relative">
          {mutation.isPending && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              <p className="text-white text-sm mt-2">Generating Image...</p>
            </div>
          )}
          <form
            onSubmit={onSubmit}
            className={cn("p-4 space-y-6", mutation.isPending && "opacity-50")}
          >
            <Textarea
              disabled={mutation.isPending}
              placeholder="self-portrait of a woman, lightning in the background"
              cols={30}
              rows={10}
              minLength={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="w-full"
            >
              {mutation.isPending ? "Generating..." : "Generate"}
            </Button>
          </form>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
