"use client";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function YouTubeVideo({ videoId }: { videoId: string }) {
  return (
    <div>
      <LiteYouTubeEmbed
        id={videoId}
        title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
        cookie={true}
      />
    </div>
  );
}
