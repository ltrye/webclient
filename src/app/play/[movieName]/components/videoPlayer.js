"use client";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useEffect, useRef } from "react";

export default function VideoJS(props) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      });
      const player = playerRef.current;
      player.addClass("vjs-matrix");

      //Track for safari user
      var track = document.createElement("track");
      track.setAttribute("kind", "captions");
      track.setAttribute("src", "/chap4.vtt");
      track.setAttribute("srclang", "en");
      track.setAttribute("label", "English");
      track.setAttribute("default", "");
      //Adding track
      const trueVideo = document.querySelector(".vjs-tech");
      trueVideo.appendChild(track);
      ///////////////////////
      // Fetching for blob
      // fetch(
      //   "https://public.sn.files.1drv.com/y4mSw3xTuk9fIybuMhO1v8-htuZOf9cXXEVouOcHxVe4TAC3BwmBK3tJapqQCHP3ME5gACuY7bkv3l61x7qTxUuNB3N3neK5YNE-To4t3v4l8XDvow9gD4qg23jr1XU0El3sxcR6ECZNyVvf-RPIlmd7KYuu-vdTcB1Ajvfmb_7sBVN3nb4YbHypfK6ZFVSaZSz"
      // )
      //   .then((result) => result.blob())
      //   .then((blob) => {
      //     const blobURL = URL.createObjectURL(blob);
      //     player.src({ src: blobURL, type: "video/mp4" });
      //   })
      //   .catch((err) => console.log(err));
      //
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="video-config" data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
