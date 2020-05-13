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
	postUserForm(data: IFormState) {
		return new Promise((resolve, reject) => {
			const options = {
				headers: {
					Accept: "application/x-www-form-urlencoded;charset=UTF-8",
					"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
				},
				body: encode({
					"form-name": "contact-page-form",
					...data,
				}),
			};

			axios
				.post("/contact?no-cache=1", options)
				.then((response) => {
					if (response.status === 200) {
						resolve(response.statusText);
					}
				})
				.catch(() => {
					reject(new Error("Error submitting the form"));
				});
		});
	}
}

export default new ExternalService();
