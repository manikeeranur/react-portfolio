import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Element } from "react-scroll";

const HtmlBlog = () => {
  const [htmlBlogdata, sethtmlBlogdata] = useState([]);

  const GetHTMLBlogData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/htmlBlog");
      sethtmlBlogdata(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    GetHTMLBlogData();
  }, []);

  return (
    <div id="html-blog" className="w-100 bg-white py-5 html-blog">
      <h1>My Blog</h1>
      <hr />

      <div className="row m-0">
        <div className="col-md-2 border-end">
          <ul className="list-unstyled sticky-top" style={{ top: "75px" }}>
            {htmlBlogdata.map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={item.menuName.replace(/\s+/g, "-")}
                  smooth={true}
                  duration={400}
                  offset={-80}
                  //   containerId="html-blog"
                  className="nav-link text-secondary text-capitalize cursor-pointer"
                >
                  HTML {item.menuName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col">
          {htmlBlogdata.map((item, index) => (
            <Element name={item.menuName.replace(/\s+/g, "-")} key={index}>
              <div id={item.menuName.replace(/\s+/g, "-")}>
                <h1 className="mb-3">{item.heading}</h1>
                <div
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></div>
                <div
                  className="mb-5"
                  dangerouslySetInnerHTML={{ __html: item.example }}
                ></div>
              </div>
            </Element>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HtmlBlog;
