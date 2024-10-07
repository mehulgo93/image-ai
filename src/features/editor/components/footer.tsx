import { Hint } from "@/components/hint";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="h-[52px] border-t bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint label="Zoom in" side="top" sideoffset={10}>
        <Button
          variant="ghost"
          className="h-full"
          size="icon"
          onClick={() => {}}
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideoffset={10}>
        <Button
          variant="ghost"
          className="h-full"
          size="icon"
          onClick={() => {}}
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};
