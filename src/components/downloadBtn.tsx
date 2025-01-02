import {
  getNodesBounds,
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

function downloadImage(dataUrl: string, name: string) {
  const a = document.createElement("a");
  a.setAttribute("download", `${name}.png`);
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton({ exportJSON }: { exportJSON: CallableFunction }) {
  const [nameValue, setNameValue] = useState<string>("MCD");
  const [fileType, setFileType] = useState<"image" | "json">("image");
  const { getNodes } = useReactFlow();

  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0.25
    );

    const element = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement | null;

    if (fileType === "image" && element) {
      toPng(element, {
        backgroundColor: "hsl(0 0% 9%)",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      })
        .then((dataUrl) => downloadImage(dataUrl, nameValue))
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    } else if (fileType === "json") {
      exportJSON(nameValue);
    } else {
      console.error("Element not found or unsupported file type");
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>SAVE SETTINGS</SheetTitle>
        <SheetDescription>Choose your type and file name.</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <input
            type="radio"
            name="fileType"
            value="image"
            checked={fileType === "image"}
            onChange={() => setFileType("image")}
            className="outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="json" className="text-right">
            JSON
          </Label>
          <input
            type="radio"
            name="fileType"
            value="json"
            checked={fileType === "json"}
            onChange={() => setFileType("json")}
            className="outline-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="secondary" onClick={onClick}>
            <DownloadIcon className="size-4" />
            Save
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default DownloadButton;
