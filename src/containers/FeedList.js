import React, {Component} from 'react'
import CreateListTitle from '../components/feed-list_components/create-list-title';
import ExploreListFeed from '../components/feed-list_components/explore-list-title';
import AddFeed from '../components/feed-list_components/add-feed';
import FeedEditor from '../components/feed-list_components/feed-editor';

class FeedList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feeds: [],
        }
    }

    updateUserFeed = (feedName) => {
        this.setState({
            feeds: this.state.feeds.push(feedName),
        })
    }

    render() {
        return(
            <>
                <div className='container'>
                    <div className='row'>
                        <CreateListTitle />
                        <ExploreListFeed />
                    </div>
                    <div className='row'>
                        <AddFeed updateUserFeed={this.updateUserFeed}/>
                        <FeedEditor />
                    </div>
                </div>
            </>
        )
    }   
}

export default FeedList;

