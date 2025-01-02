/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Background,
  Controls,
  Edge,
  Handle,
  MiniMap,
  Panel,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useState } from "react";

import "@xyflow/react/dist/style.css";
import {
  Download,
  Edit2,
  FileIcon,
  LoaderIcon,
  PlusCircle,
  UploadIcon,
} from "lucide-react";
import Attribut from "./attribut";
import DownloadButton from "./downloadBtn";
import LoadButton from "./loadBtn";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Sheet, SheetTrigger } from "./ui/sheet";

const initialNodes = [
  {
    id: "table-1",
    type: "tableNode",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      label: "utilisateurs",
      attributes: [
        {
          id: "id",
          name: "id",
          type: "INT",
          isPrimaryKey: true,
        },
        {
          id: "name",
          name: "name",
          type: "VARCHAR(255)",
        },
      ],
    },
  },
  {
    id: "table-2",
    type: "tableNode",
    position: {
      x: 200,
      y: 0,
    },
    data: {
      label: "articles",
      attributes: [
        {
          id: "id",
          name: "id",
          type: "INT",
          isPrimaryKey: true,
        },
        {
          id: "title",
          name: "title",
          type: "VARCHAR(255)",
        },
      ],
    },
  },
  {
    id: "relation-3",
    type: "relationNode",
    position: {
      x: 100,
      y: 150,
    },
    data: {
      label: "poster",
      attributes: [
        {
          id: "date_publication",
          name: "date_publication",
          type: "DATE",
        },
      ],
    },
  },
];

const initialEdges = [
  // UNE RELATION EST TOUJOURS CIBLE ET UNE TABLE TOUJOURS SOURCE
  {
    id: "table-1.id.2-relation-3.1", //.2 savoir quel handle
    source: "table-1",
    sourceHandle: "table-1.id.2",
    target: "relation-3",
    targetHandle: "1",
    label: "1-N",
    type: "smoothstep",
  },
  {
    id: "relation-3.2-table-2.id.1",
    target: "relation-3",
    targetHandle: "2",
    source: "table-2",
    sourceHandle: "table-2.id.1", //.1 savoir quel handle
    label: "1-1",
    type: "smoothstep",
  },
];

interface TableAttribute {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  references?: string;
}

interface TableData {
  label: string;
  attributes: TableAttribute[];
}

interface RelationNodeProps {
  id: string;
  data: TableData;
  updateNodeData: (id: string, data: TableData) => void;
}

// LE NOEUD TABLE
const TableNode = ({
  id,
  data,
  updateNodeData,
}: {
  data: TableData;
  id: string;
  updateNodeData: (id: string, data: TableData) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tableName, setTableName] = useState(data.label);

  const addAttribute = () => {
    updateNodeData(id, {
      ...data,
      attributes: [
        ...data.attributes,
        {
          id: `new_attr`,
          name: "new_attr",
          type: "VARCHAR(255)",
          isPrimaryKey: false,
          isForeignKey: false,
        },
      ],
    });
  };

  const deleteAttribute = (attrId: string) => {
    updateNodeData(id, {
      ...data,
      attributes: data.attributes.filter((attr) => attr.id !== attrId),
    });
  };

  const handleSaveTableName = () => {
    updateNodeData(id, {
      ...data,
      label: tableName,
    });
    setIsDialogOpen(false);
  };

  const updateAttribute = (
    attrId: string,
    name: string,
    type: string,
    isPrimaryKey: boolean,
    isForeignKey: boolean
  ) => {
    updateNodeData(id, {
      ...data,
      attributes: data.attributes.map((attr) =>
        attr.id === attrId
          ? { ...attr, name, type, isPrimaryKey, isForeignKey }
          : attr
      ),
    });
  };

  return (
    <Card className="min-w-[200px] bg-zinc-900 relative group">
      <div className="p-3 bg-purple-700 text-white font-bold rounded-t flex items-center justify-between">
        {data.label.toUpperCase()}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Edit2 className="size-4 ml-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le nom de la table</DialogTitle>
            </DialogHeader>
            <Input
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Nom de la table"
              className="mt-2"
            />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant="secondary" onClick={handleSaveTableName}>
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="py-2">
        {data.attributes.map((attr, index) => (
          <Attribut
            key={index}
            attr={attr}
            id={id}
            isRelation={false}
            updateAttribute={updateAttribute}
            deleteAttribute={deleteAttribute}
          />
        ))}
        <Button
          variant={"ghost"}
          size={"sm"}
          className="w-full mt-2"
          onClick={addAttribute}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Ajouter un attribut
        </Button>
      </div>
    </Card>
  );
};

// LE NOEUD RELATION
const RelationNode = ({ id, data, updateNodeData }: RelationNodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tableName, setTableName] = useState(data.label);

  const addAttribute = () => {
    updateNodeData(id, {
      ...data,
      attributes: [
        ...data.attributes,
        {
          id: `attr-${Date.now()}`,
          name: "new_attr",
          type: "VARCHAR(255)",
          isPrimaryKey: false,
          isForeignKey: false,
        },
      ],
    });
  };

  const deleteAttribute = (attrId: string) => {
    updateNodeData(id, {
      ...data,
      attributes: data.attributes.filter((attr) => attr.id !== attrId),
    });
  };

  const handleSaveTableName = () => {
    updateNodeData(id, {
      ...data,
      label: tableName,
    });
    setIsDialogOpen(false);
  };

  const updateAttribute = (
    attrId: string,
    name: string,
    type: string,
    isPrimaryKey: boolean,
    isForeignKey: boolean
  ) => {
    updateNodeData(id, {
      ...data,
      attributes: data.attributes.map((attr) =>
        attr.id === attrId
          ? { ...attr, name, type, isPrimaryKey, isForeignKey }
          : attr
      ),
    });
  };

  return (
    <Card className="min-w-[150px] bg-zinc-900 relative group">
      {/* Handles pour les connexions */}
      <Handle
        type="target"
        id="1"
        position={Position.Left}
        style={{ backgroundColor: "#a855f7" }}
      />
      <Handle
        type="target"
        id="2"
        position={Position.Right}
        style={{ backgroundColor: "#a855f7" }}
      />
      {/* Contenu de la relation */}
      <div className="px-4 py-2 cursor-pointer bg-purple-700 hover:bg-purple-600 transition-colors rounded-t flex items-center justify-between">
        <span className="text-white font-medium ">
          {data.label || "Relation"}
        </span>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Edit2 className="size-4 ml-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le nom de la relation</DialogTitle>
            </DialogHeader>
            <Input
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Nom de la table"
              className="mt-2"
            />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant="secondary" onClick={handleSaveTableName}>
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* Affichage des attributs */}
      <div className="p-2 ">
        {data.attributes.map((attr, index) => (
          <Attribut
            key={index}
            attr={attr}
            id={id}
            isRelation={true}
            updateAttribute={updateAttribute}
            deleteAttribute={deleteAttribute}
          />
        ))}
        <Button
          variant={"ghost"}
          size={"sm"}
          className="w-full mt-2"
          onClick={addAttribute}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Ajouter un attribut
        </Button>
      </div>
    </Card>
  );
};

// L'EDITEUR
export default function MCDEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [sheetMod, setSheetMod] = useState<"save" | "load">("save");

  const [isEditingEdge, setIsEditingEdge] = useState<boolean>(false);
  const [edgeEditing, setEdgeEditing] = useState<Edge | null>(null);
  const [labelValue, setLabelValue] = useState<string>("");

  // IA
  const [loading, setLoading] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [promptValue, setPromptValue] = useState<string>("");

  // FONCTION DE CREATION DE CONNECTION
  const onConnect = useCallback(
    (params: any) => {
      const newEdge = {
        id: `${params.sourceHandle}-${params.target}.${params.targetHandle}`,
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: params.target,
        targetHandle: params.targetHandle,
        label: "1-N",
        animated: true,
        type: "smoothstep",
      };
      setEdges((eds) => [...eds, newEdge]);
    },
    [setEdges]
  );

  // FONCTION DE CREATION DE TABLE
  const addNewTable = useCallback(() => {
    const newNode = {
      id: `table-${nodes.length + 1}`,
      type: "tableNode",
      position: { x: 100, y: 100 },
      data: {
        label: `Table ${nodes.length + 1}`,
        attributes: [
          { id: "id", name: "id", type: "INT", isPrimaryKey: true },
          { id: "name", name: "name", type: "VARCHAR(255)" },
        ],
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  // FONCTION DE CREATION DE RELATION
  const addNewRelation = useCallback(() => {
    const newNode = {
      id: `relation-${nodes.length + 1}`,
      type: "relationNode",
      position: { x: 100, y: 100 },
      data: {
        label: `Relation ${nodes.length + 1}`,
        attributes: [],
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  // FONCTION POUR METTRE A JOUR LES DONNEES
  const updateNodeData = useCallback(
    (nodeId: any, newData: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: newData };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const nodeTypes = {
    tableNode: (props: any) => (
      <TableNode {...props} updateNodeData={updateNodeData} />
    ),
    relationNode: (props: any) => (
      <RelationNode {...props} updateNodeData={updateNodeData} />
    ),
  };

  const defaultEdgeOptions = {
    animated: true,
    type: "smoothstep",
  };

  // FONCTION POUR EXPORTER LES DONNEES
  const exportModel = useCallback(
    (filename: string) => {
      const model = {
        tables: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        })),
        relations: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          sourceHandle: edge.sourceHandle,
          target: edge.target,
          targetHandle: edge.targetHandle,
          label: edge.label,
          type: `${edge.type}`,
        })),
      };

      const blob = new Blob([JSON.stringify(model, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
    },
    [nodes, edges]
  );

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
  // FONCTION POUR CHARGER LES DONNEES
  const loadModel = (data: LoadModelProps) => {
    setNodes(data.tables);
    setEdges(data.relations);
  };

  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

  const proOptions = { hideAttribution: true };

  // FONCTION POUR AFFICHER LA FENETRE DE MODIFICATION D UN LIEN
  const handleEditEdge = (edge: Edge) => {
    setLabelValue(edge.label as string);
    setEdgeEditing(edge);
    setIsEditingEdge(true);
  };

  // FONCTION POUR MODIFIER LE LABEL D UN LIEN
  const handleNameEdge = useCallback(
    (edgeEditing: Edge | null, labelValue: string) => {
      if (!edgeEditing) return;
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === edgeEditing.id) {
            return { ...edge, label: labelValue };
          }
          return edge;
        })
      );

      setEdgeEditing(null);
      setLabelValue("");
      setIsEditingEdge(false);
    },
    [setEdges]
  );

  // FONCTION POUR FERMER LA FENETER DE MODIFICATION D UN LIEN
  const handleDiscard = () => {
    setEdgeEditing(null);
    setLabelValue("");
    setIsEditingEdge(false);
  };

  const sendPrompt = async (prompt: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/llm-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            prompt,
          },
        }),
      });

      if (res.ok) {
        const reader = res.body?.getReader();
        if (!reader) return;
        let html = "";
        while (true) {
          const { value, done } = await reader.read();
          if (value) {
            html += new TextDecoder().decode(value);
          }
          if (done) {
            const text = JSON.parse(html).message;
            const paragraphs = text
              .split("\n")
              .map((para: string) => para.trim())
              .filter((para: string) => para !== "");

            setLoading(false);
            const responseString = paragraphs.join("");
            const formattedResponse = responseString
              .replace("```json", "")
              .replace("```", "");

            console.log(JSON.parse(formattedResponse));
            loadModel(JSON.parse(formattedResponse));
            return;
          }
        }
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const generateMCD = (prompt: string) => {
    if (prompt.length === 0) return;
    const prePromp = `Tu es un expert en modélisation de bases de données relationnelles. Ta tâche est de générer des schémas MCD sous forme de données JSON à partir des descriptions textuelles fournies par l'utilisateur.

Instructions :
Identifie les entités (tables) :

Détecte toutes les entités mentionnées explicitement ou implicitement.
Pour chaque table, définis ses attributs, en précisant les types de données, les clés primaires (PK) et les clés étrangères (FK) si elles existent.
Identifie les relations :

Décris les relations entre les entités avec les cardinalités (1-1, 0-N, etc.).
Si une relation est caractérisée par un verbe ou des attributs, représente-la comme un relationNode.
Une relation entre deux tables doit avoir deux connexions :
Une liaison de la table source au relationNode.
Une liaison du relationNode à la table cible.
Format de sortie :
Organise les données dans ce format JSON :

json
Copier le code
data = { 
    "tables": [
        {
            "id": "table-1",
            "type": "tableNode",
            "position": {"x": 0, "y": 0}, 
            "data": {
                "label": "nom_de_la_table",
                "attributes": [
                    {"id": "attribut", "name": "attribut", "type": "type_de_donnée", "isPrimaryKey": true/false, "isForeignKey": true/false}
                ]
            }
        }
    ],
    "relations": [
        {
            "id": "relation_id",
            "source": "source_table_ou_relationNode",
            "sourceHandle": "source_table.attribut_ou_relationHandle",
            "target": "cible_table_ou_relationNode",
            "targetHandle": "cible_table.attribut_ou_relationHandle",
            "label": "cardinalité",
            "type": "smoothstep"
        }
    ]
}
Positionnement des éléments :

Assigne des coordonnées fictives (x, y) pour représenter la disposition des tables et relations dans un schéma graphique.
Exemple d'entrée utilisateur :
"Un utilisateur peut poster plusieurs articles. Chaque article est écrit par un utilisateur. Une relation 'poster' est caractérisée par une date de publication."

Exemple de sortie :
json
Copier le code
data = { 
    "tables": [
        {
            "id": "table-1",
            "type": "tableNode",
            "position": {"x": 0, "y": 0},
            "data": {
                "label": "utilisateurs",
                "attributes": [
                    {"id": "id", "name": "id", "type": "INT", "isPrimaryKey": true},
                    {"id": "name", "name": "name", "type": "VARCHAR(255)"}
                ]
            }
        },
        {
            "id": "table-2",
            "type": "tableNode",
            "position": {"x": 200, "y": 0},
            "data": {
                "label": "articles",
                "attributes": [
                    {"id": "id", "name": "id", "type": "INT", "isPrimaryKey": true},
                    {"id": "title", "name": "title", "type": "VARCHAR(255)"}
                ]
            }
        },
        {
            "id": "relation-3",
            "type": "relationNode",
            "position": {"x": 100, "y": 150},
            "data": {
                "label": "poster",
                "attributes": [
                    {"id": "date_publication", "name": "date_publication", "type": "DATE"}
                ]
            }
        }
    ],
    "relations": [
        {
            "id": "table-1.id-relation-3.1",
            "source": "table-1",
            "sourceHandle": "table-1.id",
            "target": "relation-3",
            "targetHandle": "1",
            "label": "1-N",
            "type": "smoothstep"
        },
        {
            "id": "relation-3.2-table-2.id",
            "source": "relation-3",
            "sourceHandle": "2",
            "target": "table-2",
            "targetHandle": "table-2.id",
            "label": "1-1",
            "type": "smoothstep"
        }
    ]
}
Règles importantes :
Génère uniquement les données JSON, sans explications supplémentaires.
Si une relation a des attributs, elle doit être représentée par un relationNode.
Les cardinalités et positions doivent être précises.
Voici le texte qu'il faut en schema : 
${prompt}`;

    sendPrompt(prePromp);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineStyle={{ stroke: "#fff" }}
        defaultEdgeOptions={defaultEdgeOptions}
        defaultViewport={defaultViewport}
        onEdgeDoubleClick={(event, edge) => handleEditEdge(edge)}
        fitView
        proOptions={proOptions}
      >
        <div id="btns" className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            onClick={addNewTable}
            className="dark flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Nouvelle Table
          </Button>
          <Button
            variant="secondary"
            onClick={addNewRelation}
            className="dark flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Nouvelle Relation
          </Button>
        </div>
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
        <Panel
          position="top-left"
          id="panel"
          className="flex items-center gap-2"
        >
          <Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                  <FileIcon className="size-4" />
                  <p className="text-sm">File</p>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark">
                <DropdownMenuItem>
                  <SheetTrigger
                    className="flex justify-start items-center size-full"
                    onClick={() => setSheetMod("save")}
                  >
                    <Download className="size-4 mr-2" />
                    Save
                  </SheetTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SheetTrigger
                    className="flex justify-start items-center size-full"
                    onClick={() => setSheetMod("load")}
                  >
                    <UploadIcon className="size-4 mr-2" />
                    Load
                  </SheetTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {sheetMod === "save" ? (
              <DownloadButton exportJSON={exportModel} />
            ) : (
              <LoadButton loadModel={loadModel} />
            )}
          </Sheet>
          <Button
            variant="secondary"
            onClick={() => setIsGenerating(true)}
            className="flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <LoaderIcon className="size-5 animate-spin text-primary" />
            ) : (
              "Generate"
            )}
          </Button>
        </Panel>
      </ReactFlow>
      <Dialog open={isEditingEdge} onOpenChange={setIsEditingEdge}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Edge</DialogTitle>
          </DialogHeader>

          {edgeEditing && (
            <Input
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
            />
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDiscard} variant="default">
                Discard
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => handleNameEdge(edgeEditing, labelValue)}
                variant="secondary"
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isGenerating} onOpenChange={setIsGenerating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ask something to generate MCD</DialogTitle>
          </DialogHeader>

          <Input
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDiscard} variant="ghost">
                Discard
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => generateMCD(promptValue)}
                variant="primary"
              >
                Generate
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
