import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

import {
  SquareGanttChart
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const sections = [
  {
    route: "see_dashboard",
    title: "Dashboard",
    description: "Ver estadísticas y conocimientos",
    details: "Estudiantes, Terapeutas, etc"
  },
  {
    route: "enroll_students",
    title: "Inscribir Estudiantes",
    description: "Inscribir estudiantes en el sistema",
    details: "Agregar estudiantes, asignar terapeutas, etc"
  },
  {
    route: "enroll_therapists",
    title: "Inscribir Terapeutas",
    description: "Inscribir terapeutas en el sistema",
    details: "Agregar terapeutas, etc"
  },
  {
    route: "see_calculator",
    title: "Calculadora",
    description: "Calcular comidas",
    details: "Porciones, Capacidad, etc"
  },
  {
    route: "see_production_reports",
    title: "Ver Reportes de Producción",
    description: "Reportes, inventario, etc",
    details: "Filtrar, Analizar, etc"
  },
  {
    route: "see_reports",
    title: "Ver Reportes",
    description: "Reportes, asociaciones, etc",
    details: "Filtrar, Analizar, etc"
  },
  {
    route: "see_students",
    title: "Ver Estudiantes",
    description: "Calificaciones, detalles, etc",
    details: "Seguimiento, etc"
  },
  {
    route: "see_therapists",
    title: "Ver Terapeutas",
    description: "Información, asignaciones, etc",
    details: "Seguimiento, etc"
  },
  {
    route: "make_production_reports",
    title: "Hacer Reportes de Producción",
    description: "Crear reportes de producción",
    details: "Agregar, etc"
  },
  {
    route: "make_reports",
    title: "Hacer Reportes",
    description: "Crear reportes",
    details: "Agregar, etc"
  },
  {
    route: "see_reports_as_relative",
    title: "Ver Reportes como Familiar",
    description: "Ver reportes como familiar",
    details: "Filtrar, Analizar, etc"
  }
]

function Section(
  { route, title, description, details }:
    { route: string, title: string, description: string, details: string }
) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/${route}`)
  }

  return (
    <Card x-chunk="event" className="cursor-pointer select-none" onClick={handleClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          {title}
        </CardTitle>
        <SquareGanttChart className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">{description}</div>
        <p className="text-xs text-muted-foreground">
          {details}
        </p>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const { userInformation } = useAuth()

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 p-5">
      {
        userInformation.permissions.map((permission, i) => {
          const section = sections.find((section) => section.route === permission)

          if (section) {
            return (
              <Section
                key={i}
                route={section.route}
                title={section.title}
                description={section.description}
                details={section.details}
              />
            )
          }

          return null
        })
      }
    </div>
  );
}