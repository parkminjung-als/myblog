import axios from 'axios'

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const api = axios.create({
    baseURL : 'https://api/github.com',
    headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept : 'application/vnd.github+json'
    }
});

export default api;