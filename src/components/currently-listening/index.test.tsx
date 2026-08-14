import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Track } from "../../typings";
import CurrentlyListening from "./index";
import { LastPlayedSongCard } from "./LastPlayedSongCard";

const mockSong = {
	artist: { "#text": "Artist Name" },
	album: { "#text": "Album Name" },
	image: [
		{ size: "small", "#text": "" },
		{ size: "medium", "#text": "https://example.com/cover-medium.jpg" },
		{ size: "large", "#text": "https://example.com/cover-large.jpg" },
	],
	streamable: "0",
	date: { uts: "1710000000", "#text": "Mon, 09 Apr 2024 10:00:00 +0000" },
	url: "https://example.com/song",
	name: "Current Song Title",
	mbid: "",
};

describe("CurrentlyListening", () => {
	beforeEach(() => {
		vi.stubGlobal(
			"fetch",
			vi.fn(
				() =>
					Promise.resolve({
						json: () => Promise.resolve({ recenttracks: { track: [mockSong] } }),
					}) as Promise<Response>,
			),
		);
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	it("shows a loading message while the current track is being fetched", () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(() => new Promise<Response>(() => undefined)),
		);

		render(<CurrentlyListening />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
		expect(screen.getByText("Loading...")).toHaveAttribute("aria-busy", "true");
	});

	it("renders the latest song after the fetch resolves", async () => {
		render(<CurrentlyListening />);

		expect(await screen.findByRole("link", { name: /current song title/i })).toHaveAttribute(
			"href",
			"https://example.com/song",
		);
		expect(screen.getByTestId("currently-listening-artist")).toHaveTextContent("Artist Name");
		expect(screen.getByTestId("currently-listening-album")).toHaveTextContent("Album Name");
		expect(screen.getByTestId("currently-listening-album-cover")).toHaveAttribute(
			"alt",
			"Current Song Title by Artist Name from the album Album Name",
		);
	});

	it("falls back to the loading state when the fetch fails", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(() => Promise.reject(new Error("Network failure"))),
		);

		render(<CurrentlyListening />);

		await waitFor(() => {
			expect(screen.getByText("Loading...")).toBeInTheDocument();
		});
	});
});

describe("LastPlayedSongCard", () => {
	it("renders the song details and metadata in the player card", () => {
		render(
			<LastPlayedSongCard
				song={mockSong as Track}
				playerConfig={{
					track: "Track label",
					artist: "Artist label",
					album: "Album label",
					card: { width: "96", height: "96" },
				}}
			/>,
		);

		expect(screen.getByRole("link", { name: /current song title/i })).toHaveAttribute(
			"href",
			"https://example.com/song",
		);
		expect(screen.getByTestId("currently-listening-artist")).toHaveTextContent("Artist Name");
		expect(screen.getByTestId("currently-listening-album")).toHaveTextContent("Album Name");
		expect(screen.getByTestId("currently-listening-album-cover")).toHaveAttribute(
			"alt",
			"Current Song Title by Artist Name from the album Album Name",
		);
		const image = screen.getByTestId("currently-listening-album-cover");
		expect(image).toHaveAttribute("width", "96");
		expect(image).toHaveAttribute("height", "96");
	});
});
