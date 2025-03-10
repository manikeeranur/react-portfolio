import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const CustomSwiper = ({ children, paginationId }) => {
  return (
    <div className="relative w-full custom-swiper">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          el: `.${paginationId}`, // Unique class for each instance
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

      <div
        className={`${paginationId} custom-pagination d-flex justify-content-center mt-4`}
      ></div>
    </div>
  );
};

export default CustomSwiper;
