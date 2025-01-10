"use client";

import { FormModal } from "@/app/components/blocks/FormModal";
import HeroWidget from "@/app/components/widgets/hero";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [heroBackup, setHeroBackup] = useState(null);
  const [heroData, setHeroData] = useState<any | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      const res = await fetch("/api/components/hero");
      const data = await res.json();
      setHeroBackup(data);
      setHeroData(data);
    };

    fetchHeroData();
  }, []);

  const handleInputChange = (path: string, value: string) => {
    const newData = { ...tempData };
    const keys = path.split(".");
    let current = newData;
    keys.slice(0, -1).forEach((key) => {
      if (!current[key]) current[key] = {};
      current = current[key];
    });
    current[keys[keys.length - 1]] = value;
    setTempData(newData);
  };

  const startEditing = (section: string) => {
    setTempData({ ...heroData });
    setEditing(section);
  };

  const handleSave = async () => {
    if (window.confirm("Are you sure you want to save changes?")) {
      const res = await fetch("/api/components/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempData),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setHeroData(updatedData);
        setEditing(null);
      } else {
        console.error("Failed to save data.");
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  if (!heroData) return <div>Loading...</div>;

  const renderInputFields = (obj: any, path: string[] = []) => {
    return Object.keys(obj).map((key) => {
      const currentPath = [...path, key].join(".");
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return (
          <div key={currentPath} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{key}</h3>
            {renderInputFields(obj[key], [...path, key])}
          </div>
        );
      } else if (key !== "_id" && key !== "__v") {
        let description;
        switch (key) {
          case "className":
            description = "CSS classes for styling this element.";
            break;
          case "text":
            description = "The content or text displayed in this element.";
            break;
          case "href":
            description = "The link URL for this element, if applicable.";
            break;
          case "clipPath":
            description =
              "Defines the clipping path for the background effect.";
            break;
          default:
            description = `Description for ${key}.`;
        }

        return (
          <div key={currentPath} className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {key}
              <span className="ml-2 font-light text-gray-500 text-xs">
                {description}
              </span>
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={
                  tempData ? String(getValueByPath(tempData, currentPath)) : ""
                }
                onChange={(e) => handleInputChange(currentPath, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );
      }
    });
  };

  const getValueByPath = (obj: any, path: string) => {
    return path.split(".").reduce((o, i) => o && o[i], obj);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero</h1>
        <button
          onClick={() => startEditing("global")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>

      <div className="relative overflow-hidden">
        <HeroWidget data={heroData} />
      </div>
      {editing && (
        <FormModal
          title={`Editing ${editing}`}
          portalId="hero-modal"
          childrenClassName="flex flex-col px-4"
          open={editing}
          setOpen={setEditing}
        >
          <div className="space-y-4">
            {editing === "global"
              ? renderInputFields(heroData, [])
              : renderInputFields(getValueByPath(heroData, editing), [editing])}
          </div>
          <div className="space-x-4 sticky bottom-0 bg-white p-4 left-0 right-0">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </FormModal>
      )}
    </div>
  );
}