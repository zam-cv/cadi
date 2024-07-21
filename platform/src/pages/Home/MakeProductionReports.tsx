import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utils/api";

export default function MakeProductionReports() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  function CreateReport() {
    if (
      title === "" ||
      description === "" ||
      quantity === "" ||
      title === undefined ||
      description === undefined ||
      quantity === undefined
    ) {
      return;
    }

    api.productionReports
      .create(
        {
          title,
          description,
        },
        {
          quantity: parseInt(quantity),
        }
      )
      .then(() => {
        setTitle("");
        setDescription("");
        setQuantity("");
      });
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Crear Reporte de Producción</CardTitle>
          <CardDescription>
            Ingrese los datos del reporte de producción.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titulo</Label>
              <Input
                id="title"
                type="text"
                placeholder="Panes para el Globo"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción del reporte"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="title"
                type="number"
                placeholder="100"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={CreateReport}>
              Generar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
