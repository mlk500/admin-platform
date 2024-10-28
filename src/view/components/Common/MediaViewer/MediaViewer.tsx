import React from "react";
import { MediaTask } from "../../../../redux/models/Interfaces";
import PDFViewer from "../PDFViewer/PDFViewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import ReactPlayer from "react-player";
import "./MediaViewer.scss";

interface MediaViewerProps {
  mediaList: MediaTask[];
  onDelete?: (index: number) => void;
  deletable?: boolean;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  mediaList,
  onDelete,
  deletable = false,
}) => {
  return (
    <div className="media-grid">
      {mediaList.map((media, index) => (
        <div key={media.mediaTaskID} className="media-item">
          {media.mediaType.includes("application/pdf") ? (
            media.mediaUrl ? (
              <PDFViewer fileUrl={media.mediaUrl} />
            ) : (
              <div>PDF URL not available</div>
            )
          ) : media.mediaType.includes("audio") ? (
            <div dir="ltr">
              <AudioPlayer
                autoPlay={false}
                src={media.mediaUrl || ""}
                onPlay={(e) => console.log("Playing audio", e)}
              />
            </div>
          ) : media.mediaType.includes("video") ? (
            <ReactPlayer
              url={media.mediaUrl || ""}
              controls
              className="react-player"
              width="100%"
              height="100%"
            />
          ) : (
            <img
              className="img-media"
              src={media.mediaUrl || ""}
              alt={media.fileName}
            />
          )}
          {deletable && onDelete && (
            <button
              className="delete-image-btn"
              onClick={() => onDelete(index)}
            >
              מחיקה
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaViewer;
