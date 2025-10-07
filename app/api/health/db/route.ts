import mongoose from "mongoose";
import { connectToDatabase } from "@/database/mongoose";

export async function GET() {
  const startedAt = Date.now();

  try {
    await connectToDatabase();

    // Explicit ping to verify connectivity to the MongoDB server
    // Using the underlying driver admin command for a reliable health signal
    const admin = mongoose.connection.db?.admin();
    await admin?.command({ ping: 1 });

    const latencyMs = Date.now() - startedAt;
    return Response.json(
      {
        ok: true,
        status: "connected",
        latencyMs,
        dbName: mongoose.connection.db?.databaseName ?? null,
        host: mongoose.connection.host,
        readyState: mongoose.connection.readyState,
        nodeEnv: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch (error) {
    const latencyMs = Date.now() - startedAt;
    return Response.json(
      {
        ok: false,
        status: "error",
        latencyMs,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
