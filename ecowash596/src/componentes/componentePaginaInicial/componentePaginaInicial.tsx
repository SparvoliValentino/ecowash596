"use client";

import { useEffect, useState } from "react";
import { fetchTurnosDisponibles, getFechasUnicas, Turno } from "../../helper/appointmets";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';


export default function TurnosDisponibles() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [fechas, setFechas] = useState<string[]>([]);

  const API_URL = "/api/reservar";


  useEffect(() => {
    const cargarTurnos = async () => {
      const turnosDisponibles = await fetchTurnosDisponibles();
      const fechasUnicas = getFechasUnicas(turnosDisponibles);

      console.log("Fechas únicas cargadas:", fechasUnicas);

      setTurnos(turnosDisponibles);
      setFechas(fechasUnicas);

      if (fechasUnicas.length > 0) {
        // 🔥 Aseguramos que sea un Date válido
        const fechaValida = new Date(fechasUnicas[0] + "T00:00:00");
        setFechaSeleccionada(fechaValida);
      }
    };

    cargarTurnos();
  }, []);



  const estaDisponible = (date: Date) => {
    const dateFormatted = format(date, "yyyy-MM-dd"); // convierte el objeto date a "2025-04-29"
    return fechas.includes(dateFormatted); // compara contra el array de strings
  };

  const fechaStrSeleccionada = fechaSeleccionada
    ? fechaSeleccionada.toLocaleDateString("en-CA") // "YYYY-MM-DD"
    : "";



  console.log(fechaStrSeleccionada)


  const turnosFiltrados = turnos.filter(
    (t) => t.fecha === fechaStrSeleccionada
  );



  const reservarTurno = async (turno: Turno) => {
    const { value: formValues } = await Swal.fire({
      title: `Reservar ${turno.hora} - ${turno.fecha}`,
      html: `
        <input id="swal-auto" class="swal2-input" placeholder="Modelo o patente del vehiculo">
        <input id="swal-telefono" class="swal2-input" placeholder="Teléfono para contactarte">
        <select id="swal-lavado" class="swal2-select">
          <option value="">Tipo de lavado</option>
          <option value="basica">Convencional</option>
          <option value="premium">Premium</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Confirmar reserva",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const auto = (document.getElementById("swal-auto") as HTMLInputElement)?.value.trim();
        const telefono = (document.getElementById("swal-telefono") as HTMLInputElement)?.value.trim();
        const tipoLavado = (document.getElementById("swal-lavado") as HTMLSelectElement)?.value;
  
        if (!auto || !telefono || !tipoLavado) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return;
        }
  
        return { auto, telefono, tipoLavado };
      }
    });
  
    if (formValues) {
      // ✅ Mostrar el Swal de carga
      Swal.fire({
        title: "Reservando tu turno...",
        text: "Por favor, espera un momento.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      // ✅ Cortamos la hora a los primeros 5 caracteres: "08:30"
      const horaFormateada = turno.hora?.toString().slice(0, 5);
  
      try {
        console.log("📤 Datos enviados al backend:", {
          fecha: turno.fecha,
          hora: horaFormateada,
          auto: formValues.auto,
          telefono: formValues.telefono,
          tipoLavado: formValues.tipoLavado,
        });
  
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fecha: turno.fecha,
            hora: horaFormateada,
            auto: formValues.auto,
            telefono: formValues.telefono,
            tipoLavado: formValues.tipoLavado,
          }),
        });
  
        const data = await res.json();
        Swal.close(); // ✅ Cerrar Swal de carga
  
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "¡Turno reservado!",
            text: "Te esperamos en el lavadero 🚗🫧",
          });
  
          setTurnos((prev) =>
            prev.filter((t) => !(t.fecha === turno.fecha && t.hora === turno.hora))
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo reservar",
            text: data.message || "Ya fue reservado por otra persona.",
          });
        }
      } catch (err) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error de red",
          text: "No se pudo conectar con el servidor.",
        });
      }
    }
  };
  
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-5xl text-white bangers-regular text-center font-bold mb-4">Reservá tu turno</h1>
      <div className="w-full flex flex-col justify-start items-center gap-5">
        <label className="block text-2xl font-bold text-yellow-300 mb-2">Seleccioná una fecha:</label>
        <DatePicker
          selected={fechaSeleccionada instanceof Date && !isNaN(fechaSeleccionada.getTime()) ? fechaSeleccionada : null}
          onChange={(date: Date | null) => setFechaSeleccionada(date)}
          dateFormat="yyyy-MM-dd"
          filterDate={estaDisponible}
          placeholderText="Seleccioná una fecha"
          className="mb-4 p-2 rounded w-full text-black bg-white inset-shadow-strong"
        />

      </div>
      <div className="w-full flex flex-col justify-start items-center gap-5">
        <h2 className="text-2xl text-yellow-300 font-bold">Turnos disponibles:</h2>
        <ul className="space-y-4">
          {turnosFiltrados.length === 0 ? (
            <p className="text-sm text-yellow-400">No hay turnos disponibles para esta fecha.</p>
          ) : (
            turnosFiltrados.map((turno, i) => (
              <li
                key={i}
                className="bg-white w-[400px] p-2 rounded-2xl inset-shadow-strong flex justify-evenly items-center border-2 border-[#C62828]"
              >
                <div className="flex flex-col">
                  <h2 className="text-black">Horario:</h2>
                  <span className="text-black font-black text-2xl">{turno.hora}</span>
                </div>
                <button
                  className="bg-[#FFEB3B] text-black font-semibold px-3 py-1 rounded hover:bg-[#FFEB3B]"
                  onClick={() => reservarTurno(turno)}
                >
                  Reservar
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
