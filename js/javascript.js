let map; 
let geocoder;

function initMap() {
  const myLatLng = { lat: 36.3729, lng: -94.2088 };
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
    disableDefaultUI: false,
    mapTypeControl: false
  });

  geocoder = new google.maps.Geocoder();

  const marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "My home location Bentonville, AR!",
    animation: google.maps.Animation.DROP
  });

  const infoWindow = new google.maps.InfoWindow({
    content:`
        <div class="map-popup">
          <h4>Target Location</h4>
          <p>This marker was placed using the Google Maps API.</p>
        </div>`
  });

  marker.addListener("click", () => {
    infoWindow.open({ anchor: marker, map });
  });

  document.getElementById("search-loc-btn").addEventListener("click", () => {
    const address = document.getElementById("input-city").value;
    handleSearch(address);
  });
}

function handleSearch(address) {
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      map.setZoom(15);
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        animation: google.maps.Animation.DROP
      });
    } else {
      console.error("Location not found: " + status);
    }
  });
}

/*window.initMap = initMap;*/