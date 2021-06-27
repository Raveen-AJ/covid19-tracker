import Card from "../components/Card";
import Map from "../components/Map";
import Search from "../components/Search";
import classes from "./Main.module.css";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../store/search-context";

const initialData = {
  todayCases: 0,
  totalCases: 0,
  todayDeaths: 0,
  totalDeaths: 0,
  todayRecovered: 0,
  totalRecovered: 0,
};

function Main() {
  const { country } = useContext(SearchContext).location;
  const [covidData, setCovidData] = useState(initialData);

  useEffect(() => {
    let url = "https://disease.sh/v3/covid-19/all";
    if (country !== "world") {
      url = `https://disease.sh/v3/covid-19/countries/${country}?strict=true`;
    }

    fetch(url).then((response) => {
      if (!response.ok) {
        setCovidData(initialData);
      } else {
        response.json().then((data) => {
          setCovidData({
            todayCases: data.todayCases,
            totalCases: data.cases,
            todayDeaths: data.todayDeaths,
            totalDeaths: data.deaths,
            todayRecovered: data.todayRecovered,
            totalRecovered: data.recovered,
          });
        });
      }
    });
  }, [country]);

  return (
    <>
      <Map />
      <div className={classes.fixed}>
        <Search />
      </div>
      <div className={classes.tiles}>
        <Card value={covidData.todayCases} label="Today Cases" color="orange" />
        <Card value={covidData.totalCases} label="Total Cases" color="orange" />
        <Card value={covidData.todayDeaths} label="Today Deaths" color="red" />
        <Card value={covidData.totalDeaths} label="Total Deaths" color="red" />
        <Card
          value={covidData.todayRecovered}
          label="Today Recovered"
          color="green"
        />
        <Card
          value={covidData.totalRecovered}
          label="Total Recovered"
          color="green"
        />
      </div>
    </>
  );
}

export default Main;
