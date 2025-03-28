'use client'

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { IconUpload, IconBrain, IconFileText } from "@tabler/icons-react";
import jsPDF from "jspdf";

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
      setAnalysis(null); // Reset analysis when a new image is uploaded
    }
  };

  const analyzeImage = () => {
    if (!image) return;

    // Simulating AI analysis with a random result
    const results = ["Healthy ✅", "Pest Infected ⚠️", "Nutrient Deficiency ❌"];
    const randomResult = results[Math.floor(Math.random() * results.length)];
    setAnalysis(randomResult);
  };

  const downloadReport = () => {
    if (!analysis) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Crop Quality Analysis Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Analysis Result: ${analysis}`, 20, 40);
    doc.save("Crop-Analysis-Report.pdf");
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center p-6">
          <div className="max-w-lg w-full bg-white shadow-md p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold text-center">Crop Quality Detection</h2>

            {/* Upload Image */}
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-input"
              />
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => document.getElementById("file-input")?.click()} // Trigger file input
              >
                <IconUpload size={18} />
                Upload Crop Image
              </Button>
            </label>

            {/* Show Uploaded Image Preview */}
            {image && (
              <div className="flex justify-center">
                <img src={URL.createObjectURL(image)} alt="Crop Preview" className="h-40 object-cover rounded-md" />
              </div>
            )}

            {/* AI-Based Analysis */}
            <Button onClick={analyzeImage} disabled={!image} className="w-full flex items-center gap-2 bg-green-600">
              <IconBrain size={18} />
              Analyze Image
            </Button>

            {/* Display Analysis Result */}
            {analysis && (
              <div className="text-center text-lg font-medium">
                Analysis Result: <span className="text-green-600">{analysis}</span>
              </div>
            )}

            {/* Download Report */}
            <Button onClick={downloadReport} disabled={!analysis} className="w-full flex items-center gap-2 bg-blue-600">
              <IconFileText size={18} />
              Download Report
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
