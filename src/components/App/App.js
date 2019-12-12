import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
	state = {
		searchResults: [],
		playlistName: "My Playlist",
		playlistTracks: []
	};

	updatePlaylistName = name => {
		this.setState({
			playlistName: name
		});
	};

	addTrack = track => {
		let tracks = [track, ...this.state.playlistTracks];
		this.setState({
			playlistTracks: tracks
		});
	};

	removeTrack = track => {
		let tracks = this.state.playlistTracks.filter(trackToRemove => trackToRemove.id !== track.id);
		this.setState({
			playlistTracks: tracks
		});
	};

	savePlaylist = () => {
		const { playlistTracks, playlistName } = this.state;

		const trackUris = playlistTracks.map(track => track.uri);
		Spotify.savePlaylist(playlistName, trackUris).then(() => {
			this.setState({
				playlistName: "New Playlist",
				playlistTracks: []
			});
		});
	};

	search = term => {
		Spotify.search(term).then(searchResults => {
			this.setState({
				searchResults: searchResults
			});
		});
	};

	render() {
		return (
			<div>
				<h1>
					Ja<span className="highlight">mmm</span>ing
				</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
						<Playlist
							onNameChange={this.updatePlaylistName}
							playlistTracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
							onSave={this.savePlaylist}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
