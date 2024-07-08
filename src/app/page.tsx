import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-red-500 text-bold">
      <Button variant="destructive">Click me</Button>
    </div>
  );
}
