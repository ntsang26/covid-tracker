import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles({
  wrapper: (props) => {
    if (props.type === "confirmed") return { borderBottom: "5px solid #e74c3c" };
    else return { borderBottom: "5px solid #2c3e50" };
  },
  title: {
    fontSize: "18px",
    marginBottom: "5px",
    fontFamily: '"Comfortaa", cursive'
  },
  count: {
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: '"Comfortaa", cursive'
  },
});

export default function HighLightCard({ title, count, type }) {
  const style = useStyle({ type });

  return (
    <Card className={style.wrapper}>
      <CardContent>
        <Typography component="p" variant="body2" className={style.title}>
          {title}
        </Typography>
        <Typography component="span" variant="body2" className={style.count}>
          {Intl.NumberFormat().format(count)}
        </Typography>
      </CardContent>
    </Card>
  );
}
