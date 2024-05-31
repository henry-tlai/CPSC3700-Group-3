// Fetch the JSON data
fetch('../../JavaScript/mapdata.json')
    .then(response => response.json())
    .then(data => {
        // Extract latitudes, longitudes, text, and urls from the JSON data
        var latitudes = data.map(entry => parseFloat(entry.lat));
        var longitudes = data.map(entry => parseFloat(entry.lon));
        var text = data.map(entry => entry.text);
        var urls = data.map(entry => entry.url);

        var maxLat = Math.max(...latitudes);
        var maxLon = Math.max(...longitudes);
        var minLat = Math.min(...latitudes);
        var minLon = Math.min(...longitudes);

        var centerLat = (minLat + maxLat) / 2;
        var centerLong = (minLon + maxLon) / 2;

        var latSpan = maxLat - minLat;
        var lonSpan = maxLon - minLon;
        var zoomData = getZoom(latSpan, lonSpan);

        // Define map data
        var mapData = {
            type: 'scattermapbox',
            lat: latitudes,
            lon: longitudes,
            mode: 'markers',
            marker: {
                size: 12
            },
            text: text,
            customdata: urls,
            hovertemplate: "%{text}<extra></extra>",
            cluster: {
                enabled: true,
                step: 1,
                size: 20,
                maxZoom: 12
            }
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
                margin: {
                    t: 0,
                    b: 0,
                    r: 0,
                    l: 0
                }
            },
            margin: {
                t: 0,
                b: 0,
                r: 0,
                l: 0  
            }
        };

        // Plot the map
        Plotly.plot('map', [mapData], layout, { mapboxAccessToken: 'pk.eyJ1IjoibWJ1c3RvczI3IiwiYSI6ImNsdzVrcWRheDFqeXIybHF1ZmU4aTBzZ24ifQ.tq8snteIBBOhq44zVwS7BQ' });

        // Add click event listener
        document.getElementById('map').on('plotly_click', function(data) {
            var point = data.points[0];
            var url = point.customdata;
            window.open(url, '_blank');
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));

function getZoom(latSpan, lonSpan) {
    var degPerPixel = 0.4;
    var latZoom = Math.log2(360 / (latSpan / degPerPixel));
    var lonZoom = Math.log2(360 / (lonSpan / degPerPixel));
    return Math.min(latZoom, lonZoom);
}
