import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Banner = () => {
  return (
    <div className="text-white aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5]">
      <div className="rounded-full size-28 md:flex items-center justify-center bg-white/50 hidden">
        <div className="rounded-full size-20 flex items-center justify-center bg-white">
          <Sparkles className="h-20 text-[#0073ff] fill-[#0073ff]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="md:text-3xl text-xl font-semibold">
          Visualize your ideas with Image AI
        </h1>
        <p className="md:text-sm text-xs mb-2">
          Unlock the full potential of our platform with our Pro plan.
        </p>
        <Button variant="secondary" className="w-[160px]">
          Start Creating
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
