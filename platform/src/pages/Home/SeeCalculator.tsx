// import { columns } from "@/components/table/components/columns-ingredients";
// import { DataTable } from "@/components/table/components/data-table-ingredients";
// import { Schema } from "@/components/table/data/schema-ingredients";

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { Check, ChevronsUpDown } from "lucide-react"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import Fuse from 'fuse.js';
// import api from "@/utils/api"

// interface Bread {
//   value: string
//   label: string
// }

// const fuseOptions = {
//   includeScore: true,
//   keys: ['label'],
//   isCaseSensitive: false,
//   includeMatches: true,
//   findAllMatches: true,
//   threshold: 0.3
// };

// export default function EnrollStudents() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [open, setOpen] = useState(false)
//   const [value, setValue] = useState("")
//   const [breads, setBreads] = useState<Bread[]>([{value:"1",label:"Rosca de Reyes"}, {value:"2",label:"Pan de Muerto"}])
//   const [breadsResults, setBreadsResults] = useState<Bread[]>([])
//   const [quantity, setQuantity] = useState<number>(0);
//   const [ingredients, setIngredients] = useState<Schema[]>([]);

//   useEffect(() => {
//     const fuse = new Fuse(breads, fuseOptions);

//     const results = fuse.search(searchTerm);
//     const breadsResults = searchTerm ? results.map(result => result.item) : breads;

//     setBreadsResults(breadsResults)
//   }, [searchTerm, breads])

//   // type Ingredients = { 
//   //   id: string;
//   //   name: string;
//   //   quantity: number;
//   //   cost: number;
//   // }

//   async function getIngredients(quantity: number): Promise<Schema[]> {
//     // Validate the quantity
//     // if (quantity <= 0) {
//     //   alert("Please enter a quantity higher than 0");
//     //   return [];
//     // }

//     // Fetch data from your API here.
//     if (quantity > 0) {
//       if (value === "1") {
//         return [
//           {
//             "id": "1",
//             "name": "harina",
//             "quantity": 500 * quantity,
//             "cost": 30 * quantity
//           },
//           {
//             "id": "2",
//             "name": "leche",
//             "quantity": 250 * quantity,
//             "cost": 15 * quantity
//           },
//           {
//             "id": "3",
//             "name": "azúcar",
//             "quantity": 100 * quantity,
//             "cost": 10 * quantity
//           },
//           {
//             "id": "4",
//             "name": "mantequilla",
//             "quantity": 100 * quantity,
//             "cost": 25 * quantity
//           },
//           {
//             "id": "5",
//             "name": "huevos",
//             "quantity": 3 * quantity,
//             "cost": 9 * quantity
//           },
//           {
//             "id": "6",
//             "name": "levadura",
//             "quantity": 11 * quantity,
//             "cost": 10 * quantity
//           },
//           {
//             "id": "7",
//             "name": "sal",
//             "quantity": 5 * quantity,
//             "cost": 1 * quantity
//           },
//           {
//             "id": "8",
//             "name": "ralladura de naranja",
//             "quantity": 1 * quantity,
//             "cost": 2 * quantity
//           },
//           {
//             "id": "9",
//             "name": "ralladura de limón",
//             "quantity": 1 * quantity,
//             "cost": 2 * quantity
//           },
//           {
//             "id": "10",
//             "name": "frutas cristalizadas",
//             "quantity": 150 * quantity,
//             "cost": 50 * quantity
//           },
//           {
//             "id": "11",
//             "name": "azúcar glas",
//             "quantity": 100 * quantity,
//             "cost": 10 * quantity
//           },         
//           // ...
//         ]
//       }
//       if (value === "2"){
//         return [
//           {
//             "id": "1",
//             "name": "harina",
//             "quantity": 500 * quantity,
//             "cost": 30 * quantity
//           },
//           {
//             "id": "2",
//             "name": "leche",
//             "quantity": 250 * quantity,
//             "cost": 15 * quantity
//           },
//           {
//             "id": "3",
//             "name": "azúcar",
//             "quantity": 150 * quantity,
//             "cost": 15 * quantity
//           },
//           {
//             "id": "4",
//             "name": "mantequilla",
//             "quantity": 100 * quantity,
//             "cost": 25 * quantity
//           },
//           {
//             "id": "5",
//             "name": "huevos",
//             "quantity": 4 * quantity,
//             "cost": 12 * quantity
//           },
//           {
//             "id": "6",
//             "name": "levadura",
//             "quantity": 10 * quantity,
//             "cost": 10 * quantity
//           },
//           {
//             "id": "7",
//             "name": "sal",
//             "quantity": 5 * quantity,
//             "cost": 1 * quantity
//           },
//           {
//             "id": "8",
//             "name": "ralladura de naranja",
//             "quantity": 1 * quantity,
//             "cost": 2 * quantity
//           },
//           {
//             "id": "9",
//             "name": "agua de azahar",
//             "quantity": 10 * quantity,
//             "cost": 15 * quantity
//           },
//           {
//             "id": "10",
//             "name": "manteca vegetal",
//             "quantity": 50 * quantity,
//             "cost": 20 * quantity
//           },
//           {
//             "id": "11",
//             "name": "azúcar glas",
//             "quantity": 100 * quantity,
//             "cost": 10 * quantity
//           }
//         ]
//       }
//     }
//     return [
//       {
//         id:"1",
//         name:"Ningun Ingrediente",
//         quantity:0,
//         cost:100,
//       },
//       // ...
//     ]
//   }

//   async function Calcular() {
//     if (value === "" || value === undefined) {
//       return;
//     }

//     const data = await getIngredients(quantity);
//     setIngredients(data);
//   }

//   return (
//     <div className="h-full w-full flex flex-col justify-center items-center">
//       <div className="flex">
//         <Card className="mx-auto max-w-sm">
//           <CardHeader>
//             <CardTitle className="text-xl">Calculadora de Ingredientes</CardTitle>
//             <CardDescription>
//               Ingresa los datos del pedido
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4">
//               <div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="bread">Tipo de Pan</Label>
//                   <Popover open={open} onOpenChange={setOpen}>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         role="combobox"
//                         aria-expanded={open}
//                         className="w-[200px] justify-between"
//                       >
//                         {value
//                           ? breadsResults.find((bread) => bread.value === value)?.label
//                           : "Seleccionar Pan..."}
//                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-[200px] p-0">
//                       <Command>
//                         <Input
//                           className="outline-none focus-visible:ring-0 border-x-0 border-t-0 rounded-none"
//                           placeholder="Seleccionar Pan..."
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <CommandEmpty>No se encontro Tipo de Pan.</CommandEmpty>
//                         <CommandList>
//                           <CommandGroup>
//                             {breadsResults.map((bread) => (
//                               <CommandItem
//                                 key={bread.value}
//                                 value={bread.value}
//                                 onSelect={(currentValue) => {
//                                   setValue(currentValue === value ? "" : currentValue)
//                                   setOpen(false)
//                                 }}
//                               >
//                                 <Check
//                                   className={cn(
//                                     "mr-2 h-4 w-4",
//                                     value === bread.value ? "opacity-100" : "opacity-0"
//                                   )}
//                                 />
//                                 {bread.label}
//                               </CommandItem>
//                             ))}
//                           </CommandGroup>
//                         </CommandList>
//                       </Command>
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="quantity">Cantidad</Label>
//                 <Input
//                   id="quantity"
//                   type="number"
//                   placeholder="0"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full" onClick={Calcular}>
//                 Calcular
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="flex">
//         <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
//           <div className="flex items-center justify-between space-y-2">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tight">Ingredientes</h2>
//               <p className="text-muted-foreground">
//                 Cantidades de los ingredientes para el pedido
//               </p>
//             </div>
//           </div>
//           <DataTable
//             data={ingredients}
//             columns={columns}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  const [breads, setBreads] = useState<Bread[]>([{value:"1",label:"Rosca de Reyes"}, {value:"2",label:"Pan de Muerto"}])
  const [breadsResults, setBreadsResults] = useState<Bread[]>([])
  const [quantity, setQuantity] = useState<number>(0);
  const [ingredients, setIngredients] = useState<Schema[]>([]);

  useEffect(() => {
    const fuse = new Fuse(breads, fuseOptions);

    const results = fuse.search(searchTerm);
    const breadsResults = searchTerm ? results.map(result => result.item) : breads;

    setBreadsResults(breadsResults)
  }, [searchTerm, breads])

  // type Ingredients = { 
  //   id: string;
  //   name: string;
  //   quantity: number;
  //   cost: number;
  // }

  async function getIngredients(quantity: number): Promise<Schema[]> {
    // Validate the quantity
    // if (quantity <= 0) {
    //   alert("Please enter a quantity higher than 0");
    //   return [];
    // }

    // Fetch data from your API here.
    if (quantity > 0) {
      if (value === "1") {
        return [
          {
            "id": "1",
            "name": "harina",
            "quantity": 500 * quantity,
            "cost": 30 * quantity
          },
          {
            "id": "2",
            "name": "leche",
            "quantity": 250 * quantity,
            "cost": 15 * quantity
          },
          {
            "id": "3",
            "name": "azúcar",
            "quantity": 100 * quantity,
            "cost": 10 * quantity
          },
          {
            "id": "4",
            "name": "mantequilla",
            "quantity": 100 * quantity,
            "cost": 25 * quantity
          },
          {
            "id": "5",
            "name": "huevos",
            "quantity": 3 * quantity,
            "cost": 9 * quantity
          },
          {
            "id": "6",
            "name": "levadura",
            "quantity": 11 * quantity,
            "cost": 10 * quantity
          },
          {
            "id": "7",
            "name": "sal",
            "quantity": 5 * quantity,
            "cost": 1 * quantity
          },
          {
            "id": "8",
            "name": "ralladura de naranja",
            "quantity": 1 * quantity,
            "cost": 2 * quantity
          },
          {
            "id": "9",
            "name": "ralladura de limón",
            "quantity": 1 * quantity,
            "cost": 2 * quantity
          },
          {
            "id": "10",
            "name": "frutas cristalizadas",
            "quantity": 150 * quantity,
            "cost": 50 * quantity
          },
          {
            "id": "11",
            "name": "azúcar glas",
            "quantity": 100 * quantity,
            "cost": 10 * quantity
          },         
          // ...
        ]
      }
      if (value === "2"){
        return [
          {
            "id": "1",
            "name": "harina",
            "quantity": 500 * quantity,
            "cost": 30 * quantity
          },
          {
            "id": "2",
            "name": "leche",
            "quantity": 250 * quantity,
            "cost": 15 * quantity
          },
          {
            "id": "3",
            "name": "azúcar",
            "quantity": 150 * quantity,
            "cost": 15 * quantity
          },
          {
            "id": "4",
            "name": "mantequilla",
            "quantity": 100 * quantity,
            "cost": 25 * quantity
          },
          {
            "id": "5",
            "name": "huevos",
            "quantity": 4 * quantity,
            "cost": 12 * quantity
          },
          {
            "id": "6",
            "name": "levadura",
            "quantity": 10 * quantity,
            "cost": 10 * quantity
          },
          {
            "id": "7",
            "name": "sal",
            "quantity": 5 * quantity,
            "cost": 1 * quantity
          },
          {
            "id": "8",
            "name": "ralladura de naranja",
            "quantity": 1 * quantity,
            "cost": 2 * quantity
          },
          {
            "id": "9",
            "name": "agua de azahar",
            "quantity": 10 * quantity,
            "cost": 15 * quantity
          },
          {
            "id": "10",
            "name": "manteca vegetal",
            "quantity": 50 * quantity,
            "cost": 20 * quantity
          },
          {
            "id": "11",
            "name": "azúcar glas",
            "quantity": 100 * quantity,
            "cost": 10 * quantity
          }
        ]
      }
    }
    return [
      {
        id:"1",
        name:"Ningun Ingrediente",
        quantity:0,
        cost:100,
      },
      // ...
    ]
  }

  async function Calcular() {
    if (value === "" || value === undefined) {
      return;
    }

    const data = await getIngredients(quantity);
    setIngredients(data);
  }

  return (
   
      <div>
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
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
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" onClick={Calcular}>
                    Calcular
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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
  );
}
