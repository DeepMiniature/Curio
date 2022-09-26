import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Recorder from './Recorder';
import Player from './Player';
import Mynavbar from './Navbar';
import '../style/styles.css';
class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }
    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items
        })
        console.log("this is resp",response);
    };
    setVidId = (vidId) => {
        this.setState({selectedVideo: vidId})
        console.log(vidId);
    }
    render() {
        return (
            <>
            <Mynavbar />
            <Router>
                <Switch>

                    <Route path="/play">
                        <Player />
                        <h2>Video Will Play here.</h2>
                    </Route>

                    <Route path="/record">
                        <Recorder />
                        <h2>This is the Recorder Page</h2>
                    </Route>

                    <Route path="/">
                        <div style={{marginTop: '1em'}}>
                            <SearchBar handleFormSubmit={this.handleSubmit}/>
                            <div>
                                <div>
                                    <VideoDetail video={this.state.selectedVideo}/>
                                    <VideoList setVidId={this.setVidId} videos={this.state.videos}/>
                                </div>
                            </div>
                        </div>
                    </Route>
                    
                </Switch>
            </Router>
            </>
        )
    }
}

export default App;