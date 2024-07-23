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

interface Relative {
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
  const [relatives, setRelatives] = useState<Relative[]>([])
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [date, setDate] = useState<DateValue | undefined>(undefined)
  const [password, setPassword] = useState<string>("")
  const [relativesResults, setRelativesResults] = useState<Relative[]>([])

  useEffect(() => {
    const fuse = new Fuse(relatives, fuseOptions);

    const results = fuse.search(searchTerm);
    const relativesResults = searchTerm ? results.map(result => result.item) : relatives;

    setRelativesResults(relativesResults)
  }, [searchTerm, relatives])

  useEffect(() => {
    api.relatives.getNames().then((r) => {
      setRelatives(r.map(([value, label]) => ({ value: String(value), label })))
    })
  }, [])

  function CreateStudent() {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      value === "" ||
      date === undefined ||
      password === "" ||
      email === undefined ||
      password === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      value === undefined
    ) {
      return;
    }

    api.students.create({
      email,
      password
    }, {
      relative_id: parseInt(value),
      firstname: firstName,
      lastname: lastName,
      birthdate: formatDateWithMicroseconds((new Date(date.year, date.month - 1, date.day)).toISOString())
    }).then(() => {
      setFirstName("")
      setLastName("")
      setEmail("")
      setDate(undefined)
      setPassword("")
      setValue("")
    })
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Inscribir Estudiante</CardTitle>
          <CardDescription>
            Ingresa los datos del estudiante para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstname">Nombres</Label>
                <Input
                  id="firstname"
                  placeholder="Max"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Apellidos</Label>
                <Input
                  id="lastname"
                  placeholder="Robinson"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="relative">Pariente</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? relativesResults.find((relative) => relative.value === value)?.label
                        : "Seleccionar Pariente..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <Input
                        className="outline-none focus-visible:ring-0 border-x-0 border-t-0 rounded-none"
                        placeholder="Seleccionar Pariente..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <CommandEmpty>No se encontro Pariente.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {relativesResults.map((relative) => (
                            <CommandItem
                              key={relative.value}
                              value={relative.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === relative.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {relative.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="date">Fecha de Cumpleaños</Label>
                <DateTimePicker onChange={setDate} value={date} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={CreateStudent}>
              Inscribir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}