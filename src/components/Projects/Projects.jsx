import React from "react";
import { Link } from "react-router-dom";
import CustomSwiper from "../CustomSwiper/CustomSwiper";
import { SwiperSlide } from "swiper/react";

const Projects = () => {
  return (
    <>
      <div id="projects">
        <div className="container projects py-5 py-md-0">
          <div className="heading-top">My Projects</div>
          <div className="row flex-wrap align-items-start gap-5 gap-md-0">
            <div className="col-md-6 p-md-4 col-12">
              <div className="project-title">
                Programming Blog for Beginners
              </div>
              <CustomSwiper paginationId="swiper-pagination-2">
                {[1, 2, 3, 4].map((data, index) => (
                  <SwiperSlide key={index} className="slide">
                    <Link
                      to="https://blog.manikandan.site/"
                      target="_blank"
                      className="p-2 d-block bg-secondary"
                    >
                      <img
                        src={`https://res.cloudinary.com/duuesjzan/image/upload/v1741628712/portfolio/blog/blog_${data}.jpg`}
                        alt="image_thumbnail"
                        className="w-100"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </CustomSwiper>
            </div>
            <div className="col-md-6 p-md-4 col-12">
              <div className="project-title"> My Portfolio </div>
              <CustomSwiper paginationId="swiper-pagination-3">
                {[1, 2, 3, 4].map((data, index) => (
                  <SwiperSlide key={index} className="slide">
                    <Link
                      to="https://www.manikandan.site/"
                      target="_blank"
                      className="p-2 d-block bg-secondary"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <img
                        src={`https://res.cloudinary.com/duuesjzan/image/upload/v1741630586/portfolio/my_portfolio/slide_${data}.jpg`}
                        alt="image_thumbnail"
                        className="w-100"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </CustomSwiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
