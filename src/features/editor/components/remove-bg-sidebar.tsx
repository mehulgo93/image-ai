import Image from "next/image";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { useRemoveBackgroundImage } from "@/features/ai/api/use-remove-background";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { toast } from "sonner";

interface RemoveBgSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBgSidebarProps) => {
  const mutation = useRemoveBackgroundImage();
  const selectedObject = editor?.selectedObjects[0];
  // check the entry on the console log of the selected object to find out the original element which contains the url of the image.
  // @ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = () => {
    // TODO: Block with payroll

    mutation.mutate(
      { image: imageSrc },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
          toast.success("Background removed successfully");
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "remove-bg" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Background removal"
        description="Remove background from image using AI"
      />
      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center p-4 flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Feature is not available for this object
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "relative aspect-square rounded-md overflow-hidden transition bg-muted",
                mutation.isPending && "opacity-50"
              )}
            >
              <Image src={imageSrc} fill alt="Image" className="object-cover" />
              {mutation.isPending && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                  <p className="text-white text-sm mt-2">
                    Removing Background...
                  </p>
                </div>
              )}
            </div>
            <Button
              disabled={mutation.isPending}
              onClick={onClick}
              className="w-full"
            >
              Remove background
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
