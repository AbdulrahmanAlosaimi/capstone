import { getRequest } from '../index.js';
import { postRequest } from '../index.js';

let genericImageObject = {
    URL: 'https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_960_720.jpg'
};

async function getPixabayObject() {
    await getRequest('/pixabayKey')
        .then(async(keyObject) => {
            let key = keyObject.apiKey;
            let coordinates = await getRequest('/getCoordinates');
            let pixabayObject = await getRequest(`https://pixabay.com/api/?key=${key}&q=${coordinates.cityName}+${coordinates.countryName}&category=buildings&orientation=horizontal&per_page=3`);
            if (pixabayObject.hits.length == 0) {
                return genericImageObject;
            } else {
                return pixabayObject;
            }
        }).then(async(imageObject) => {
            console.log(imageObject);
            postRequest('/addPixabayObject', imageObject);
        })
}

export { getPixabayObject }