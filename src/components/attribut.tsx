import { Handle, Position } from "@xyflow/react";
import { KeyRound, Link, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "./ui/input";

const types = [
  "INT",
  "VARCHAR",
  "TEXT",
  "DATE",
  "DATETIME",
  "TIMESTAMP",
  "TIME",
  "YEAR",
  "CHAR",
  "TINYINT",
  "SMALLINT",
  "MEDIUMINT",
  "BIGINT",
  "FLOAT",
  "DOUBLE",
  "DECIMAL",
  "BOOLEAN",
  "SERIAL",
  "BLOB",
  "MEDIUMBLOB",
  "LONGBLOB",
  "TINYBLOB",
  "JSON",
  "GEOMETRY",
  "POINT",
  "LINESTRING",
  "POLYGON",
  "MULTIPOINT",
  "MULTILINESTRING",
  "MULTIPOLYGON",
  "GEOMETRYCOLLECTION",
];

interface Attribute {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
}

interface AttributProps {
  attr: Attribute;
  id: string;
  updateAttribute: (
    id: string,
    name: string,
    type: string,
    isPrimaryKey: boolean,
    isForeignKey: boolean
  ) => void;
  isRelation: boolean;
  deleteAttribute: (id: string) => void;
}

const Attribut = ({
  attr,
  id,
  updateAttribute,
  isRelation = false,
  deleteAttribute,
}: AttributProps) => {
  //
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [attributName, setAttributName] = useState<string>(attr.name);
  const [attributType, setAttributType] = useState<string>(attr.type);

  const [attributPrimaryKey, setAttributPrimaryKey] = useState<boolean>(
    attr.isPrimaryKey
  );

  const [attributForeignKey, setAttributForeignKey] = useState<boolean>(
    attr.isForeignKey
  );

  const handleDelete = () => {
    deleteAttribute(attr.id);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="py-1 px-2 border-b last:border-b-0 flex items-center relative group/item">
        <DialogTrigger className="flex items-center">
          {attr.isPrimaryKey && <KeyRound className="size-3 mr-2" />}
          {attr.isForeignKey && <Link className="size-3 mr-2" />}
          <span className="font-medium">{attr.name}</span>
          <span className="ml-2 text-gray-500 text-sm">{attr.type}</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier attribut</DialogTitle>
          </DialogHeader>
          {/* NAME */}
          <Input
            value={attributName}
            onChange={(e) => setAttributName(e.target.value)}
            placeholder="Nom de l'attribut"
            className="mt-2"
          />
          {/* TYPES */}
          <Select onValueChange={setAttributType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={attr.type} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                {types.map((type, index) => (
                  <SelectItem key={index} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* KEY */}
          <div className="w-full flex items-center gap-3">
            {/* PRIMARY */}
            <Button
              className="w-full"
              variant={"default"}
              style={{ backgroundColor: attributPrimaryKey ? "#7e22ce" : "" }}
              onClick={() => setAttributPrimaryKey(!attributPrimaryKey)}
            >
              Primary Key
            </Button>

            {/* FOREIGN */}
            <Button
              className="w-full"
              variant={"default"}
              style={{ backgroundColor: attributForeignKey ? "#7e22ce" : "" }}
              onClick={() => setAttributForeignKey(!attributForeignKey)}
            >
              Foreign Key
            </Button>
          </div>

          {/* FOOTER */}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              <Trash2 className="size-4" />
              Supprimer
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                updateAttribute(
                  attr.id,
                  attributName,
                  attributType,
                  attributPrimaryKey,
                  attributForeignKey
                )
              }
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>

        {/* HANDLES */}
        {!isRelation && (
          <>
            <Handle
              type="source"
              position={Position.Left}
              id={`${id}.${attr.name}.1`}
              style={{
                backgroundColor: "#a855f7",
              }}
              className="group-hover/item:opacity-100 opacity-0 transition-opacity"
            />
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}.${attr.name}.2`}
              style={{
                backgroundColor: "#a855f7",
              }}
              className="group-hover/item:opacity-100 opacity-0 transition-opacity"
            />
          </>
        )}
      </div>
    </Dialog>
  );
};

export default Attribut;
