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
import 'react-h5-audio-player/src/styles.scss';
import ReactPlayer from 'react-player';
import './MediaViewer.scss'

interface MediaViewerProps {
    mediaList: MediaTask[];
    onDelete?: (index: number) => void;
    deletable?: boolean;
}

const MediaViewer: React.FC<MediaViewerProps> = ({ mediaList, onDelete, deletable = false }) => {
    return (
        <div className='task-media-list'>
            <Swiper {...SwiperConfig("horizontal")}>
                {mediaList.map((media, index) => (
                    <SwiperSlide key={media.mediaTaskID} className='swiper-slide'>
                        {media.mediaType.includes('application/pdf') ? (
                            media.mediaUrl ? <PDFViewer fileUrl={media.mediaUrl} /> : <div>PDF URL not available</div>
                        ) : media.mediaType.includes('audio') ? (
                            <div dir='ltr'>
                                <AudioPlayer
                                    autoPlay={false}
                                    src={media.mediaUrl || ''}
                                    onPlay={e => console.log("Playing audio", e)}
                                />
                            </div>
                        ) : media.mediaType.includes('video') ? (
                            <ReactPlayer
                                url={media.mediaUrl || ''}
                                controls
                                className="react-player"
                                width='100%'
                                height='100%'
                            />
                        ) : (
                            <img className='img-media'
                                src={media.mediaUrl || ''}
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