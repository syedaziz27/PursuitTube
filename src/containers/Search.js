import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import Services from '../services/services'
import axios from 'axios'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {isLoading:true, data:[]}
    }

    getVids = (query)=>{
        axios({ 
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
                part: 'snippet',
                maxResults: 8,
                videoDefinition: 'high',
                type: 'video',
                videoEmbeddable: 'true',
                key: 'AIzaSyDEsrVHQ4ZTg26TevQhP882rTDPFyCc4Jw',
                q: query,
                pageToken: ''
            }
        })
        .then(response=>{
            const data = []
            
            response.data.items.forEach(vid=>{
                let temp = {}
                console.log(vid.snippet)
                //const video_id = vid.snippet.thumbnails.medium.url
                console.log(vid.id.videoId)
                temp.video_id = vid.id.videoId
                temp.img = vid.snippet.thumbnails.medium.url
                temp.title = vid.snippet.title
                temp.channel_title = vid.snippet.channelTitle
                
                data.push(temp)
                console.log(data)
        })
        
        this.setState({isLoading:false,data:data})
        })
    }
    
    getVideoID = url =>{
        this.state.data.forEach(vid =>{
            if(vid.img === url) {
                const services = new Services()
                services.addVideo(vid.video_id)
                localStorage.setItem('suggestions',JSON.stringify(this.state.data))
                this.props.history.push(`/video/${vid.video_id}`);
            }
        })
    }

    componentDidMount(){
        console.log(this.props.match.params.search_term)
        this.getVids(this.props.match.params.search_term)
    }

    // componentDidUpdate(prevprops){
    //    console.log('updated', prevprops, this.props)
    //    //if (prevprops.match.params.search_term !== this.props.match.params.search) this.getVids()
    // }

    componentWillReceiveProps(newProps){
        console.log(newProps.match.params.search_term)
        this.getVids(newProps.match.params.search_term)
    }

    render(){
        // props.match.params.search_term
        if(this.state.isLoading) return <h1>loading</h1>
        else 
            // <h3>Search results for BLANK</h3>
            return this.state.data.map((vid, i)=>{
                return <div className='row' key={i}>
                    <div className='col'>
                        <img src={vid.img} onClick={e=>{this.getVideoID(e.target.src)}} />
                    </div>
                    <div className='col'>
                        <p>{vid.title}</p>
                        <p>{vid.channel_title}</p>
                    </div>
                </div>
            })
                        
                    
    }
    
}


export default withRouter(Search)