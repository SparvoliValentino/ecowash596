// helpers/fetchTurnos.ts
export interface Turno {
    fecha: string;
    hora: string;
    estado: string;
    nombre: string;
    telefono: string;
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
  
    const headers = jsonData.table.cols.map((col: any) =>
      col.label.toLowerCase().trim()
    );
    
  
    const rows = jsonData.table.rows.map((row: any) =>
      row.c.reduce((obj: any, cell: any, i: number) => {
        obj[headers[i]] = cell?.f || cell?.v || "";
        return obj;
      }, {})
    );
    
    return rows.filter((row: Turno) =>
      row.estado?.toLowerCase().trim() === "disponible"
    );
    
  };
  
  export const getFechasUnicas = (turnos: Turno[]): string[] => {
    const fechas = turnos.map(t => t.fecha);
    return Array.from(new Set(fechas));
  };
  