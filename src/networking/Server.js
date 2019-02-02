const apiGetReview = 'http://appmns.yez.vn/api/mns_feed_back';
const apiGetAllNews = 'http://appmns.yez.vn/api/mns_all_news'
const apiGetYouCares = 'http://appmns.yez.vn/api/mns_cares'
const apiMaps = 'http://appmns.yez.vn/api/mns_maps'
async function getFeedBack() {
    try {
        let response = await fetch(apiGetReview);
        let responseJson = await response.json();
        return responseJson.data
    } catch (error) {
        console.log(error);
    }
}

async function getAllNewFromServer() {
    try {
        let response = await fetch(apiGetAllNews);
        let responseJson = await response.json();
        // console.log(responseJson.data)
        return responseJson.data
    } catch (error) {
        console.log(error)
    }
}

async function getApiYouCareFromServer() {
    try {
        let response = await fetch(apiGetYouCares);
        let responseJson = await response.json();
        return responseJson.data
    } catch (error) {
        console.log(error)
    }
}

async function getApiMapsFromServer() {
    try {
        let response = await fetch(apiMaps);
        let responseJson = await response.json();
        return responseJson.data
    } catch (error) {
        console.log(error)
    }
}

export { getFeedBack, getAllNewFromServer, getApiYouCareFromServer, getApiMapsFromServer };