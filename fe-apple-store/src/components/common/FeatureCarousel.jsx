import React, { useRef } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router-dom";

// props: features = [{ image, subtitle, title, description, bg }]
const FeatureCarousel = ({ features = [] }) => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({ left: dir * (width * 0.7), behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full py-8 ml-10">

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide px-4"
                style={{ scrollBehavior: 'smooth' }}
            >
                {features.map((f, idx) => (
                    <div
                        key={f.product ? `${f.product}-${idx}` : idx}
                        className={`relative flex-shrink-0 w-64 h-[400px] rounded-3xl shadow-lg p-6 flex flex-col justify-between ${f.bg || 'bg-white'}`}
                    >
                        <div>

                            {f.image && (
                                <div className="mb-4 flex justify-center items-center h-32">
                                    {typeof f.image === 'string' ? (
                                        <img src={f.image} alt={f.title} className="h-full object-contain rounded-xl" />
                                    ) : (
                                        f.image
                                    )}
                                </div>
                            )}
                            {f.subtitle && <div className="text-xs font-semibold mb-2 opacity-80">{f.subtitle}</div>}
                            {f.title && <div className="text-lg font-bold mb-2 leading-tight">{f.title}</div>}
                            {f.description && <div className="text-sm opacity-80">{f.description}</div>}
                        </div>
                        {f.link ? (
                            <Link
                                to={f.link}
                                className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black bg-opacity-70 flex items-center justify-center text-white hover:bg-opacity-90 transition text-sm font-semibold"
                            >
                                Tìm hiểu thêm
                            </Link>
                        ) : null}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center mb-6">
                <button onClick={() => scroll(-1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-2">
                    <ChevronLeftIcon />
                </button>
                <button onClick={() => scroll(1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 ml-2">
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
};

export default FeatureCarousel; 