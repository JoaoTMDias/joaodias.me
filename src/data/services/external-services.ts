import axios, { AxiosPromise } from "axios";
import { IExternalServiceSongs } from "../../components/last-played-song/types";
import { IFormState } from "../../components/forms/types";
import { encode } from "querystring";

class ExternalService {
	/**
	 *
	 *
	 * @param {string} url
	 * @returns {AxiosPromise<IExternalServiceSongs>}
	 * @memberof ExternalService
	 */
	getLatestSong(url: string): AxiosPromise<IExternalServiceSongs> {
		return axios.get(`${url}`);
	}

	/**
	 *
	 *
	 * @param {IFormState} data
	 * @returns
	 * @memberof ExternalService
	 */
	postUserForm(data: IFormState) {
		const options = {
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({ "form-name": "contact-form", ...data }, "&"),
		};

		return axios.post("/", options);
	}
}

export default new ExternalService();
