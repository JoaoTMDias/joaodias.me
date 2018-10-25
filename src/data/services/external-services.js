import axios from 'axios';
import { LAST_FM_URL } from './config';

export default {
  async getLatestSong() {
    const result = await axios.get(`${LAST_FM_URL}`);
    return await result;
  },
};
