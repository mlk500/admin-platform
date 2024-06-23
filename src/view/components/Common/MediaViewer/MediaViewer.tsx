import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MediaTask } from '../../../../redux/models/Interfaces';
import { SwiperConfig } from '../..';
import PDFViewer from '../PDFViewer/PDFViewer';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactPlayer from 'react-player';

interface MediaViewerProps {
    mediaList: MediaTask[];
    onDelete?: (index: number) => void; // Optional delete function
    deletable?: boolean; // Optional flag to show delete button
}

const MediaViewer: React.FC<MediaViewerProps> = ({ mediaList, onDelete, deletable = false }) => {
    const adjustPath = (path: string) => path.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..');

    return (
        <div className='task-media-list'>
            <Swiper {...SwiperConfig("horizontal")}>
                {mediaList.map((media, index) => (
                    <SwiperSlide key={media.mediaTaskID} className='swiper-slide'>
                        {media.mediaType.includes('application/pdf') ? (
                            <PDFViewer fileUrl={adjustPath(media.mediaPath)} />
                        ) : media.mediaType.includes('audio') ? (
                            <div dir='ltr'>
                                <AudioPlayer
                                    autoPlay={false}
                                    src={adjustPath(media.mediaPath)}
                                    onPlay={e => console.log("Playing audio", e)}
                                />
                            </div>
                        ) : media.mediaType.includes('video') ? (
                            <ReactPlayer
                                url={adjustPath(media.mediaPath)}
                                controls
                                className="react-player"
                                width='100%'
                                height='100%'
                            />
                        ) : (
                            <img className='img-media'
                                src={adjustPath(media.mediaPath)}
                                alt={media.fileName}
                            />
                        )}
                        {deletable && onDelete && (
                            <button
                                className='delete-image-btn'
                                onClick={() => onDelete(index)}
                            >
                                מחיקה
                            </button>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MediaViewer;
