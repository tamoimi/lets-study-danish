"use client";

import { useState } from "react";

export default function TranslatePage() {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState<"EN" | "DA">("EN");
  const [translation, setTranslation] = useState("");

  const handleTranslate = async () => {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang }),
    });

    const data = await res.json();
    setTranslation(data.translatedText);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Danish ↔ English Translator</h1>

      <textarea
        className="border p-2 w-full mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Danish or English"
      />

      <div className="mb-2">
        <label className="mr-2">Translate to:</label>
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value as "EN" | "DA")}
          className="border p-1"
        >
          <option value="EN">English</option>
          <option value="DA">Danish</option>
        </select>
      </div>

      <button
        onClick={handleTranslate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Translate
      </button>

      {translation && (
        <p className="mt-4 text-green-700">Translation: {translation}</p>
      )}
    </div>
  );
}
