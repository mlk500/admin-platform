import React, { useEffect, useState } from "react";
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
  maxMediaCount?: number;
  onUploadRestricted?: (message: string) => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  mediaList,
  onDelete,
  deletable = false,
  maxMediaCount = 100,
  onUploadRestricted,
}) => {
  const [allowedMediaList, setAllowedMediaList] = useState<MediaTask[]>([]);

  useEffect(() => {
    if (mediaList.length > 0) {
      const hasImage = mediaList.some((media) =>
        media.mediaType.includes("image")
      );
      const hasVideo = mediaList.some((media) =>
        media.mediaType.includes("video")
      );

      if (hasImage && hasVideo) {
        // Restrict mixed uploads
        if (onUploadRestricted) {
          onUploadRestricted(
            "צריך להוסיף תמונה או סרטון , אי אפשר לבחור בשניהם"
          );
        }
        setAllowedMediaList([]);
      } else {
        setAllowedMediaList(mediaList.slice(0, maxMediaCount));
      }
    }
  }, [mediaList, maxMediaCount, onUploadRestricted]);

  return (
    <div className="task-media-list">
      {allowedMediaList.length > 0 ? (
        <div className="media-grid">
          {allowedMediaList.map((media, index) => (
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
      ) : (
        <div className="no-media">No media available</div>
      )}
    </div>
  );
};

export default MediaViewer;
