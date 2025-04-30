import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import "../styles/Carousel.css";

export default function Banner() {
  const [desktopImage, setDesktopImage] = useState([]);
  const [mobileImage, setMobileImage] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_CAROUSEL_API_URL;
  const baseUrl = import.meta.env.VITE_CAROUSEL_BASE_URL;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch image.");
        const data = await response.json();
        const desktopImages = data.msg.map(
          (item) => `${baseUrl}${item.desktop_format}`
        );
        const mobileImages = data.msg.map(
          (item) => `${baseUrl}${item.mobile_format}`
        );
        setDesktopImage(desktopImages);
        setMobileImage(mobileImages);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchImage();
  }, []);

  return (
    <>
      <div className="carouselWrapper">
        <div
          className="desktopWrapper d-none d-md-flex"
          style={{ height: "100vh" }}
        >
          {error && <p>{error}</p>}
            <Carousel fade controls={false}>
              {desktopImage.map((url, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={url}
                    alt={`Banner ${index + 1}`}
                    className="img-fluid w-100 vh-100 object-fit-fill"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
        </div>
      </div>
      <div className="mobileWrapper d-md-none">
        <Carousel fade controls={false}>
            {mobileImage.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  src={url}
                  alt={`Banner ${index}`}
                  className="img-fluid w-100 vh-50 object-fit-fill"
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
    </>
  );
}
