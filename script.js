
let map, selectedCoords = null, selectedAddress = '';

ymaps.ready(() => {
  map = new ymaps.Map("map", {
    center: [55.751244, 37.618423],
    zoom: 10
  });

  new ymaps.SuggestView('search');

  map.events.add('click', function (e) {
    const coords = e.get('coords');
    selectedCoords = coords;
    ymaps.geocode(coords).then(res => {
      const firstGeoObject = res.geoObjects.get(0);
      selectedAddress = firstGeoObject.getAddressLine();
      document.getElementById('address').textContent = 'Выбранный адрес: ' + selectedAddress;
    });
  });
});

function findAddress() {
  const query = document.getElementById('search').value;
  ymaps.geocode(query).then(res => {
    const firstGeoObject = res.geoObjects.get(0);
    const coords = firstGeoObject.geometry.getCoordinates();
    map.setCenter(coords, 16);
    selectedCoords = coords;
    selectedAddress = firstGeoObject.getAddressLine();
    document.getElementById('address').textContent = 'Выбранный адрес: ' + selectedAddress;
  });
}

function confirmAddress() {
  if (selectedAddress) {
    console.log('Подтвержденный адрес:', selectedAddress);
    alert('Адрес подтвержден: ' + selectedAddress);
  } else {
    alert('Сначала выберите адрес на карте.');
  }
}
