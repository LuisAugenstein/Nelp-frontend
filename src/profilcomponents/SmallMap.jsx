import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const SmallMap = ({ location }) => {
  return (
    <GoogleMap defaultCenter={location} defaultZoom={15}>
      <Marker position={location} />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(SmallMap));
