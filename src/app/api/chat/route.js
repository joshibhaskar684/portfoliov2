import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: "No message provided" }, { status: 400 });

    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    const chatCompletion = await client.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-beta:fastest",
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("HF API ERROR:", error);

    // Return the error body from Hugging Face if available
    const msg = error?.httpResponse?.body?.error || error.message;
    return NextResponse.json({ error: `HF API Error: ${msg}` }, { status: 500 });
  }
}