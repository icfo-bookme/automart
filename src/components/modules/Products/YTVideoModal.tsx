"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";

interface YTVideoModalProps {
    videoUrl: string;
    children?: React.ReactNode;
}

const extractVideoId = (url: string) => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
};

const YTVideoModal: React.FC<YTVideoModalProps> = ({ videoUrl, children }) => {
    const videoId = extractVideoId(videoUrl);
    const [isOpen, setIsOpen] = React.useState(false);

    if (!videoId) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden">
                    {/* YouTube thumbnail */}
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="YouTube thumbnail"
                        className="w-full h-full object-cover"
                    />
                    {/* Centered YouTube play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                                className="w-8 h-8 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 2v20l18-10L4 2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="w-full max-w-3xl aspect-video p-0 overflow-hidden rounded-lg">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video"
                    allowFullScreen
                    allow="autoplay"
                />
                <DialogClose className="absolute top-2 right-2 text-white hover:text-gray-300">
                    ✕
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default YTVideoModal;