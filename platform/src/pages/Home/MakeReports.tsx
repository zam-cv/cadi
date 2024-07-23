import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Fuse from 'fuse.js';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/utils/api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface Item {
  value: string;
  label: string;
}

function SelectWithSearch({
  list,
  value,
  setValue,
  setSearchTerm,
  open,
  setOpen,
  name,
}: {
  list: any[];
  value: string;
  setValue: any;
  setSearchTerm: any;
  open: boolean;
  setOpen: any;
  name: string;
}) {
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[220px] justify-between"
          >
            {value
              ? list.find((item: any) => item.value === value)?.label
              : `Seleccionar ${name}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0">
          <Command>
            <Input
              className="outline-none focus-visible:ring-0 border-x-0 border-t-0 rounded-none"
              placeholder={`Seleccionar ${name}...`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CommandEmpty>No se encontro {name}.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {list.map((item: any) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const fuseOptions = {
  includeScore: true,
  keys: ['label'],
  isCaseSensitive: false,
  includeMatches: true,
  findAllMatches: true,
  threshold: 0.3
};

export default function MakeReports() {
  const [students, setStudents] = useState<Item[]>([]);
  const [student, setStudent] = useState<string>("");
  const [openStudent, setOpenStudent] = useState<boolean>(false);
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [areas, setAreas] = useState<string[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [consequence, setConsequence] = useState<string>("");

  useEffect(() => {
    const fuse = new Fuse(students, fuseOptions);

    const results = fuse.search(searchStudent);
    const studentsResults = searchStudent ? results.map(result => result.item) : students;

    setStudents(studentsResults)
  }, [searchStudent, students])

  useEffect(() => {
    api.students.areas().then(setAreas);
    api.students.names().then((students) => {
      setStudents(
        students.map(([id, name]) => ({
          value: id.toString(),
          label: name,
        }))
      );
    });
  }, []);

  function CreateReports() {}

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Crear Reporte</CardTitle>
          <CardDescription>
            Ingresa los datos del reporte del estudiante para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titulo</Label>
              <Input
                id="title"
                type="text"
                placeholder="Reporte de Estudiante"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción del reporte"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="consequence">Consecuencia</Label>
                <Textarea
                  id="consequence"
                  placeholder="Consecuencia del reporte"
                  onChange={(e) => setConsequence(e.target.value)}
                  value={consequence}
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <Label htmlFor="area">Area</Label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Selecciona una area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Areas</SelectLabel>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="student">Estudiante</Label>
                <SelectWithSearch
                  list={students}
                  value={student}
                  setValue={setStudent}
                  setSearchTerm={setSearchStudent}
                  open={openStudent}
                  setOpen={setOpenStudent}
                  name="Estudiante"
                />
              </div>
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="evidences">Evidencias</Label>
                <Input id="evidences" type="file" multiple />
              </div>
            </div>
            <Button type="submit" className="w-full" onClick={CreateReports}>
              Crear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
