import { format, isValid, parseISO , parse} from "date-fns";

export interface Turno {
  fecha: string;
  hora: string;
  estado: string;
  auto: string;
  telefono: string;
  tipoLavado: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1ymGrDdw4LHRXU4mMzkY2rZ-dt4RYu3mjQJauK_Di8ic/gviz/tq?tqx=out:json"

export const fetchTurnosDisponibles = async (): Promise<Turno[]> => {
  const response = await fetch(SHEET_URL);
  const text = await response.text();
  
  const regex = /google\.visualization\.Query\.setResponse\(([\s\S]*)\);/;
  const match = text.match(regex);
  
  if (!match || !match[1]) {
    throw new Error("El contenido recibido no es del tipo GViz esperado.");
  }
  
  const jsonData = JSON.parse(match[1]);

  // Mapear cada fila a un objeto Turno
  const rows: Turno[] = jsonData.table.rows.map((row: { c: { v?: any; f?: any }[] }): Turno => {
    const c = row.c;

    let fecha = "";

    // ✅ Verificamos si existe como fecha y la convertimos
    if (c[0]?.f) {
      fecha = format(parseISO(c[0].f), "yyyy-MM-dd");
    } else if (c[0]?.v && typeof c[0]?.v === "string") {
      fecha = c[0]?.v.trim();
    } else if (c[0]?.v instanceof Date) {
      fecha = format(c[0]?.v, "yyyy-MM-dd");
    }

    return {
      fecha,
      hora: c[1]?.v?.toString().trim() ?? "",
      estado: c[2]?.v?.toString().trim().toLowerCase() ?? "",
      auto: c[3]?.v?.toString().trim() ?? "",
      telefono: c[4]?.v?.toString().trim() ?? "",
      tipoLavado: c[5]?.v?.toString().trim() ?? ""
    };
  });
  
  console.log("📅 Turnos recibidos del Sheet:", rows);
  
  return rows.filter((row: Turno) => row.estado === "disponible");
};


export const getFechasUnicas = (turnos: Turno[]): string[] => {
  const fechasSet = new Set(
    turnos
      .map((t) => {
        const date = parseISO(t.fecha); // ✅ Usamos parseISO
        return isValid(date) ? format(date, "yyyy-MM-dd") : null;
      })
      .filter((f): f is string => f !== null)
  );

  console.log("📅 Fechas válidas detectadas:", Array.from(fechasSet));

  return Array.from(fechasSet);
};

export const fetchTodosLosTurnos = async (): Promise<Turno[]> => {
  const response = await fetch(SHEET_URL);
  const text = await response.text();

  const regex = /google\.visualization\.Query\.setResponse\(([\s\S]*)\);/;
  const match = text.match(regex);

  if (!match || !match[1]) {
    throw new Error("El contenido recibido no es del tipo GViz esperado.");
  }

  const jsonData = JSON.parse(match[1]);

  const rows: Turno[] = jsonData.table.rows.map((row: { c: { v?: any; f?: any }[] }): Turno => {
    const c = row.c;

    return {
      fecha:
        c[0]?.v instanceof Date
          ? format(c[0].v, "yyyy-MM-dd")
          : typeof c[0]?.v === "string"
            ? c[0].v.trim()
            : "",
      hora: c[1]?.v?.toString().trim() ?? "",
      estado: c[2]?.v?.toString().trim().toLowerCase() ?? "",
      auto: c[3]?.v?.toString().trim() ?? "",
      telefono: c[4]?.v?.toString().trim() ?? "",
      tipoLavado: c[5]?.v?.toString().trim() ?? ""
    };
  });

  return rows; // 🔥 No filtramos por estado
};


