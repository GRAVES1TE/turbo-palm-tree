ymaps.ready(function () {
  var map = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 9
  });

  var placemark;

  map.events.add('click', function (e) {
    var coords = e.get('coords');

    if (placemark) {
      placemark.geometry.setCoordinates(coords);
    } else {
      placemark = new ymaps.Placemark(coords, {}, { draggable: true });
      map.geoObjects.add(placemark);
    }

    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      var address = firstGeoObject.getAddressLine();
      document.getElementById('selected-address').textContent = address;

      document.getElementById('confirm-button').onclick = function () {
        alert("Вы выбрали адрес: " + address);
      };
    });
  });
});
