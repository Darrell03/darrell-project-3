let map; 
let geocoder;

function initMap() {
  const myLatLng = { lat: 36.3729, lng: -94.2088 }; // Bentonville, AR
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myLatLng,
    disableDefaultUI: false,
    mapTypeControl: false
  });

  geocoder = new google.maps.Geocoder();

  const marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Bentonville, AR",
    animation: google.maps.Animation.DROP
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
        <div class="map-popup">
          <h4>Bentonville Headquarters</h4>
          <p>The API is now connected!</p>
        </div>`
  });

  marker.addListener("click", () => {
    infoWindow.open({ anchor: marker, map });
  });

  const searchBtn = document.getElementById("search-loc-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
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
      alert("Location not found: " + status);
    }
  });
}

window.initMap = initMap;