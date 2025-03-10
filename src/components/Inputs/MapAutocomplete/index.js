import { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const MapAutocomplete = ({ cord, setCord }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: cord[1] ? cord[1] : 25,
    lng: cord[0] ? cord[0] : 84,
  });
  const autocompleteRef = useRef(null);
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  console.log(cord);

  useEffect(() => {
    if (cord)
      setMarkerPosition({
        lat: cord[1] ? cord[1] : 25,
        lng: cord[0] ? cord[0] : 84,
      });
  }, [cord]);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    console.log("Selected place:", place);
    setSelectedPlace(place);

    const marker = markerRef.current;
    if (marker) {
      marker.setPosition(place.geometry.location);
    }

    const map = mapRef.current;
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(place.geometry.location);
      map.fitBounds(bounds);
    }

    console.log("Latitude:", place.geometry.location.lat());
    console.log("Longitude:", place.geometry.location.lng());
    setCord([place.geometry.location.lng(), place.geometry.location.lat()]);
    setMarkerPosition({
      lat: place?.geometry?.location?.lat(),
      lng: place?.geometry?.location?.lng(),
    });

    renderMarkers();
  };

  const handleApiLoaded = (map, maps) => {
    mapRef.current = map;

    console.log(cord);
    console.log({
      lat: cord[1] ? cord[1] : 25,
      lng: cord[0] ? cord[0] : 84,
    });

    const marker = new maps.Marker({
      position: {
        lat: cord[1] ? cord[1] : 25,
        lng: cord[0] ? cord[0] : 84,
      },
      map: map,
      draggable: false,
    });

    markerRef.current = marker;

    // maps.event.addListener(marker, "dragend", () => {
    //   const position = marker.getPosition();
    //   console.log("Latitude:", position.lat());
    //   console.log("Longitude:", position.lng());
    //   console.log(marker);
    //   setMarkerPosition({
    //     lat: position.lat(),
    //     lng: position.lng(),
    //   });
    //   setCord([position.lng(), position.lat()]);
    // });

    renderMarkers();
  };

  const renderMarkers = () => {
    if (markerPosition && markerRef.current) {
      markerRef.current.setPosition(markerPosition);
      markerRef.current.setMap(mapRef.current);
    } else if (markerRef.current) {
      markerRef.current.setMap(null);
    }
  };

  return (
    <>
      {/* <label className="text-gray-500 mt-2">Locate on map</label> */}

      <LoadScript
        libraries={["places"]}
        googleMapsApiKey={"AIzaSyCDCQBnv82-gPUl8bkOuTyQdoELx2nm8eI"}
      >
        <div style={{ height: "300px", width: "100%" }}>
          {/* <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
          >
            <div>
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md outline-none"
                type="text"
                placeholder="Enter a location"
              />
            </div>
          </Autocomplete> */}
          <GoogleMapReact
            key={`${markerPosition.lat}-${markerPosition.lng}`}
            defaultCenter={markerPosition}
            defaultZoom={13}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          />
        </div>
      </LoadScript>
    </>
  );
};

export default MapAutocomplete;
