import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { VITE_MAPBOX_ACCESS_TOKEN } from "@/config";

interface MapboxComponentProps {
    start: [number, number];
    end: [number, number];
}

mapboxgl.accessToken = VITE_MAPBOX_ACCESS_TOKEN as string;

const MapboxComponent: React.FC<MapboxComponentProps> = ({ start, end }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    const mapRef = useRef<mapboxgl.Map | null>(null); 
    const startMarkerRef = useRef<mapboxgl.Marker | null>(null);
    const endMarkerRef = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        // Check if the start and end coordinates are valid before proceeding
        if (!start || start[0] === 0 || start[1] === 0 || !end || end[0] === 0 || end[1] === 0) {
            console.warn("Start or end coordinates are invalid.");
            return;
        }
        
        if (!mapRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current!,
                style: "mapbox://styles/mapbox/streets-v12",
                center: start,
                zoom: 12,
            });

            // Set map bounds
            const bounds: [number, number][] = [
                [106.33448, 10.34599],
                [107.02687, 11.15903],
            ];
            map.setMaxBounds(bounds as mapboxgl.LngLatBoundsLike);

            map.on("load", () => {
                // Add markers for start and end points
                const customMarker = document.createElement("div");
                customMarker.className = "custom-marker";
                customMarker.style.backgroundImage =
                    'url("https://cdn-icons-png.flaticon.com/512/6947/6947616.png")';
                customMarker.style.width = "50px";
                customMarker.style.height = "50px";
                customMarker.style.backgroundSize = "cover";
                startMarkerRef.current = new mapboxgl.Marker({ element: customMarker })
                    .setLngLat(start)
                    .addTo(map);

                endMarkerRef.current = new mapboxgl.Marker({ color: "red" })
                    .setLngLat(end)
                    .addTo(map);

                // Function to get and add the route
                const getRoute = async (start: [number, number], end: [number, number]) => {
                    try {
                        const query = await fetch(
                            `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                            { method: "GET" }
                        );
                        const json = await query.json();
                        const data = json?.routes?.[0]?.geometry;

                        if (!data) {
                            console.error("No route data returned from API.");
                            return;
                        }

                        // Remove existing route if it exists
                        if (map.getSource("route")) {
                            map.removeLayer("route");
                            map.removeSource("route");
                        }

                        map.addSource("route", {
                            type: "geojson",
                            data: {
                                type: "Feature",
                                properties: {},
                                geometry: data,
                            },
                        });

                        map.addLayer({
                            id: "route",
                            type: "line",
                            source: "route",
                            layout: {
                                "line-join": "round",
                                "line-cap": "round",
                            },
                            paint: {
                                "line-color": "#0F53FF",
                                "line-width": 5,
                            },
                        });
                    } catch (error) {
                        console.error("Error fetching route: ", error);
                    }
                };

                // Initial route
                getRoute(start, end);

                // Store the map instance
                mapRef.current = map;
            });
        } else {
            // Update the map center and markers when start or end coordinates change
            mapRef.current.flyTo({ center: start, zoom: 12 });

            if (startMarkerRef.current) {
                startMarkerRef.current.setLngLat(start);
            }

            if (endMarkerRef.current) {
                endMarkerRef.current.setLngLat(end);
            }

            // Update the route
            const getRoute = async (start: [number, number], end: [number, number]) => {
                try {
                    const query = await fetch(
                        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                        { method: "GET" }
                    );
                    const json = await query.json();
                    const data = json?.routes?.[0]?.geometry;

                    if (!data) {
                        console.error("No route data returned from API.");
                        return;
                    }

                    // Remove existing route if it exists
                    if (mapRef.current?.getSource("route")) {
                        mapRef.current.removeLayer("route");
                        mapRef.current.removeSource("route");
                    }

                    mapRef.current?.addSource("route", {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: {},
                            geometry: data,
                        },
                    });

                    mapRef.current?.addLayer({
                        id: "route",
                        type: "line",
                        source: "route",
                        layout: {
                            "line-join": "round",
                            "line-cap": "round",
                        },
                        paint: {
                            "line-color": "#888",
                            "line-width": 8,
                        },
                    });
                } catch (error) {
                    console.error("Error fetching route: ", error);
                }
            };

            getRoute(start, end);
        }
    }, [start, end]);

    return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapboxComponent;
