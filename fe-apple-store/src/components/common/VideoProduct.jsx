const VideoProduct = () => {
    return (
        <div>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-7xl aspect-video bg-black rounded-xl overflow-hidden">
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        poster="/placeholder-iphone-video.jpg"
                    >
                        <source src="/iphonevideo.mp4" type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                </div>
            </div>
        </div>
    )
}

export default VideoProduct;
