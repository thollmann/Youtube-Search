import Axios from 'axios';

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;;

export default Axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 6,
        type: 'video',
        key: KEY
    }
});