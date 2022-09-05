import logo from "./assets/icons/logo.png";
import status from "./status.json";

let config = {
    "sitename":"BandSOS",
    "map":{
        "mapcenter":[22, 90], // [lat, long], Bangladesh
        "bounds":{
            "east":50,
            "west":120,
            "south":11,
            "north":28
        },
        "zoom":7,
        "minzoom":6,
        "maxzoom":10
    },
    "navbar":{
        "branding":{
            "icon": logo
        },
    },
    "status": status,
}

export default config;
