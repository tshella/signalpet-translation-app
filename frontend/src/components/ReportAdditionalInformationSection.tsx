import InputTag from "./InputTag";
import { generateXrayAnalysisSummary } from "../utils/strings";
import TranslatedText from "./TranslatedText";

const styles = {
  title: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 600,
    paddingRight: "10%",
    alignSelf: "center",
    justifyCenter: "center",
    alignText: "center",
  },
};

const ReportAdditionalInformationSection = () => {
  return (
    <div>
      <span style={styles.title}>
        <TranslatedText>Summary:</TranslatedText>
      </span>
      <InputTag editable={true}>{generateXrayAnalysisSummary()}</InputTag>
    </div>
  );
};

export default ReportAdditionalInformationSection;
