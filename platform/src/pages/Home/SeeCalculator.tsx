import { columns } from "@/components/table/components/columns-ingredients";
import { DataTable } from "@/components/table/components/data-table-ingredients";
import { Schema } from "@/components/table/data/schema-ingredients";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DateTimePicker } from "@/components/ui/date-time-picker/date-time-picker";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatDateWithMicroseconds } from "@/utils"
import { DateValue } from "react-aria";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Fuse from 'fuse.js';
import api from "@/utils/api"

interface Bread {
  value: string
  label: string
}

const fuseOptions = {
  includeScore: true,
  keys: ['label'],
  isCaseSensitive: false,
  includeMatches: true,
  findAllMatches: true,
  threshold: 0.3
};

export default function EnrollStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [breads, setBreads] = useState<Bread[]>([{value:"1",label:"Rosca de Reyes"}])
  const [breadsResults, setBreadsResults] = useState<Bread[]>([])

  useEffect(() => {
    const fuse = new Fuse(breads, fuseOptions);

    const results = fuse.search(searchTerm);
    const breadsResults = searchTerm ? results.map(result => result.item) : breads;

    setBreadsResults(breadsResults)
  }, [searchTerm, breads])


  function Calcular() {
    if (
      value === "" ||
      value === undefined
    ) {
      return;
    }
  }

  type Ingredients = { 
    id: string;
    name: string;
    quantity: number;
    cost: number;
  }

  async function getIngredients(): Promise<Schema[]> {
    // Fetch data from your API here.
    return [
      {
        id:"1",
        name:"leche",
        quantity:10,
        cost:100,
      },
      // ...
    ]
  }

  const [ingredients, setIngredients] = useState<Schema[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIngredients();
      setIngredients(data);
    };
  
    fetchData();
  }, []);
  
  // ...
  
  <DataTable
    data={ingredients}
    columns={columns}
  />

  // const [values, setValues] = useState<Columns[]>([]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Calculadora de Ingredientes</CardTitle>
          <CardDescription>
            Ingresa los datos del pedido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <div className="grid gap-2">
                <Label htmlFor="bread">Tipo de Pan</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? breadsResults.find((bread) => bread.value === value)?.label
                        : "Seleccionar Pan..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <Input
                        className="outline-none focus-visible:ring-0 border-x-0 border-t-0 rounded-none"
                        placeholder="Seleccionar Pan..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <CommandEmpty>No se encontro Tipo de Pan.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {breadsResults.map((bread) => (
                            <CommandItem
                              key={bread.value}
                              value={bread.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === bread.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {bread.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                // onChange={(e) => setPassword(e.target.value)}
                // value={password}
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={Calcular}>
              Calcular
            </Button>
          </div>
          
        </CardContent>
      </Card>
      <div>
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Ingredientes</h2>
              <p className="text-muted-foreground">
                    Cantidades de los ingredientes para el pedido
              </p>
            </div>
          </div>
          <DataTable
            data={ingredients}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}
