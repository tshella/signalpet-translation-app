import React, { useState, useEffect } from "react";
import "./App.css";
import ReportHeader from "./components/ReportHeader";
import ReportPage from "./components/ReportPage";
import ReportSection from "./components/ReportSection";
import ReportBasicInfoSection from "./components/ReportBasicInfoSection";
import ReportAdditionalInformationSection from "./components/ReportAdditionalInformationSection";
import { additionalInformation } from "./utils/constants";
import LanguageSelector from "./components/LanguageSelector";
import { changeLanguage } from "./i18n";
import { Toaster, toast } from "react-hot-toast";
import html2pdf from "html2pdf.js";

const styles = {
  wrapper: {
    backgroundColor: "#052e39",
    backdropFilter: "blur(2rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as const,
    minHeight: "100vh",
    position: "relative" as const,
    paddingTop: "2rem",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as const,
    gap: "2rem",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
  },
  buttons: {
    marginTop: "1rem",
    display: "flex",
    gap: "1rem",
  },
  button: {
    backgroundColor: "#064c60",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s",
  },
};

function App() {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage");
    if (storedLang) {
      setCurrentLang(storedLang);
    }
  }, []);

  const handleLanguageChange = async (lang: string) => {
    try {
      toast.loading(`Translating to ${lang.toUpperCase()}...`);
      await changeLanguage(lang);
      setCurrentLang(lang);
      toast.success("Translation complete!");
    } catch {
      toast.error("Translation failed.");
    } finally {
      toast.dismiss();
    }
  };

  const handleDownloadPDF = async () => {
    const report = document.getElementById("report-content");
    if (!report) return;

    toast.loading("Generating PDF...");

    const clone = report.cloneNode(true) as HTMLElement;

    const options = {
      margin:       [10, 10, 20, 10], // top, left, bottom, right
      filename:     "signal-report.pdf",
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak:    { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf()
      .from(clone)
      .set(options)
      .toPdf()
      .get("pdf")
      .then((pdf: any) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.text(`Page ${i} of ${totalPages}`, 105, 290, { align: "center" });
        }
      })
      .save()
      .finally(() => {
        toast.dismiss();
        toast.success("PDF downloaded!");
      });
  };

  const handlePrint = () => {
    const printContents = document.getElementById("report-content")?.innerHTML;
    if (!printContents) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Signal Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 2rem; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={styles.wrapper}>
      <LanguageSelector currentLang={currentLang} onChange={handleLanguageChange} />

      <div id="report-content" style={styles.container}>
        <ReportHeader />
        <ReportPage>
          <ReportBasicInfoSection />
        </ReportPage>
        <ReportPage>
          <ReportSection title={additionalInformation.title}>
            <ReportAdditionalInformationSection />
          </ReportSection>
        </ReportPage>
      </div>

      <div style={styles.buttons}>
        <button style={styles.button} onClick={handleDownloadPDF}>
          📄 Download PDF
        </button>
        <button style={styles.button} onClick={handlePrint}>
          🖨️ Print
        </button>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
