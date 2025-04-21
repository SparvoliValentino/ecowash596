"use client";

import { useEffect, useState } from "react";
import { fetchTurnosDisponibles, getFechasUnicas, Turno } from "../../helper/appointmets";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TurnosDisponibles() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [fechas, setFechas] = useState<string[]>([]);

  const API_URL = "/api/reservar";



  useEffect(() => {
    const cargarTurnos = async () => {
      const turnosDisponibles = await fetchTurnosDisponibles();
      const fechasUnicas = getFechasUnicas(turnosDisponibles);
      setTurnos(turnosDisponibles);
      setFechas(fechasUnicas);

      if (fechasUnicas.length > 0) {
        setFechaSeleccionada(new Date(fechasUnicas[0]));
      }
    };

    cargarTurnos();
  }, []);

  const estaDisponible = (date: Date) => {
    return fechas.some(
      (f) => new Date(f).toDateString() === date.toDateString()
    );
  };

  const fechaStrSeleccionada = fechaSeleccionada?.toISOString().split("T")[0] ?? "";

  const turnosFiltrados = turnos.filter(
    (t) => t.fecha === fechaStrSeleccionada
  );

  const reservarTurno = async (turno: Turno) => {
    const { value: formValues } = await Swal.fire({
      title: `Reservar ${turno.hora} - ${turno.fecha}`,
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Tu nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Teléfono">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Confirmar reserva",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = (document.getElementById("swal-input1") as HTMLInputElement)?.value.trim();
        const telefono = (document.getElementById("swal-input2") as HTMLInputElement)?.value.trim();

        if (!nombre || !telefono) {
          Swal.showValidationMessage("Ambos campos son obligatorios");
          return;
        }

        return { nombre, telefono };
      }
    });

    if (formValues) {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // 👈 esto fuerza preflight
          },
          body: JSON.stringify({
            fecha: turno.fecha,
            hora: turno.hora,
            nombre: formValues.nombre,
            telefono: formValues.telefono,
          }),
        });

        const data = await res.json();

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "¡Turno reservado!",
            text: "Te esperamos en el lavadero 🚗🫧",
          });

          // Eliminar el turno reservado del estado
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
      <h1 className="text-xl font-bold mb-4">Reservá tu turno</h1>

      <label className="block text-sm font-medium text-gray-200 mb-2">Seleccioná una fecha:</label>
      <DatePicker
        selected={fechaSeleccionada}
        onChange={(date: Date | null) => setFechaSeleccionada(date)}
        dateFormat="yyyy-MM-dd"
        filterDate={estaDisponible}
        placeholderText="Seleccioná una fecha"
        className="mb-4 p-2 rounded w-full text-black"
      />

      <ul className="space-y-2">
        {turnosFiltrados.length === 0 ? (
          <p className="text-sm text-gray-400">No hay turnos disponibles para esta fecha.</p>
        ) : (
          turnosFiltrados.map((turno, i) => (
            <li
              key={i}
              className="p-3 bg-white rounded shadow flex justify-between items-center"
            >
              <span className="text-black">{turno.hora}</span>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => reservarTurno(turno)}
              >
                Reservar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
