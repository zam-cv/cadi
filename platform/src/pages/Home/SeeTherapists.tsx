import { useEffect, useState } from "react";
import api, { User, Therapist } from "@/utils/api";
import { columns } from "@/components/table/components/columns-therapists";
import { DataTable } from "@/components/table/components/data-table-therapists";
import moment from "moment";

interface Columns extends User, Therapist { }

export default function SeeTherapists() {
  const [values, setValues] = useState<Columns[]>([]);

  useEffect(() => {
    api.therapists.list().then((v) => {
      let val = v.map(([user, therapists]) => {
        therapists.birthdate = moment(therapists.birthdate).format("DD - MM - YYYY")
        return { ...user, ...therapists }
      })

      setValues(val)
    })
  }, []);

  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Terapeutas</h2>
            <p className="text-muted-foreground">
              Lista de terapeutas registrados en el sistema
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