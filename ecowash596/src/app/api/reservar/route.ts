export async function POST(req: Request) {
  const body = await req.json();
  const googleScriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";

  if (!googleScriptURL) {
    return new Response(
      JSON.stringify({ success: false, message: "URL de Google Script no configurada" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const res = await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        action: "reservarTurno"
      }),
    });

    const text = await res.text();
    console.log("RESPUESTA RAW DE GOOGLE SCRIPT:", text);

    let data;
    try {
      data = JSON.parse(text);
      console.log("📦 Respuesta del servidor (parsed):", data);
    } catch (err) {
      console.error("No se pudo parsear JSON:", err);
      return new Response(
        JSON.stringify({ success: false, message: "Google Script no devolvió JSON válido" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("ERROR en /api/reservar:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Error al contactar con Google Script" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

  