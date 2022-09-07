import mpegts from "mpegts.js"
import { useRef, useEffect } from "react";
import './Video.css';

function Video() {
  const ref = useRef(null);

  var url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://127.0.0.1:7001/live/${process.env.REACT_APP_LIVE_KEY}.flv`
  } else {
    url = `https://live.tthd-app.work/${process.env.REACT_APP_LIVE_KEY}.flv`
  }

  useEffect(() => {
    if (mpegts.getFeatureList().mseLivePlayback) {
      var videoElement = ref.current;
      var player = mpegts.createPlayer({
        type: 'flv',  // could also be mpegts, m2ts, flv
        isLive: true,
        url: url
      });
      player.attachMediaElement(videoElement!);
      player.load();
    }
  }, []);

  return (
    <div id="wrap">
      <video id="videoElement" controls autoPlay ref={ref} >
        Your browser is too old which doesn't support HTML5 video.
      </video>
    </div>
  );
}

export default Video;
