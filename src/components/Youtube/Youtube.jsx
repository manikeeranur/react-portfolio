import React from "react";
import { Link } from "react-router-dom";
import CustomSwiper from "../CustomSwiper/CustomSwiper";
import { SwiperSlide } from "swiper/react";

const Youtube = () => {
  return (
    <>
      <div id="youtube">
        <div className="container youtube py-5 py-md-0">
          <div className="heading-top">YouTube Channel</div>
          <div className="d-flex flex-wrap gap-5">
            <div className="col-md-5 col-12">
              <CustomSwiper>
                {[1, 2, 3, 4, 5].map((data, index) => (
                  <SwiperSlide key={index} className="slide">
                    <Link
                      to="https://www.youtube.com/@studentcodertech8500"
                      target="_blank"
                      className="p-2 d-block bg-secondary"
                      // style={{
                      //   background: "#69696930",
                      // }}
                    >
                      <img
                        src={`http://res.cloudinary.com/duuesjzan/image/upload/v1741522928/youtube_navbar_designs/thumbnail${data}.jpg`}
                        alt="image_thumbnail"
                        className="w-100"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </CustomSwiper>
            </div>
            <div className="col-md col-12">
              <div className="title">Student Coder Tech! 🎯</div>
              <div>
                Student Coder Tech is a Tamil programming YouTube channel
                dedicated to making web development easy for beginners. Learn
                HTML, CSS, and UI Development with step-by-step tutorials and
                hands-on projects.
              </div>

              <div className="my-3">
                <div>
                  🔹 Master Frontend Technologies (HTML, CSS, JavaScript)
                </div>
                <div>🔹 Build Responsive UIs with Flexbox & Grid</div>
                <div>🔹 Create Modern Web Designs with real-world examples</div>
              </div>

              <div>
                🚀 Start your coding journey today! Subscribe now and level up
                your skills.
              </div>
              <Link
                to="https://www.youtube.com/@studentcodertech8500"
                target="_blank"
                className="text-decoration-none text-lavender mt-2 d-block "
              >
                🔗 Subscribe on YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Youtube;

// import React from "react";
// import ReactPlayer from "react-player";
// import { Link } from "react-router-dom";

// const Youtube = () => {
//   return (
//     <div className="container youtube" id="youtube">
//       <div className="heading-top">YouTube Channel</div>

//       <div className="d-flex flex-wrap gap-5">
//         <div className="video-wrapper mb-4 mb-md-0">
//           <ReactPlayer
//             url="https://www.youtube.com/embed/U058fhO_rNY"
//             width="100%"
//             height="315px"
//             controls={true}
//           />
//         </div>

//         <div className="video-wrapper mb-4 mb-md-0">
//           <ReactPlayer
//             url="https://www.youtube.com/embed/vpT4COLg_AY"
//             width="100%"
//             height="315px"
//             controls={true}
//           />
//         </div>
//       </div>

//       <Link
//         to="https://www.youtube.com/@studentcodertech8500"
//         target="_blank"
//         className="my-5 btn btn-secondary"
//       >
//         More Videos to view My YouTube Channel
//       </Link>
//     </div>
//   );
// };

// export default Youtube;
