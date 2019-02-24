// import React from 'react'

// const Video = ()=>{
//     return <h1>Video</h1>
// }

// export default Video


import React from 'react';

const VideoPlayer = (props) => {
  const {id} = props
  const link = `https://www.youtube.com/embed/${id}?autoplay=1&fs=1&origin=http://localhost:3000`;

  return (
    <iframe title='yt-video' type="text/html" width="640" height="360"
  src={link} frameBorder="0"></iframe>
  );
}

export default VideoPlayer;