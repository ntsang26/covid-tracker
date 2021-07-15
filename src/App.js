import { Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import moment from "moment";
import { useState, useEffect, useCallback } from "react";
import { getCountries, getReportByCountry } from "./APIs/API";
import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";
import "moment/locale/vi";

moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  const style = {
    fontSize: "30px",
    fontWeight: "700",
    textTransform: "uppercase",
  };

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, "Country");
      setCountries(countries);
      setSelectedCountryId("vn");
    });
  }, []);

  const handleOnChange = useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase(),
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedCountryId, countries]);

  return (
    <>
      <Typography style={style}>Thống kê COVID - 19</Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <HighLight report={report} />
      <Summary report={report} selectedCountryId={selectedCountryId} />
    </>
  );
}

export default App;
