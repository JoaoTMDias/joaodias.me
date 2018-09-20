import axios from 'axios';
import { LAST_FM_URL } from './config';

export default {
  getLatestSong() {
    return axios.get(`${LAST_FM_URL}`);
  },
};
