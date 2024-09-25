import React, { useEffect, useState } from "react";
import { MediaTask, MediaTaskTBC } from "../../../../redux/models/Interfaces";
import PDFViewer from "../PDFViewer/PDFViewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import ReactPlayer from "react-player";
import "./MediaViewer.scss";

interface MediaViewerProps {
  mediaList: MediaTaskTBC[] | MediaTask[];
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
  const [allowedMediaList, setAllowedMediaList] = useState<
    (MediaTaskTBC | MediaTask)[]
  >([]);

  useEffect(() => {
    if (mediaList.length > 0) {
      const hasImage = mediaList.some((media) =>
        media.mediaType.includes("image")
      );
      const hasVideo = mediaList.some((media) =>
        media.mediaType.includes("video")
      );

      if (hasImage && hasVideo) {
        // Warn user but still show media
        if (onUploadRestricted) {
          onUploadRestricted(
            "צריך להוסיף תמונה או סרטון , אי אפשר לבחור בשניהם"
          );
        }
      }

      setAllowedMediaList(mediaList.slice(0, maxMediaCount));
    }
  }, [mediaList, maxMediaCount, onUploadRestricted]);

  const handleDeleteMedia = (index: number) => {
    setAllowedMediaList((files) => {
      const newFiles = [...files];
      const deletedFile = newFiles.splice(index, 1)[0];

      if (deletedFile && deletedFile.mediaPath) {
        // Revoke the blob URL to avoid errors after deletion
        URL.revokeObjectURL(deletedFile.mediaPath);
      }

      return newFiles;
    });

    // Call the parent onDelete handler if provided
    if (onDelete) {
      onDelete(index);
    }
  };

  return (
    <div className="task-media-list">
      {allowedMediaList.length > 0 ? (
        <div className="media-grid">
          {allowedMediaList.map((media, index) => (
            <div key={`${media.fileName}-${index}`} className="media-item">
              {media.mediaType.includes("application/pdf") ? (
                media.mediaPath ? (
                  <PDFViewer fileUrl={media.mediaPath} />
                ) : (
                  <div>PDF URL not available</div>
                )
              ) : media.mediaType.includes("audio") ? (
                <div dir="ltr">
                  <AudioPlayer
                    autoPlay={false}
                    src={media.mediaPath || ""}
                    onPlay={(e) => console.log("Playing audio", e)}
                  />
                </div>
              ) : media.mediaType.includes("video") ? (
                <ReactPlayer
                  url={media.mediaPath || ""}
                  controls
                  className="react-player"
                  width="100%"
                  height="100%"
                />
              ) : (
                <>
                  <img
                    className="img-media"
                    src={media.mediaPath || ""}
                    alt={media.fileName}
                    onError={(e) => {
                      e.currentTarget.src = "/path/to/fallback-image.jpg"; // Fallback image
                    }}
                  />
                </>
              )}
              {deletable && onDelete && (
                <button
                  className="delete-image-btn"
                  onClick={() => handleDeleteMedia(index)}
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
