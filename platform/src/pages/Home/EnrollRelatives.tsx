import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/utils/api"

export default function EnrollRelatives() {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  function CreateRelative() {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      location === "" ||
      phone === "" ||
      password === ""
    ) {
      return;
    }

    api.relatives.create({
      email,
      password
    }, {
      firstname: firstName,
      lastname: lastName,
      location,
      phone
    }).then(() => {
      setFirstName("")
      setLastName("")
      setEmail("")
      setLocation("")
      setPhone("")
      setPassword("")
    })
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Inscribir Parientes</CardTitle>
          <CardDescription>
            Ingresa los datos del pariente a inscribir.
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
                <Label htmlFor="date">Ubicación</Label>
                <Input
                  id="location"
                  type="location"
                  placeholder="Calle 123, Colonia, Ciudad, Estado"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  required
                />
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
            <Button
              type="submit"
              className="w-full"
              onClick={CreateRelative}>
              Inscribir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}