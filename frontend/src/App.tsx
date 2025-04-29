import React, { useEffect } from "react";
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
import { useLanguageStore } from "./store/languageStore";

const styles = {
  wrapper: {
    backgroundColor: "#052e39",
    backdropFilter: "blur(2rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as "relative",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as "column",
    gapY: "2rem",
    height: "95%",
  },
};

function App() {
  const currentLang = useLanguageStore((state) => state.currentLang);
  const setLang = useLanguageStore((state) => state.setLang);

  useEffect(() => {
    changeLanguage(currentLang); // re-translate on language change
  }, [currentLang]);

  const handleLanguageChange = async (lang: string) => {
    try {
      toast.loading(`Translating to ${lang.toUpperCase()}...`);
      await changeLanguage(lang);
      setLang(lang);
      toast.success("Translation complete!");
    } catch {
      toast.error("Translation failed.");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div style={styles.wrapper}>
      <LanguageSelector currentLang={currentLang} onChange={handleLanguageChange} />
      <div style={styles.container}>
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
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
