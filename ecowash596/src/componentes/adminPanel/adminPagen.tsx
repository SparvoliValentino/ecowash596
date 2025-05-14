"use client";

import { useState, useEffect } from "react";
import { Turno, fetchTodosLosTurnos } from "../../helper/appointmets"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const AdminPanel = () => {
    const [acceso, setAcceso] = useState(false);
    const [password, setPassword] = useState("");
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
    const [fechasDisponibles, setFechasDisponibles] = useState<string[]>([]);

    const CLAVE_ADMIN = process.env.NEXT_PUBLIC_CLAVE_ADMIN;

    const handleLogin = async () => {
        if (password === CLAVE_ADMIN) {
            setAcceso(true);
            await cargarTurnos();
        } else {
            alert("Contraseña incorrecta");
        }
    };

    const cargarTurnos = async () => {
        const data = await fetchTodosLosTurnos();
        setTurnos(data);

        const fechasUnicas = Array.from(new Set(data.map((t) => t.fecha)));
        setFechasDisponibles(fechasUnicas);

        if (fechasUnicas.length > 0) {
            setFechaSeleccionada(new Date(fechasUnicas[0] + "T00:00:00"));
        }
    };

    const liberarTurno = async (turno: Turno) => {
        const res = await fetch("/api/liberar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fecha: turno.fecha, hora: turno.hora }),
        });

        const data = await res.json();
        if (data.success) {
            Swal.fire("Turno liberado", "", "success");

            // ✅ Refrescamos la lista de turnos después de liberar
            await cargarTurnos();
        } else {
            Swal.fire("No se pudo liberar el turno", data.message || "", "error");
        }
    };

    const confirmarLiberacion = async (turno: Turno) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: `¿Deseás restablecer el turno del ${turno.fecha} a las ${turno.hora}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, liberar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await liberarTurno(turno);
        }
    };

    const estaDisponible = (date: Date) => {
        const dateFormatted = date.toISOString().split("T")[0];
        return fechasDisponibles.includes(dateFormatted);
    };

    const turnosFiltrados = turnos.filter((t) => {
        const fechaStr = fechaSeleccionada
            ? fechaSeleccionada.toISOString().split("T")[0]
            : "";
        return t.fecha === fechaStr;
    });

    const contactarPorWhatsApp = (telefono: string) => {
        const mensaje = encodeURIComponent(
            "Hola, te escribo desde EcoWash para informarte que tu auto ya está listo!"
        );
        const url = `https://wa.me/${telefono}?text=${mensaje}`;
        window.open(url, "_blank");
    };

    if (!acceso) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#252525] text-white">
                <h1 className="text-3xl font-bold mb-4">Acceso administrativo</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="p-2 rounded text-white"
                />
                <button
                    onClick={handleLogin}
                    className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                >
                    Ingresar
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#252525] w-full p-6 text-white ">
            <div className="max-w-[1500px] mx-auto flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6">Panel de turnos</h2>

                <div className="w-full flex gap-2 max-w-md mb-6">
                    <label className="block text-xl font-bold text-yellow-300 mb-2">
                        Filtrar por fecha:
                    </label>
                    <DatePicker
                        selected={fechaSeleccionada instanceof Date ? fechaSeleccionada : null}
                        onChange={(date: Date | null) => setFechaSeleccionada(date)}
                        dateFormat="yyyy-MM-dd"
                        filterDate={estaDisponible}
                        placeholderText="Seleccioná una fecha"
                        className="p-2 rounded w-full text-black bg-white"
                    />
                </div>

                <ul className="w-full flex flex-col items-center gap-4">
                    {turnosFiltrados.length === 0 ? (
                        <p className="text-yellow-300">No hay turnos para esta fecha.</p>
                    ) : (
                        turnosFiltrados.map((t, i) => (
                            <li
                                key={i}
                                className={`w-full max-w-md p-4 rounded-2xl border-2 ${t.estado === "reservado" ? "border-red-500" : "border-green-500"} bg-white flex flex-col gap-2 text-black`}
                            >
                                <div className="flex justify-between">
                                    <span className="font-bold">Hora:</span>
                                    <span>{t.hora}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold">Estado:</span>
                                    <span className={t.estado === "reservado" ? "text-red-600" : "text-green-600"}>{t.estado}</span>
                                </div>
                                {t.estado === "reservado" && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="font-bold">Teléfono:</span>
                                            <span>{t.telefono}</span>
                                        </div>
                                        <div className="flex gap-4 mt-2">
                                            {/* <button onClick={() => confirmarLiberacion(t)} className="bg-red-500 text-white font-semibold px-3 py-1 rounded hover:bg-red-600 transition">
                                                Liberar turno
                                            </button> */}
                                            <button onClick={() => contactarPorWhatsApp(t.telefono)} className="bg-green-500 text-white font-semibold px-3 py-1 rounded hover:bg-green-600 transition">
                                                Contactar por WhatsApp
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;

