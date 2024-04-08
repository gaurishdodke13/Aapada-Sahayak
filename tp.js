import axios from "axios";
let MAPQUEST_API_KEY = 'yDKOsQaPjy8otLJWccAjiNZzXQrDxfWQ';

async function getAddress(latitude, longitude) {
    const uri = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${MAPQUEST_API_KEY}&location=${latitude},${longitude}`;

    try {
        const response = await axios.get(uri);
        const { street, adminArea6, adminArea5, adminArea4, adminArea3, adminArea2, adminArea1, postalCode } = response.data.results[0].locations[0];
        let address = [street, adminArea6, adminArea5, adminArea4, adminArea3, adminArea2, adminArea1].filter((x) => x !== undefined && x !== null && typeof x === 'string' && x.length > 0).filter((item,
            index, arr) => arr.indexOf(item) === index).join(', ');
        address += `, PIN - ${postalCode}`;
        return address;
    } catch (e) {
        console.error(e);
    }
}

let x = await getAddress(13.254551599983914, 79.11510988856644);
console.log(x)
