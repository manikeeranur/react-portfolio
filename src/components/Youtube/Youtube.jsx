import React from "react";
import { Link } from "react-router-dom";

const Youtube = () => {
  return (
    <>
      <div className="container youtube" id="youtube">
        <div className="heading-top">YouTube Channel</div>

        <div className="d-flex  flex-wrap gap-5">
          <div className="video-wrapper mb-5 mb-md-0">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/U058fhO_rNY?si=Ca5e9Ue-PonRaGkr"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>

          <div className="video-wrapper  mb-5 mb-md-0">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/vpT4COLg_AY?si=s0ksgkuRhK0GF3U3"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <Link
          to="https://www.youtube.com/@studentcodertech8500"
          target="_blank"
          className="my-5 btn btn-secondary"
        >
          More Videos to view My YouTube Channel
        </Link>
      </div>
    </>
  );
};

export default Youtube;
