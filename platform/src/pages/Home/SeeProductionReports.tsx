import { useEffect, useState } from "react";
import api, { Report, ProductionReport } from "@/utils/api";
import { columns } from "@/components/table/components/columns-production-report";
import { DataTable } from "@/components/table/components/data-table-production-report";
import moment from "moment";

interface Columns extends Report, ProductionReport { }

export default function SeeProductionReports() {
  const [values, setValues] = useState<Columns[]>([]);

  useEffect(() => {
    api.productionReports.list().then((v) => {
      let val = v.map(([report, productionReport]) => {
        report.created_at = moment(report.created_at).format("DD - MM - YYYY")
        return { ...report, ...productionReport }
      })

      setValues(val)
    })
  }, []);

  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Reportes de Producción</h2>
            <p className="text-muted-foreground">
              Lista de reportes de producción.
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