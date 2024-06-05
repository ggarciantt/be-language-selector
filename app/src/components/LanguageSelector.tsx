import {
  Select,
  Option,
  FlexBox,
  Table,
  TableCell,
  TableRow,
  TableColumn,
  FlexBoxDirection,
  FlexBoxAlignItems,
  BusyIndicator,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { languageOptions } from "./LanguageOptions";
import { useEffect, useState } from "react";
import axios from "axios";
import { Country } from "../types/Country";

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [data, setData] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelection = (e: { target: { value: string } }) => {
    if (e.target.value === "Spanish") {
      setSelectedLanguage("spanish");
    } else if (e.target.value === "English") {
      setSelectedLanguage("english");
    } else if (e.target.value === "Portuguese") {
      setSelectedLanguage("portuguese");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const username = "gui";
        const password = "abc123";

        const URL = `http://localhost:4004/language/usingExternalApi(language='${selectedLanguage}')`;
        const response = await axios.get(URL, {
          headers: { Authorization: `Basic ${username}:${password}` },
        });
        setData(response.data.value);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (selectedLanguage) {
      fetchData();
    }
  }, [selectedLanguage]);

  return (
    <>
      <FlexBox direction={FlexBoxDirection.Column}>
        <FlexBox
          // justifyContent={FlexBoxJustifyContent.Center}
          // wrap={FlexBoxWrap.Wrap}
          alignItems={FlexBoxAlignItems.Stretch}
          style={spacing.sapUiContentPadding}
        >
          <Select onChange={handleSelection}>
            {languageOptions.map((option, i) => (
              <Option key={"language_" + i}>{option.name}</Option>
            ))}
          </Select>
        </FlexBox>
      </FlexBox>

      <div className="table-container">
        {loading && (
          <div className="overlay">
            <BusyIndicator active size="Large" />
          </div>
        )}

        <Table
          style={{ minWidth: "30rem" }}
          columns={
            <>
              <TableColumn style={{ width: "10%" }}>
                <span>Flag</span>
              </TableColumn>
              <TableColumn>
                <span>Country name</span>
              </TableColumn>
              <TableColumn>
                <span>Capital</span>
              </TableColumn>
              <TableColumn>
                <span>Continent</span>
              </TableColumn>
              <TableColumn>
                <span>Population</span>
              </TableColumn>
            </>
          }
          // onLoadMore={function _a() {}}
          // onPopinChange={function _a() {}}
          // onRowClick={function _a() {}}
          // onSelectionChange={function _a() {}}
        >
          {data !== null &&
            data.map((country: Country, i: int) => (
              <TableRow key={country.name + i}>
                <TableCell>
                  <span>{country.flag}</span>
                </TableCell>
                <TableCell>
                  <span>{country.name}</span>
                </TableCell>
                <TableCell>
                  <span>{country.capital}</span>
                </TableCell>
                <TableCell>
                  <span>{country.continent}</span>
                </TableCell>
                <TableCell>
                  <span>{country.population}</span>
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </div>
    </>
  );
}
