ymaps.ready(init);

function init() {
  const map = new ymaps.Map("map", {
    center: [55.76, 37.64], // Москва
    zoom: 10,
  });

  let placemark;
  const addressSpan = document.getElementById("selected-address");

  map.events.add("click", function (e) {
    const coords = e.get("coords");

    if (placemark) {
      placemark.geometry.setCoordinates(coords);
    } else {
      placemark = new ymaps.Placemark(coords, {}, { draggable: true });
      map.geoObjects.add(placemark);
    }

    ymaps.geocode(coords).then(function (res) {
      const firstGeoObject = res.geoObjects.get(0);
      const address = firstGeoObject ? firstGeoObject.getAddressLine() : "не удалось определить";
      addressSpan.textContent = address;
    });
  });

  document.getElementById("confirm-btn").addEventListener("click", function () {
    alert("Подтвержденный адрес: " + addressSpan.textContent);
  });
}
