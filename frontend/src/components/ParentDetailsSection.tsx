import { CSSProperties, useEffect, useState } from "react";
import InputTag from "./InputTag";
import { PatientDetailsModel, patientId, specie, gender, neutered } from "../models/patientDetails";
import { convertToReadableString } from "../utils/strings";
import { getRandomNumberInRange } from "../utils/numbers";
import { loadingText } from "../utils/constants";
import rawData from "../fetches/fetchPatientDetails.json";
import TranslatedText from "./TranslatedText";

// Safely coerce raw JSON to typed model
const patientDetailsData: Record<string, PatientDetailsModel> = Object.fromEntries(
  Object.entries(rawData).map(([key, val]) => [
    key,
    {
      ...val,
      species: val.species as specie,
      gender: val.gender as gender,
      neutered: val.neutered as neutered,
    },
  ])
);

const styles = {
  container: {
    display: "inline-grid",
    gridTemplateColumns: "1fr 1fr",
    width: "98%",
    paddingLeft: "2%",
    paddingBottom: "2%",
  },
  detailContainer: {},
  detailTitle: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 600,
    paddingRight: "10%",
  },
};

interface ParentDetailsSectionInterface {
  patientId: patientId;
  style?: CSSProperties;
}

const ParentDetailsSection = ({ patientId, style }: ParentDetailsSectionInterface) => {
  const [details, setDetails] = useState<PatientDetailsModel>();

  useEffect(() => {
    setTimeout(() => {
      const data = patientDetailsData[patientId.toString()];
      setDetails(data);
    }, getRandomNumberInRange(200, 1800));
  }, [patientId]);

  return (
    <div style={{ ...styles.container, ...style }}>
      {details ? (
        Object.keys(details).map((field) => (
          <div key={field} style={styles.detailContainer}>
            <span style={styles.detailTitle}>
              <TranslatedText>{convertToReadableString(field)}</TranslatedText>
            </span>
            <InputTag>{details[field as keyof typeof details]}</InputTag>
          </div>
        ))
      ) : (
        <span>
          <TranslatedText>{loadingText}</TranslatedText>
        </span>
      )}
    </div>
  );
};

export default ParentDetailsSection;
