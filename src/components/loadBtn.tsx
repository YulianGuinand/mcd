import { UploadIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface LoadModelProps {
  tables: {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: {
      label: string;
      attributes: {
        id: string;
        name: string;
        type: string;
        isPrimaryKey: boolean;
        isForeignKey?: undefined;
        references?: undefined;
      }[];
    };
  }[];
  relations: {
    id: string;
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: string;
    label: string;
    type: string;
  }[];
}
const LoadButton = ({
  loadModel,
}: {
  loadModel: (data: LoadModelProps) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = () => {
    const file = inputRef?.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const jsonData = JSON.parse(content);
          loadModel(jsonData);
        } catch {
          throw new Error("File type don't support!");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>UPLOAD FILE</SheetTitle>
        <SheetDescription>Choose a json file to upload.</SheetDescription>
      </SheetHeader>
      <div className="py-4">
        <Input ref={inputRef} id="file" type="file" />
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="secondary" onClick={handleFileChange}>
            <UploadIcon className="size-4" />
            Load
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default LoadButton;
