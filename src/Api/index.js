import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "373d87008f0bec35bfb2212e6d653d9c";

const client = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json"
	}
});

export function getNowPlayingMovies(region) {
	return client.get("/movie/now_playing", {
		params: {
			api_key: API_KEY,
			language: "en-US",
			region: region
		}
	});
}

export function getComingSoonMovies(region) {
	return client.get("/movie/upcoming", {
		params: {
			api_key: API_KEY,
			language: "en-US",
			region: region
		}
	});
}

export function getPopularMovies(region) {
	return client.get("/movie/popular", {
		params: {
			api_key: API_KEY,
			language: "en-US",
			region: region
		}
	});
}

export function getPopularTv(region) {
	return client.get("/tv/popular", {
		params: {
			api_key: API_KEY,
			language: "en-US"
		}
	});
}

export function getCountries() {
	return client.get("/configuration/countries", {
		params: {
			api_key: API_KEY
		}
	});
}
