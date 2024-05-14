// Fetch the JSON data
fetch('mapdata.json')
    .then(response => response.json())
    .then(data => {
        // Extract latitudes and longitudes from the JSON data
        var latitudes = data.map(entry => parseFloat(entry.lat));
        var longitudes = data.map(entry => parseFloat(entry.lon));
        var text = data.map(entry => entry.text);
        var maxLat = Math.max(...latitudes);
        var maxLon = Math.max(...longitudes);
        var minLat = Math.min(...latitudes);
        var minLon = Math.min(...longitudes);

        var centerLat = (minLat + maxLat)/2;
        var centerLong = (minLon + maxLon)/2;

        var latSpan = maxLat - minLat;
        var lonSpan = maxLon - minLon;
        var zoomData = getZoom(latSpan,lonSpan);
        // Define map data
        var mapData = {
            type: 'scattermapbox',
            lat: latitudes,
            lon: longitudes,
            mode: 'markers',
            marker: {
                size: 9
            },
            text: text
        };

        // Define map layout
        var layout = {
            autosize: true,
            hovermode: 'closest',
            mapbox: {
                style: 'mapbox://styles/mapbox/streets-v11',
                center: {
                    lat: centerLat,
                    lon: centerLong
                },
                zoom: zoomData,
                cluster: {
                    enabled:true,
                    size:50,
                    maxZoom: 14
                }
            }
        };

        // Plot the map
        Plotly.plot('map', [mapData], layout, { mapboxAccessToken: 'pk.eyJ1IjoibWJ1c3RvczI3IiwiYSI6ImNsdzVrcWRheDFqeXIybHF1ZmU4aTBzZ24ifQ.tq8snteIBBOhq44zVwS7BQ' });
    })
    .catch(error => console.error('Error fetching JSON:', error));

function getZoom(latSpan, lonSpan){
    var degPerPixel = 0.4;
    var latZoom = Math.log2(360/(latSpan/degPerPixel));
    var lonZoom = Math.log2(360/(lonSpan/degPerPixel));
    console.log(Math.min(latZoom, lonZoom));
    return Math.min(latZoom, lonZoom);
}