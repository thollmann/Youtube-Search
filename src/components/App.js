import React from 'react';
import SearchBar from './SearchBar';
import youtube from './../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
    state = { videos: [], selectedVideo: null, videoResults: [] }

    componentDidMount() {
        this.onTermSubmit('react tutorial')
    }

    onTermSubmit = async (term) => {
        const result = await youtube.get('/search', {
            params: {
                q: term
            }
        })

        const videoResults = result.data.items;
        const videos = videoResults.slice();
        const selectedVideo = videos.shift();


        this.setState({ videos, videoResults, selectedVideo })

    };

    onVideoSelect = (video) => {
        const videos = this.state.videoResults.filter((item) => {
            if (item.id.videoId !== video.id.videoId) {
                return item;
            }
        })

        this.setState({ selectedVideo: video, videos });
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onTermSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList
                                videos={this.state.videos}
                                onVideoSelect={this.onVideoSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;