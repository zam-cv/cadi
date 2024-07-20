import { useEffect, useState } from "react";
import api, { User, Student } from "@/utils/api";
import { columns } from "@/components/table/components/columns-students";
import { DataTable } from "@/components/table/components/data-table-students";
import moment from "moment";

interface Columns extends User, Student { }

export default function SeeStudents() {
  const [values, setValues] = useState<Columns[]>([]);

  useEffect(() => {
    api.student.list().then((v) => {
      let val = v.map(([user, students, relative, phone]) => {
        students.birthdate = moment(students.birthdate).format("DD - MM - YYYY")
        return { ...user, ...students, relative, phone }
      })

      setValues(val)
    })
  }, []);

  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Estudiantes</h2>
            <p className="text-muted-foreground">
              Lista de estudiantes registrados en el sistema
            </p>
          </div>
        </div>
        <DataTable
          data={values as any}
          columns={columns}
        />
      </div>
    </div>
  );
}