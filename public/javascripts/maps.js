let map = mapfit.MapView('mapfit', {
    theme: 'day'
});

// add marker
myMarker = mapfit.Marker([46.050260, 14.468920])
map.setCenter(myMarker)
map.addMarker(myMarker)

map.setZoom(13);