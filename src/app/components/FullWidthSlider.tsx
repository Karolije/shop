'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const images = [
  '/coffee1.jpg',
  '/coffee2.jpg',
  '/coffee3.jpg',
];

export default function FullWidthSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    // wymusza rerender po pierwszym mountcie, aby przyciski były już dostępne w DOM
    setSwiperReady(true);
  }, []);

  return (
    <div className="relative w-full h-[500px]">
      {swiperReady && (
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            // bez tego strzałki nadal nie działają w niektórych przypadkach
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== 'boolean'
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[500px]">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Strzałki */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <button
          ref={prevRef}
          className="w-10 h-10 bg-white/80 hover:bg-white text-black rounded-full shadow-md flex items-center justify-center transition"
        >
          ◀
        </button>
        <button
          ref={nextRef}
          className="w-10 h-10 bg-white/80 hover:bg-white text-black rounded-full shadow-md flex items-center justify-center transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
