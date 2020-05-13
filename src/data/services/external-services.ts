/* eslint-disable class-methods-use-this */
import axios, { AxiosPromise } from "axios";
import { encode } from "querystring";
import { IExternalServiceSongs } from "../../components/last-played-song/types";
import { IFormState } from "../../components/forms/types";

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
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: encode({ "form-name": "contact-page-form", ...data }, "&"),
			};

			axios
				.post("/contact", options)
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
