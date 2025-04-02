import React, { useEffect } from "react";

interface Location {
    lng: number;
    lat: number;
}

export const GetPosition: React.FC<{
    onLocationFound: (location: Location) => void;
}> = ({ onLocationFound }) => {

    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    onLocationFound({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                },
                {
                    enableHighAccuracy: true,timeout: 1000000, maximumAge: 0
                }
            );
        };

        // Initial location fetch
        getLocation();

        // Set up an interval to fetch the location every 3 seconds
        const intervalId = setInterval(getLocation, 3000);

        // Watch the shipper's location in real-time
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                onLocationFound({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error watching location:", error);
                if (error.code === error.TIMEOUT) {
                    console.error("Timeout expired while watching location.");
                }
            },
            {
                enableHighAccuracy: true, timeout: 1000000, maximumAge: 0
            }
        );

        return () => {
            clearInterval(intervalId);
            navigator.geolocation.clearWatch(watchId);
        };
    }, [onLocationFound]);

    return null;
};
