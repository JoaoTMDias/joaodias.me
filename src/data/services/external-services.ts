/* eslint-disable class-methods-use-this */
import axios, { AxiosPromise } from "axios";
import { IExternalServiceSongs } from "../../components/last-played-song/types";
import { IFormState } from "../../components/forms/types";

function encode(data: any) {
	return Object.keys(data)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
		.join("&");
}

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
	async postUserForm(data: IFormState) {
		try {
			axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

			const request = await axios.post(
				"/contact?no-cache=1",
				encode({
					"form-name": "contact-page-form",
					...data,
				}),
			);

			return request;
		} catch (error) {
			throw new Error("Error submitting the form");
		}
	}
}

export default new ExternalService();
