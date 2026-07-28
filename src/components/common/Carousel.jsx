import React, { useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ items, renderItem, perView = { base: 1, md: 3 }, gap = 20, keyField = "id" }) => {
  const uid = useId().replace(/[:]/g, "");
  const prevClass = `car-prev-${uid}`;
  const nextClass = `car-next-${uid}`;
  const dotClass = `car-dot-${uid}`;

  return (
    <div className="carousel-wrap">
      <button type="button" className={`carousel-arrow carousel-arrow-prev ${prevClass}`} aria-label="Previous">
        <i className="fa fa-chevron-left" aria-hidden="true" />
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
        pagination={{
          el: `.${dotClass}`,
          clickable: true,
          renderBullet: (i, className) => `<span class="${className} custom-dot"></span>`,
        }}
        spaceBetween={gap}
        slidesPerView={perView.base}
        slidesPerGroup={perView.base}
        breakpoints={{ 768: { slidesPerView: perView.md, slidesPerGroup: perView.md } }}
        className="carousel-swiper"
      >
        {items.map((item, i) => (
          <SwiperSlide key={item[keyField] || i}>{renderItem(item, i)}</SwiperSlide>
        ))}
      </Swiper>

      <button type="button" className={`carousel-arrow carousel-arrow-next ${nextClass}`} aria-label="Next">
        <i className="fa fa-chevron-right" aria-hidden="true" />
      </button>

      <div className={`${dotClass} carousel-dots`}></div>
    </div>
  );
};

export default Carousel;
