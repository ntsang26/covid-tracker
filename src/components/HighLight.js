import { Grid } from "@material-ui/core";
import React from "react";
import HighLightCard from "./HighLightCard";

export default function HighLight({ report }) {
  const data = report && report.length ? report[report.length - 1] : [];

  const summary = [
    {
      title: "Số ca nhiễm",
      count: data.Confirmed,
      type: "confirmed",
    },
    {
      title: "Tử vong",
      count: data.Deaths,
      type: "death",
    },
  ];

  return (
    <Grid container spacing={5}>
      {summary.map((item, idx) => (
        <Grid item sm={6} xs={12} key={idx}>
          <HighLightCard
            title={item.title}
            count={item.count}
            type={item.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
