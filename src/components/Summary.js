import { Grid } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getMapDataByCountryId } from "../APIs/API";
import HighMap from "./Charts/HighMap";
import LineChart from "./Charts/LineChart";

export default function Summary({ report, selectedCountryId }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (selectedCountryId) {
      try {
        getMapDataByCountryId(selectedCountryId).then((res) => setMapData(res));
      } catch (err) {
        console.log("Fail to get country map.");
      }
    }
  }, [selectedCountryId]);

  return (
    <div style={{ height: "500px", marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMap mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
