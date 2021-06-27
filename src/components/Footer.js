import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div>
        <p>
          API: <a href="https://disease.sh">disease.sh</a>
        </p>
        <p>
          MAPs: <a href="https://www.mapbox.com">mapbox</a>
        </p>
        <p>
          Charts: <a href="https://canvasjs.com">CanvasJS</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
