export async function POST(req: Request) {
    const body = await req.json();
  
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbwwDatq0SiviRULvDJ9zw2uEjQBPwasOsQqG-xKqc23PKKzQS-Bst-3rpyPUcs5i1_V_Q/exec";
  
    try {
      const res = await fetch(googleScriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          action: "liberarTurno"  // 👈 ESTA LÍNEA ES CRUCIAL
        }),
      });
  
      const text = await res.text();
      const data = JSON.parse(text);
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, message: "Error de red o del servidor" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  