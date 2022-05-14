/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */

const LAST_FM_SEARCH_METHOD = "user.getrecenttracks";
const LAST_FM_USERNAME = "jtmdias";
const LAST_FM_API_KEY = "60caa5e07c4a12ec3d677cf8c2f6f804";
const LAST_FM_URL = `https://ws.audioscrobbler.com/2.0/?method=${LAST_FM_SEARCH_METHOD}&user=${LAST_FM_USERNAME}&api_key=${LAST_FM_API_KEY}&format=json`;

export { LAST_FM_SEARCH_METHOD, LAST_FM_USERNAME, LAST_FM_API_KEY, LAST_FM_URL };
