import React, { Component } from 'react';
import './App.css';
let defaultStyle={
  color:"black"
};
let fakeServerData={
  user:{
    name:'David',
    playlists:[
      {
        name: "My favourites",
        songs: [
          {name:"It's my life", duration: 1568},
          {name:"Let it be", duration:3546}, 
          {name:"Unchain my heart", duration:1543}, 
          {name:"Simply the best", duration:2545}
        ]
      },
       {
        name: "My favourites huhuuh",
        songs: [
          {name:"It's my life", duration: 1568},
          {name:"Alien", duration:3546}, 
          {name:"Unchain my heart", duration:1543}, 
          {name:"you aint the best", duration:2545}
        ]
      },
       {
        name: "My not so favourites",
        songs: [
          {name:"ihihihihi", duration: 1568},
          {name:"Let it be", duration:3546}, 
          {name:"hehehehhe", duration:1543}, 
          {name:"Simply the best", duration:2545}
        ]
      },
       {
        name: "So 2 favourites",
        songs: [
          {name:"huhuhuhuh", duration: 1568},
          {name:"gagagagaa hahahaa", duration:3546}, 
          {name:"Unchain my heart", duration:1543}, 
          {name:"johohohohoh", duration:2545}
        ]
      }
    ]
  }
};

class PlayListCounter extends Component{
  render(){
    return(
      <div style={{...defaultStyle, width:'40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );    
  }
}

class HoursCounter extends Component{
  render(){
    let allSongs=this.props.playlists.reduce((songs, eachPlayList)=>{
        return songs.concat(eachPlayList.songs)
    } ,[])
    let totalDuration= allSongs.reduce((sum,eachSong)=>{
      return sum+eachSong.duration
    }
      ,0)
    return(
      <div style={{...defaultStyle, width:'40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );    
  }
}

class Filter extends Component{
  render(){
    return(
      <div style={defaultStyle}>
        <img alt=""/>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }}

class Playlist extends Component{
  render(){
    let playlist= this.props.playlist
    return(
      <div style={{...defaultStyle,display:"inline-block", width:'20%'}}>  
        <img alt=""/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song=> <li>{song.name}</li>)}
       </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      serverData:{},
      filterString:''
    }
  }
  componentDidMount(){
    setTimeout(()=> {
    this.setState({serverData:fakeServerData});
  },2000);
  }
  render() {

    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
          <h1 style={{...defaultStyle, 'font-size':'54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlayListCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter onTextChange={text=> 
            this.setState({filterString:text})}
          />
          {this.state.serverData.user.playlists.filter(
              playlist=> playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
            ).map(playlist=> 
              <Playlist playlist={playlist}/>
            )}
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}
export default App;
