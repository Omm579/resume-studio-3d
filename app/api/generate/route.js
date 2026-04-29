const OLLAMA_URL = process.env.OLLAMA_HOST || "http://localhost:11434";

export async function POST(req) {
  try {
    const { prompt, stream } = await req.json();

    // 🔥 STREAM MODE
    if (stream) {
      const response = await fetch(`${OLLAMA_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3",
          prompt,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama responded with ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Failed to get reader from Ollama");

      const decoder = new TextDecoder();
      let buffer = "";

      const readableStream = new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Use stream: true to handle partial multi-byte characters
            buffer += decoder.decode(value, { stream: true });
            
            // Split by newline but keep the last (potentially incomplete) line in the buffer
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.trim()) continue;
              try {
                const json = JSON.parse(line);
                if (json.response) {
                  controller.enqueue(
                    new TextEncoder().encode(json.response)
                  );
                }
              } catch (e) {
                console.error("Error parsing Ollama stream chunk:", e, "Line:", line);
              }
            }
          }

          controller.close();
        },
      });

      return new Response(readableStream);
    }

    // 🔥 NORMAL MODE
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    return Response.json({
      success: true,
      text: data.response,
    });

  } catch (err) {
    console.error("OLLAMA ERROR:", err);

    return Response.json({
      success: false,
      text: `⚠️ AI generation failed: ${err.message || "Unknown error"}`,
    });
  }
}

export const runtime = "nodejs";