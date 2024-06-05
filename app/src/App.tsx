import employeeIcon from "@ui5/webcomponents-icons/dist/employee.js";
import { Avatar, ShellBar } from "@ui5/webcomponents-react";
import { LanguageSelector } from "./components/LanguageSelector";

function App() {
  return (
    <>
      <ShellBar
        logo={
          <img
            src="https://raw.githubusercontent.com/SAP/ui5-webcomponents-react/main/assets/ui5-logo.svg"
            alt={"UI5 Web Components for React logo"}
          />
        }
        primaryTitle="Simple React Exercise"
        profile={<Avatar icon={employeeIcon} />}
      />
      <LanguageSelector />
    </>
  );
}

export default App;
