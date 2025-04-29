import { reportHeader } from "../utils/constants";
import logo from "../static/logo.png"; // Vite-compatible image import

const styles = {
    container: {
        backgroundColor: "#064c60",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "space-between",
        padding: "1rem",
        width: "100%",
    },
    logo: {
        width: "10rem",
    },
    secondaryText: {
        color: "#fff",
    },
};

const ReportHeader = () => {
    return (
        <div style={styles.container}>
            <img
                alt="Logo"
                src={logo}
                style={styles.logo}
            />
            <span style={styles.secondaryText} translate="yes">
                {reportHeader.secondaryText}
            </span>
        </div>
    );
};

export default ReportHeader;
