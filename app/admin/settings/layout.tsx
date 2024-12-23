import { connectDB } from "@/app/lib/mongodb";
import React from "react";
import Settings from "./page";
import { GlobalSettings } from "@/app/models/GlobalSettings";

export default async function SettingsLayout() {
  await connectDB();
  const projects = await GlobalSettings.find().lean();
  const serializedSettings = JSON.parse(JSON.stringify(projects));
  return (
    <div>
      <Settings settings={serializedSettings} />
    </div>
  );
}
