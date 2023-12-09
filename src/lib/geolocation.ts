export const getLocation = () : Promise<GeolocationPosition>=> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location: GeolocationPosition) => {
          resolve(location);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              reject("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              reject("The request to get user location timed out.");
              break;
          }
        }
      );
    }
  });
};
