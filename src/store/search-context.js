import React, { useState } from "react";

const initialData = {
  location: {
    country: "world",
    lng: 11,
    lat: 22,
    zoom: 1,
  },
  onCountryChange: () => {},
};

const SearchContext = React.createContext(initialData);

export const SearchContextProvider = (props) => {
  const [location, setLocation] = useState(initialData.location);

  const onCountryChange = (event) => {
    const iso3 = event.target.value;
    const token = process.env.REACT_APP_MAPBOX_PUBLIC;

    if (iso3 === "world") {
      setLocation(initialData.location);
    } else {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${iso3}.json?types=country&access_token=${token}`
      ).then((response) => {
        response.json().then((data) => {
          setLocation({
            country: iso3,
            lng: data.features[0].center[0],
            lat: data.features[0].center[1],
            zoom: 6,
          });
        });
      });
    }
  };

  return (
    <SearchContext.Provider
      value={{ location: { ...location }, onCountryChange }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
