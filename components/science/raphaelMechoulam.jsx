import { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { gsap } from "gsap";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import SectionHeader from "../shared/SectionHeader";
import Button from "../shared/Button";
import {
  SliderCustomPreviousArrow,
  SliderCustomNextArrow,
} from "../shared/carousel";

function RaphaelMechoulam() {
  const windowWidth = useWindowWidth();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const SLIDER_RAPHAEL_MECHOULAM_CONFIG = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderCustomNextArrow color="gray" />,
    prevArrow: <SliderCustomPreviousArrow color="gray" />,
  };

  useEffect(() => {
    if (windowWidth >= 1280) {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
    } else if (windowWidth >= 1024) {
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
    } else {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
    }
  }, [windowWidth]);

  const mechoulam = [
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-01@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-01@2x.jpg",
      },
      label: "Label 1",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-02@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-02@2x.jpg",
      },
      label: "Label 2",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-03@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-03@2x.jpg",
      },
      label: "Label 3",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-04@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-04@2x.jpg",
      },
      label: "Label 4",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-05@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-05@2x.jpg",
      },
      label: "Label 5",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-06@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-06@2x.jpg",
      },
      label: "Label 6",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-07@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-07@2x.jpg",
      },
      label: "Label 7",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-08@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-08@2x.jpg",
      },
      label: "Label 8",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-09@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-09@2x.jpg",
      },
      label: "Label 9",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-10@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-10@2x.jpg",
      },
      label: "Label 10",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-11@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-11@2x.jpg",
      },
      label: "Label 11",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-12@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-12@2x.jpg",
      },
      label: "Label 12",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-13@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-13@2x.jpg",
      },
      label: "Label 13",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-14@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-14@2x.jpg",
      },
      label: "Label 14",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-15@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-15@2x.jpg",
      },
      label: "Label 15",
    },
    {
      images: {
        mobile: "/img/mobile/science/mechoulam/mechoulam-16@2x.jpg",
        desktop: "/img/desktop/science/mechoulam/mechoulam-16@2x.jpg",
      },
      label: "Label 16",
    },
  ];

  return (
    <section
      id="raphael-mechoulam"
      className="section raphael-mechoulam lg:flex lg:flex-wrap lg:flex-row-reverse lg:h-screen lg:overflow-y-hidden"
      data-side-menu-label="Mechoulam's Bio"
      data-side-menu-color="dark"
      data-side-menu-visibility="visible"
      data-header-menu-visibility="visible"
    >
      <div className="items animate opacity-0 text-white lg:h-screen lg:w-6/12 2xl:w-7/12">
        <Slider {...SLIDER_RAPHAEL_MECHOULAM_CONFIG}>
          {mechoulam.map((item, index) => {
            return (
              <div className="item cursor-pointer outline-none">
                <div className="group relative text-center w-full flex flex-wrap content-end lg:content-start lg:transition-all lg:duration-500 lg:ease-in-out lg:h-screen">
                  <div className="w-full h-full flex items-end lg:items-start justify-center lg:justify-start">
                    {isMobile && (
                      <Image
                        loading="eager"
                        src={item.images.mobile}
                        alt="Raphael Mechoulam"
                        width={452}
                        height={601}
                        objectFit="cover"
                        quality={100}
                      />
                    )}
                    {(isTablet || isDesktop) && (
                      <Image
                        loading="eager"
                        src={item.images.desktop}
                        alt="Raphael Mechoulam"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="lg:pl-44 xl:pl-56 pt-10 lg:pt-0 lg:w-6/12 2xl:w-5/12 lg:h-screen overflow-y-hidden lg:overflow-y-auto">
        <div className="container lg:w-64 xl:w-80 2xl:w-96 px-8 lg:pl-0 py-8">
          <SectionHeader
            name={<span>Raphael Mechoulam</span>}
            title={
              <h2>
                The Godfather of
                <br />
                Cannabis Science
              </h2>
            }
          />
          <div className="text lg:text-epm-base animate opacity-0 mt-6">
            <p>
              Read more about the inspiring life of Prof. Rephael Mechoulam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RaphaelMechoulam;
