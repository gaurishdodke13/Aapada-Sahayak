import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './mapstyle.css'
import { Icon } from "leaflet";
// import icon from '../images/location-pin.png'
import MarkerClusterGroup from 'react-leaflet-cluster'
// import gpsIcon from '../images/gps.png'
import { useState } from "react";

const icon = process.env.PUBLIC_URL + "/images/location-pin.png";;
const gpsIcon = process.env.PUBLIC_URL + "/images/gps.png";;

const user = {
    user: "Ram Shirke",
    geocode: [19.10295695, 72.83745021706365],
    address: "vile parle west mumbai 400056",
    popup: "Current locations"
}

const markers = [
    {
        name: "Fire Station",
        geocode: [19.1867193, 72.8485884],
        popup: "Fire station malad",
        type: "fire"
    },
    {
        name: "Fire Station colaba",
        geocode: [18.915091, 72.8259691],
        popup: "Fire Station colaba",
        type: "medical"
    },
    {
        name: "Fire Station",
        geocode: [19.0257731, 73.05918477985664],
        popup: "medical",
        type: "NGO"
    }
]


const customIcon = new Icon({
    iconUrl: icon,
    iconSize: [38, 38]
})

const userCustomIcon = new Icon({
    iconUrl: gpsIcon,
    iconSize: [30, 30]
})


const options = {
    medical: ['ambulance', 'doctors', 'volunteers',],
    fire: ['volunteers', 'vehicles', 'tanker'],
    NGO: ['volunteers']

}

function Map() {

    const [type, setType] = useState(null)
    const [resourceType, setResource] = useState(null)
    const [marker, setMarker] = useState({})
    const [requestBody, setRequestBody] = useState(null);
    const keys = Object.keys(options)


    const handleTypeInput = (e) => {
        if (e.target.value !== '')
            setType(options[e.target.value])
    }

    const handleMarker = (marker) => {
        setMarker(marker)
    }

    const handleRequest = () => {

        if (marker && resourceType && user) {
            const requestBody = {
                reqAgency: marker,
                resource: resourceType,
                reqUser: user
            }
            setRequestBody(requestBody)
            // console.log(requestBody)
        }
    }


    return (
        <div>

            <div className="type-resource">
                <select onChange={(e) => setType(options[e.target.value])}>
                    <option value="">---select The type of agency----</option>
                    {
                        keys.map((value, idx) => (
                            <option value={value} key={idx}>{value}</option>
                        ))
                    }
                </select>

                {
                    type &&
                    <select onChange={(e) => { if (e.target.value !== '') setResource(e.target.value) }}>
                        <option value="">---select The type of Request----</option>
                        {
                            type.map((value, idx) => (
                                <option value={value} key={idx}>{value}</option>
                            ))
                        }

                    </select>
                }
                <div className="sendRequest">
                    <button onClick={() => handleRequest()} className="body-submit-btn ">Send Request</button>
                </div>

            </div>

            <MapContainer center={user.geocode} zoom={12}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup>
                    <Marker position={user.geocode} icon={userCustomIcon}>

                        <Popup>
                            {user.popup}
                        </Popup></Marker>
                    {

                        markers.map((marker, idx) => (
                            <Marker position={marker.geocode} key={idx} icon={customIcon}>
                                <Popup>
                                    <div>
                                        <h3>{marker.name}</h3>
                                        <h4>{marker.type}</h4>
                                        <button onClick={() => handleMarker(marker)}>Add to request</button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))

                    }

                </MarkerClusterGroup>

            </MapContainer>



        </div>
    )

}

export default Map;