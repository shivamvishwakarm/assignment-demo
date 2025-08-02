"use client";
import { FileUpload, RejectedFile } from "file-upload-library"
import { useState } from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(
      {
        variant: "dropzone",
        maxFiles: 2,
        label: "Upload your documents",
        accept: ["image/png", "image/jpeg"],
        maxSizeMB: 2,
        theme: {
          radius: "md",
          size: "sm",
          borderStyle: "dashed",
          iconPlacement: "top",
        },
      },
      null,
      2
    )
  );

  const [parsedConfig, setParsedConfig] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileUploadError, setFileUploadError] = useState<RejectedFile[]>([]);

  const handleConfigChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const json = e.target.value;
    setJsonInput(json);
    try {
      const parsed = JSON.parse(json);
      setParsedConfig(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON");
    }
  };

  return (
    <div className=" p-8 w-full h-screen space-y-6 flex flex-row gap-10">
      <div className="w-full">
        <h1 className="text-2xl font-bold">File Upload Config Editor</h1>

        <textarea
          value={jsonInput}
          onChange={handleConfigChange}
          rows={25}
          className="w-full border p-3 font-mono rounded"
        />

        {error && <div className="text-red-600">{error}</div>}
      </div>
      {parsedConfig && (
        <div className="border rounded-lg p-6 mt-6 shadow w-full">
          <FileUpload
            className="w-full"
            config={parsedConfig}
            onFileAccept={(file) => console.log("✅ Selected:", file)}
            onFileReject={(errr) => setFileUploadError(errr)}
            onFileChange={(file) => console.log("✅ Changed:", file)}
          />
          {fileUploadError.length > 0 && (
            <div className="text-red-600">
              {fileUploadError.map((err, i) => (
                <div key={i}>
                  {err.file.name} - {err.reason}
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}