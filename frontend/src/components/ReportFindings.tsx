import React, { useState } from "react";
import { Checkbox2 } from "./ui/checkbox";
import { type Finding, type Findings } from "../models/finding";
import { getRandomNumberInRange } from "../utils/numbers";
import { selectRandomObjects } from "../utils/objects";
import { randomXrayFinding } from "../utils/strings";
import normalFindings from "../fetches/fetchNormalFindings.json";
import abnormalFindings from "../fetches/fetchAbnormalFindings.json";
import TranslatedText from "./TranslatedText";

const styles = {
  gap3: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
    padding: "0.75rem",
  },
  smGap4: {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.5rem",
    alignItems: "center",
  },
  smRoundedW8: {
    width: "1.5rem",
    height: "0.375rem",
    borderRadius: "9999px",
    border: "1px solid #ccc",
  },
  gap4: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  gap25: {
    display: "flex",
    gap: "0.625rem",
  },
};

const getFindings = (
  isNormal: boolean,
  quantityRange: [number, number],
  generatedQuantityRange: [number, number]
): Findings => {
  let localFindings: Findings = [];

  localFindings = localFindings.concat(
    selectRandomObjects(
      isNormal ? normalFindings : abnormalFindings,
      getRandomNumberInRange(...quantityRange)
    )
  );

  for (let i = 0; i < getRandomNumberInRange(...generatedQuantityRange); i++) {
    localFindings = localFindings.concat(randomXrayFinding(isNormal));
  }

  return localFindings;
};

interface ReportFindingsProps {
  findings?: Findings;
  isNormal: boolean;
  editable: boolean;
}

const ReportFindings = ({
  findings,
  isNormal,
  editable,
}: ReportFindingsProps): JSX.Element => {
  findings = findings ? findings : getFindings(isNormal, [0, 7], [0, 5]);

  return (
    <div style={styles.gap3}>
      {findings.map((finding) =>
        editable || !editable ? (
          <div key={finding.id} style={styles.smGap4}>
            <ReportFinding
              finding={finding}
              isNormal={isNormal}
              editable={editable}
              checked={editable}
            />
          </div>
        ) : null
      )}
      <span></span>
    </div>
  );
};

const Pill = ({
  filled,
  isNormal,
  checked,
}: {
  filled: boolean;
  isNormal: boolean;
  checked: boolean;
}) => {
  return (
    <div
      style={{
        ...styles.smRoundedW8,
        backgroundColor: filled
          ? isNormal
            ? checked
              ? "#00A95E"
              : "#9DD1A4"
            : checked
            ? "#E53E3E"
            : "#FED7D7"
          : "transparent",
      }}
    />
  );
};

const ReportFinding = ({
  finding,
  isNormal,
  editable,
  checked,
}: {
  finding: Finding;
  isNormal: boolean;
  editable: boolean;
  checked: boolean;
}) => {
  const [checkedStatus, setCheckedStatus] = useState<boolean>(checked);

  const onCheckedChange = () => setCheckedStatus(!checkedStatus);

  return (
    <>
      <div style={styles.gap4}>
        {editable && (
          <Checkbox2
            checked={checkedStatus}
            onCheckedChange={onCheckedChange}
          />
        )}
        <div style={{ color: checkedStatus ? "text-sp-dark-blue" : "text-report-light-gray" }}>
          <TranslatedText>{finding.name}</TranslatedText>
        </div>
      </div>
      <div style={styles.gap25}>
        <Pill filled={true} isNormal={isNormal} checked={checked} />
        <Pill filled={true} isNormal={isNormal} checked={checked} />
        <Pill filled={!finding.isLikely} isNormal={isNormal} checked={checked} />
        <Pill filled={!finding.isLikely} isNormal={isNormal} checked={checked} />
      </div>
    </>
  );
};

export default ReportFindings;
