import loadGoogleMapsAPI from "load-google-maps-api";

// Map
/* global google */
/* global $ */
$(function() {
  var rAF = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var map;
  var $map = $("#map");

  var setScroll = function(option) {
    if (!map) {
      return;
    }
    map.setOptions({ scrollwheel: option });
  };

  var customStyle = [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#444444"
        }
      ]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100
        },
        {
          lightness: 45
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#1da4c1"
        },
        {
          visibility: "on"
        }
      ]
    }
  ];

  var initialize = function() {
    loadGoogleMapsAPI().then(() => {
      map = new google.maps.Map($map[0], {
        zoom: 3,
        scrollwheel: false,
        center: new google.maps.LatLng(47.761026, 13.069313),
        styles: customStyle
      });

      var sbg = new google.maps.LatLng(47.723379, 13.087777);

      var image = {
        url: "./images/concat_map.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(50, 83),
        scaledSize: new google.maps.Size(50, 83),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(25, 83)
      };

      var uni = "University of Applied Sciences Salzburg";
      var marker = new google.maps.Marker({
        position: sbg,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: image,
        title: uni
      });

      var infowindow = new google.maps.InfoWindow({
        content:
          '<div class="markerPopup">' +
          '<h2 class="section-heading">Our amazing venue</h2>' +
          '<h3 class="section-subheading text-muted">' +
          uni +
          ' <a href="https://www.google.com/maps/place/Fachhochschule+Salzburg/" title="Open in Google Maps">' +
          '<i class="fa fa-external-link"></i>' +
          "</a>" +
          "</h3>" +
          "</div>"
      });

      infowindow.open(map, marker);

      google.maps.event.addListener(marker, "click", function() {
        infowindow.open(map, marker);
      });

      google.maps.event.addListener(map, "mousedown", function() {
        setScroll(true);
      });

      var flights = [
        {
          path: [
            // Vienna, Austria
            new google.maps.LatLng(48.2, 16.3667),
            sbg
          ]
        },
        {
          path: [
            // Munich, Germany
            new google.maps.LatLng(48.1545687, 11.2609782),
            sbg
          ]
        },
        {
          path: [
            // Berlin, Germany
            new google.maps.LatLng(52.5167, 13.3833),
            sbg
          ]
        },
        {
          path: [
            // Beirut, Lebanon
            new google.maps.LatLng(33.8734237, 35.3019617),
            sbg
          ]
        },
        {
          path: [
            // Sunnyvale, California
            new google.maps.LatLng(37.386791, -122.0188),
            sbg
          ]
        },
        {
          path: [
            // Melbourne, Australia
            new google.maps.LatLng(-37.8274851, 144.9527565),
            sbg
          ]
        },
        {
          path: [
            // Toronto, Canada
            new google.maps.LatLng(43.6570403, -79.4609327),
            sbg
          ]
        },
        {
          path: [
            // Vancouver, Canada
            new google.maps.LatLng(49.2576504, -123.2643279),
            sbg
          ]
        }
      ];

      var paths = [];

      flights.forEach(function(flight) {
        var flightPath = new google.maps.Polyline({
          path: flight.path,
          icons: [
            {
              icon: {
                path:
                  "M 194.67321,2.8421709e-14 L 70.641958,53.625 " +
                  "C 60.259688,46.70393 36.441378,32.34961 31.736508,30.17602 " +
                  "C -7.7035221,11.95523 -5.2088921,44.90709 11.387258,54.78122 " +
                  "C 15.926428,57.48187 39.110778,71.95945 54.860708,81.15624 " +
                  "L 72.766958,215.09374 L 94.985708,228.24999 L 106.51696,107.31249 " +
                  "L 178.04821,143.99999 L 181.89196,183.21874 L 196.42321,191.84374 " +
                  "L 207.51696,149.43749 L 207.64196,149.49999 L 238.45446,117.96874 " +
                  "L 223.57946,109.96874 L 187.95446,126.87499 L 119.67321,84.43749 " +
                  "L 217.36071,12.25 L 194.67321,2.8421709e-14 z",
                scale: 0.1,
                fillColor: "black",
                strokeColor: "black",
                strokeWeight: 0,
                rotation: 60
              },
              offset: "0%"
            }
          ],
          geodesic: true,
          strokeColor: "#e40138",
          strokeOpacity: 1.0,
          strokeWeight: 0
        });

        flightPath.setMap(map);

        paths.push(flightPath);
      });

      var count = 0;
      var path = 0;

      function animatePlanes() {
        count++;

        if (count > 200) {
          count = 0;
          path++;
          if (path === paths.length) {
            return;
          }
        }

        var icons = paths[path].get("icons");
        icons[0].offset = count / 2 + "%";
        if (count === 200) {
          icons[0].icon.fillOpacity = 0;
          icons[0].icon.strokeWeight = 0;
          paths[path].strokeWeight = 1;
        } else {
          icons[0].icon.fillOpacity = 1;
          icons[0].icon.strokeWeight = 1;
        }

        paths[path].set("icons", icons);

        rAF(animatePlanes);
      }

      animatePlanes();
    });
  };

  $("body").on("mousedown", function(event) {
    var insideMap = $(event.target).parents("#map").length > 0;

    if (!insideMap) {
      setScroll(false);
    }
  });

  $(window).scroll(function() {
    setScroll(false);
  });

  if (window.__loadedMap) {
    window.__initializeMap = function() {};
    return initialize();
  }
  window.__initializeMap = initialize;
});
