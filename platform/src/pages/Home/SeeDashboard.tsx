// Import the information to use the charts

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

// Import the information to get information from the API

import { useEffect, useState } from "react";
import api, { User, Student} from "@/utils/api";
import moment from "moment";
import { parseArgs } from "util"

interface StudentQ extends User, Student { }

// interface TherapistQ extends User, Therapist { }

// Define the AreaType enum
enum AreaType {
  Academic = 'Academic',
  Social = 'Social',
  Emotional = 'Emotional',
  Physical = 'Physical',
  Cognitive = 'Cognitive',
  Language = 'Language',
  Sensory = 'Sensory',
  Behavioral = 'Behavioral',
  Play = 'Play',
  Work = 'Work',
  Leisure = 'Leisure',
  SocialSkills = 'SocialSkills',
  Communication = 'Communication',
  Mobility = 'Mobility',
  Independence = 'Independence',
  Safety = 'Safety',
  Nutrition = 'Nutrition',
  Hygiene = 'Hygiene',
  Sleep = 'Sleep',
  Toileting = 'Toileting',
  Grooming = 'Grooming',
  Feeding = 'Feeding',
  Drinking = 'Drinking',
  Eating = 'Eating',
}

export default function SeeDashboard() {
  const [valuesStud, setValuesStud] = useState<StudentQ[]>([]);
  const [studentCount, setStudentCount] = useState(-1); // Add state for student count
  const [ages, setAges] = useState<number[]>([]); // Add state for ages array
  const [ageCounts, setAgeCounts] = useState<{ [key: number]: number }>({}); // Add state for age counts
  const [agesArrayFormatted, setAgesArrayFormatted] = useState<{ age: number; numberStudents: number }[]>([]); // Add state for formatted ages array
  const [meanAge, setMeanAge] = useState<number>(0); // Add state for mean age
  const [valuesTher, setValuesTher] = useState<TherapistQ[]>([]);
  const [therapistCount, setTherapistCount] = useState(-1); // Add state for student count
  const [prodReportsCount, setProdReportsCount] = useState(0); // Add state for production reports count
  const [areaTypeArrayFormatted, setAreaTypeArrayFormatted] = useState<{ areaType: string; numberReports: number }[]>([]); // Add state for formatted ages array


  useEffect(() => {
    // Counts the number of students
    api.students.list().then((v) => {
      let valStud = v.map(([user, students, relative, phone]) => {
        return { ...students, ...user, relative, phone }
      });

      setValuesStud(valStud);
      setStudentCount(valStud.length); // Update the student count
    
      // Calculate ages and age counts
      const currentYear = moment().year();
      const agesArray = valStud.map(student => currentYear - moment(student.birthdate, "DD - MM - YYYY").year());
      
      setAges(agesArray);
    
      const ageCountsMap = agesArray.reduce((acc, age) => {
        acc[age] = (acc[age] || 0) + 1;
        return acc;
      }, {});
      setAgeCounts(ageCountsMap);

      // Format ageCountsMap into ages array of objects
      const formattedAgesArray = Object.keys(ageCountsMap).map(age => ({
        age: parseInt(age),
        numberStudents: ageCountsMap[age]
      }));
      setAgesArrayFormatted(formattedAgesArray);
      // Calculate mean age
      const totalAges = agesArray.reduce((acc, age) => acc + age, 0);
      const meanAgeValue = totalAges / studentCount;
      setMeanAge(meanAgeValue);
    });
    
    // Counts the number of therapists
    // api.therapists.list().then((v) => {
    //   let valTher = v.map(([user, therapists]) => {
    //     return { ...therapists, ...user }
    //   });
    //   setValuesTher(valTher);
    // });

    // Update the state of therapist count using the api therapists.count
    api.therapists.count().then((v) => {
      setTherapistCount(v);
    }).catch((error) => {
      console.error('Failed to count therapists:', error);
    });
    

    // Update the state of production reports count using the api productionReports.count
    api.productionReports.count().then((v) => {
      setProdReportsCount(v);
    });

    // Update the state of areaTypeArrayFormatted using the student_reports.api
    const fetchData = async () => {
      const result = await Promise.all(
        Object.keys(AreaType).map(async (area) => ({
          areaType: AreaType[area],
          numberReports: await api.studentReports.countArea(area),
        }))
      );

      setAreaTypeArrayFormatted(result);

    };

    fetchData();
    
    
  }, []);

  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <Card
          className="lg:max-w-md" x-chunk="charts-01-chunk-0"
        >
          <CardHeader className="space-y-0 pb-2">
            {/* <CardDescription>Edades de los Alumnos</CardDescription> */}
            <CardTitle className="text-4xl tabular-nums">
              Edades{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                de los alumnos
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                numberStudents: {
                  label: "# de Estudiantes",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                data={[{age:10, numberStudents: 20}, {age:20, numberStudents: 30}, {age:30, numberStudents: 40}]} // agesArrayFormatted
              >
                <Bar
                  dataKey="numberStudents"
                  fill="var(--color-numberStudents)"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="age"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value) => parseInt(value) + "\naños"}
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                    />
                  }
                  cursor={false}
                />
                <ReferenceLine
                  y={20} // meanAge
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Promedio de Edades"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value={20} // meanAge
                    className="text-lg"
                    fill="hsl(var(--foreground))"
                    offset={10}
                    startOffset={100}
                  />
                </ReferenceLine>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              El promedio de edad de los alumnos es de{" "}
              <span className="font-medium text-foreground">{20}</span> años. {/*meanAge*/}
            </CardDescription>
          </CardFooter>
        </Card>
        <Card
          className="lg:max-w-md" x-chunk="charts-01-chunk-0"
        >
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Reportes de Alumnos por Área</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              500{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                reportes en total
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                numberReports: {
                  label: "# de Reportes",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                data={areaTypeArrayFormatted} // areaTypeArrayFormatted
              >
                <Bar
                  dataKey="numberReports"
                  fill="var(--color-numberReports)"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="areaType"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                    />
                  }
                  cursor={false}
                />
                <ReferenceLine
                  y={20} // meanAge
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Promedio de Reportes"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value={20} // meanAge
                    className="text-lg"
                    fill="hsl(var(--foreground))"
                    offset={10}
                    startOffset={100}
                  />
                </ReferenceLine>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              El promedio de reportes generados por area es de{" "}
              <span className="font-medium text-foreground">{20}</span> años. {/*meanAge*/}
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-2"
        >
          <CardHeader>
            <CardTitle>Comunidad</CardTitle>
            <CardDescription>
              Cantidad de alumnos y terapeutas en la organización
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {studentCount}
                <span className="text-sm font-normal text-muted-foreground">
                  alumnos
                </span>
              </div>
              <ChartContainer
                config={{
                  numberStudents: {
                    label: "Students",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      labelStudents: "", // Cantidad de alumnos
                      numberStudents: studentCount,
                    },
                  ]}
                >
                  <Bar
                    dataKey="numberStudents"
                    fill="var(--color-numberStudents)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="labelStudents" // label_students
                      offset={8}
                      fontSize={12}
                      fill="white"
                    />
                  </Bar>
                  <YAxis dataKey="labelStudents" type="category" tickCount={1} hide />
                  <XAxis dataKey="numberStudents" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {therapistCount}
                <span className="text-sm font-normal text-muted-foreground">
                  terapeutas
                </span>
              </div>
              <ChartContainer
                config={{
                  numberTherapists: {
                    label: "Therapists",
                    color: "hsl(var(--muted))",
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      labelTherapists: "", // Cantidad de terapeutas
                      numberTherapists: therapistCount,
                    },
                  ]}
                >
                  <Bar
                    dataKey="numberTherapists"
                    fill="var(--color-numberTherapists)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="labelTherapists"
                      offset={8}
                      fontSize={12}
                      fill="hsl(var(--muted-foreground))"
                    />
                  </Bar>
                  <YAxis dataKey="labelTherapists" type="category" tickCount={1} hide />
                  <XAxis dataKey="numberTherapists" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-4"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Estudiantes con más Reportes</CardTitle>
            <CardDescription>
              Estudiantes con mayor incidencias en el sistema de cualesquiera área. 
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 p-4 pb-2">
            <ChartContainer
              config={{
                move: {
                  label: "Move",
                  color: "hsl(var(--chart-1))",
                },
                stand: {
                  label: "Stand",
                  color: "hsl(var(--chart-2))",
                },
                exercise: {
                  label: "Exercise",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                  {
                    activity: "stand",
                    value: (8 / 12) * 100,
                    label: "8/12 hr",
                    fill: "var(--color-stand)",
                  },
                  {
                    activity: "exercise",
                    value: (46 / 60) * 100,
                    label: "46/60 min",
                    fill: "var(--color-exercise)",
                  },
                  {
                    activity: "move",
                    value: (245 / 360) * 100,
                    label: "245/360 kcal",
                    fill: "var(--color-move)",
                  },
                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Move</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  562
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  73
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Stand</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  14
                  <span className="text-sm font-normal text-muted-foreground">
                    hr
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid w-full flex-1 gap-6">
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-6"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Reportes de Producción</CardTitle>
            <CardDescription>
              Se han generado un total de {prodReportsCount} reportes de producción. 
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
            <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
              {prodReportsCount}
              <span className="text-sm font-normal text-muted-foreground">
                reportes
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
