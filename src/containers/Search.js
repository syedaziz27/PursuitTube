import React from 'react'
import axios from 'axios'
import Async from 'react-promise'



const Search = (props) =>{
    const {query,changeState} = props
    const getVids = axios({ 
        method: 'get',
        url: 'https://www.googleapis.com/youtube/v3/search',
        params: {
            part: 'snippet',
            maxResults: 3,
            videoDefinition: 'high',
            type: 'video',
            videoEmbeddable: 'true',
            key: 'AIzaSyDEsrVHQ4ZTg26TevQhP882rTDPFyCc4Jw',
            q: query,
            pageToken: ''
        }
    })

    getVids.then(response=>{
            //console.log(response.data.items[0].id.videoID) //img url
        })

    return <Async promise={getVids} 
    then={response =>{
        let urlAndvidId = {}
        return response.data.items.map(vid=>{
            const temp = vid.snippet.thumbnails.medium.url
            urlAndvidId[temp] = vid.id.videoId
            //console.log(vid.id.videoId)
            return <>
                <h3>Search results for {query}</h3>
                <div className='row'>
                    <div className='col'>
                        <img src={vid.snippet.thumbnails.medium.url} onClick={e=>changeState({videoID:urlAndvidId[e.target.src]})}  />
                    </div>
                    <div className='col'>
                        <p>{vid.snippet.title}</p>
                        <p>{vid.snippet.channelTitle}</p>
                    </div>
                </div>
            </>
        })
        //  return <div>test</div>
        } }/>
    
}

    
    
    
        


export default Search