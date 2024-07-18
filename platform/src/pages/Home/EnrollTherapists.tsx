import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import api from "@/utils/api"

export default function EnrollTherapists() {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [date, setDate] = useState<DateValue | undefined>(undefined)
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  function CreateTherapist() {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      date === undefined ||
      phone === "" ||
      password === "" ||
      email === undefined ||
      password === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      phone === undefined
    ) {
      return;
    }

    api.therapists.create({
      email,
      password
    }, {
      firstname: firstName,
      lastname: lastName,
      birthdate: formatDateWithMicroseconds((new Date(date.year, date.month - 1, date.day)).toISOString()),
      phone
    }).then(() => {
      setFirstName("")
      setLastName("")
      setEmail("")
      setDate(undefined)
      setPhone("")
      setPassword("")
    })
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Inscribir Terapeuta</CardTitle>
          <CardDescription>
            Ingresa los datos del terapeuta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Nombres</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Apellidos</Label>
                <Input
                  id="last-name"
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
                <Label htmlFor="date">Fecha de Cumpleaños</Label>
                <DateTimePicker onChange={setDate} value={date} />
              </div>
            </div>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="+52 5512 3456"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
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
            <Button type="submit" className="w-full" onClick={CreateTherapist}>
              Inscribir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}