"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

const AdminEditor = () => {
  const [title, setTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const saveData = async () => {
    const widgetData = {
      name: title,
      type: title.toLowerCase().replace(" ", "-"),
      order: "10",
      data: htmlContent,
    };
    const response = await fetch("/api/widgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(widgetData),
    });

    if (response.ok) {
      alert("Veri başarıyla kaydedildi!");
    } else {
      alert("Bir hata oluştu!");
    }
  };

  return (
    <div className="p-4">
      <p className="mb-2 text-sm font-semibold">Title</p>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
        placeholder="Başlık"
      />
      <p className="mb-2 text-sm font-semibold">HTML Input</p>
      <Textarea
        value={htmlContent}
        minRows={30}
        onChange={(e) => setHtmlContent(e.target.value)}
        className="mb-4"
        placeholder="HTML içeriğini buraya yazın"
      />

      <p className="mb-2 text-sm font-semibold">Preview</p>
      <div
        className="border p-4 mb-4 relative overflow-hidden"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <Button
        onPress={saveData}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Kaydet
      </Button>
    </div>
  );
};

export default AdminEditor;