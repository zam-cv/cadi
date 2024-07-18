import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { handleKeyDown, handleEnter } from "@/utils";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Login() {
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { signin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    signin(email, password, navigate);
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar Sesión en Cadi Go</CardTitle>
          <CardDescription>
            Ingresa tu correo y contraseña para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
              <Input
                ref={passwordRef}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleEnter(e, handleLogin)}
                required />
            </div>
            <Button type="submit" onClick={handleLogin} className="w-full font-bold">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
