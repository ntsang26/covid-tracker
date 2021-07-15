import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, ButtonGroup } from "@material-ui/core";

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YY"));
  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Tổng ca nhiễm",
      style: { fontFamily: '"Comfortaa", cursive' },
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ["#2980b9"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: "right",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tổng Ca nhiễm",
        data: data.map((item) => item.Confirmed),
        style: { fontFamily: '"Comfortaa", cursive' },
      },
    ],
  };
};

export default function LineChart({ data }) {
  const [option, setOption] = useState({});
  const [reportType, setReportType] = useState("all");

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case "all":
        customData = data;
        break;
      case "30":
        customData = data.slice(data.length - 30);
        break;
      case "7":
        customData = data.slice(data.length - 7);
        break;
      default:
        customData = data;
        break;
    }

    setOption(generateOptions(customData));
  }, [data, reportType]);

  return (
    <div>
      <ButtonGroup
        size="small"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          color={reportType === "all" ? "secondary" : ""}
          onClick={() => setReportType("all")}
          style={{
            fontFamily: '"Comfortaa", cursive',
          }}
        >
          Tất cả
        </Button>
        <Button
          color={reportType === "30" ? "secondary" : ""}
          onClick={() => setReportType("30")}
          style={{
            fontFamily: '"Comfortaa", cursive',
          }}
        >
          30 ngày
        </Button>
        <Button
          color={reportType === "7" ? "secondary" : ""}
          onClick={() => setReportType("7")}
          style={{
            fontFamily: '"Comfortaa", cursive',
          }}
        >
          7 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact
        highcharts={Highchart}
        options={option}
        style={{
          fontFamily: '"Comfortaa", cursive',
        }}
      />
    </div>
  );
}
