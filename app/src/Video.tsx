import mpegts from "mpegts.js"
import { useRef, useEffect } from "react";
import './App.css';

function Video() {
  const ref = useRef(null);

  var url = process.env.REACT_APP_LIVE_URL!

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
    <div className="video-wrap">
      <video id="videoElement" controls autoPlay ref={ref} >
        Your browser is too old which doesn't support HTML5 video.
      </video>
    </div>
  );
}

export default Video;
