import { useEffect } from "react";
import AnimatedNumber from "animated-number-react";
import classes from "./Card.module.css";

let value = 0;

const Card = (props) => {
  useEffect(() => {
    if (value <= 0) value = props.value;
  }, [props.value]);

  return (
    <div className={classes.tile}>
      <h1 style={{ color: props.color }}>
        <AnimatedNumber
          value={props.value}
          formatValue={(value) => Math.round(value).toLocaleString()}
        ></AnimatedNumber>
      </h1>
      <p>{props.label}</p>
    </div>
  );
};

export default Card;
