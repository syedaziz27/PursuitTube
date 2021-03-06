import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment'

import Services from '../services/services'

class History extends Component {
    constructor(props){
        super(props)
        this.state = {user:'',userhistory:[],users:[],active:''}
    }

    
    componentDidMount(){
        let services = new Services()
        if(JSON.parse(services.getHistory())){
            let history = JSON.parse(services.getHistory())
            let users = Object.keys(history)
            if(services.getActiveUser()){
                const activeUser = services.getActiveUser()
                if(history[activeUser]) this.setState({user:activeUser,userhistory: history[activeUser],users:users,active:true})
            }
            else{
                this.setState({active:false})
            }
        }
        else{
            this.setState({active:false})
        }
    }


    // componentWillReceiveProps(newProps){
    //     //console.log(this.props.match.params.search_term)
    //     //console.log(newProps.match.params.search_term)
    //     this.setState({data:[]})
    //     this.getVideoList(newProps.match.params.search_term)
    //     window.addEventListener('scroll', this.handleOnScroll)
        
    // }


    relativeTime = (dateString)=>{
        const temp = dateString.slice(0,10)
        let str = ''
        for(let i=0;i<temp.length;i++){
            if(temp[i] !== '-') str += (temp[i])
        }
        //console.log(moment(str, "YYYYMMDD").fromNow())
        return moment(str, "YYYYMMDD").fromNow()
    }

    // addHistory = (vidObj)=>{
    //     let services = new Services()
    //     if(services.getActiveUser()) {
    //         services.addHistory(services.getActiveUser(),vidObj)
    //     }

    // }

    changeUser = user =>{
        let services = new Services()
        if(JSON.parse(services.getHistory())){
            let history = JSON.parse(services.getHistory())
            if(history[user]){
                console.log(history[user])
                this.setState({user:user,userhistory:history[user]})
            }
        }
    }

    render() {
            if(this.state.active) return <>
            <div className="jumbotron">
            <div style={{marginLeft:'10%'}}>
            <div className='col-6'><div style={{display:'inline-block'}} className='col-2'><p className='lead'>Users:</p></div> 
            {this.state.users.map(elem=>{
                return <div onClick={e=>this.changeUser(elem)} style={{display:'inline-block'}} className='col-2'>
                <button type="button" className="btn btn-info">{elem}</button></div>
            })}
            </div>
            <div className='col-4'><h3>{this.state.user}'s History</h3></div>
            
            {this.state.userhistory.map((vid, i)=>{
                return <div className='row' key={i}>
                <div className='col-4'>
                    <Link to={`/video/${vid.video_id}`}><img src={vid.img} alt={vid.img} /></Link>
                </div>
                <div className='col-6'>
                    <h5>{vid.title}</h5>
                    <p>{vid.channel_title}</p>
                    <p>{vid.descrip}</p>
                    <p>{this.relativeTime(vid.date)}</p>
                </div>
                </div>

            })}
            {/* <button onClick={e=>{this.getVideoList(this.props.match.params.search_term,this.state.offset+10)}}>Load More</button> */}
            </div>
            </div>
            </>
            else return <div className="card text-center">
            <div className="card-header">
              History
            </div>
            <div className="card-body">
              <h5 className="card-title">No History to see here</h5>
              <p className="card-text">Either there is no active user or active user has no history</p>
              <a href="#" className="btn btn-primary">Home</a>
            </div>
            <div className="card-footer text-muted">
              PursuitTube
            </div>
          </div>
            
        //}     
    }   
}


export default withRouter(History)