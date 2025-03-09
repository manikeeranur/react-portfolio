import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const CustomSwiper = ({ children }) => {
  return (
    <div className="relative w-full custom-swiper">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-dot"></span>`;
          },
        }}
        effect="fade"
        grabCursor={true}
        className="mySwiper"
      >
        {children}
      </Swiper>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination d-flex justify-content-center mt-4"></div>
    </div>
  );
};

export default CustomSwiper;
