import { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { useRouter } from "next/router";
import { useNextSanityImage } from "next-sanity-image";
import { useIntl, FormattedMessage } from "react-intl";
import client from "../../client";
import { gsap } from "gsap";
import slugify from "slugify";
import Button from "../shared/Button";
import SectionHeader from "../shared/SectionHeader";
import {
  SliderCustomPreviousArrow,
  SliderCustomNextArrow,
} from "../shared/carousel";

const BlockContent = require("@sanity/block-content-to-react");

function OurScience({ data }) {
  for (let i = 0; i < data.videos.length; i++) {
    for (let j = 0; j < data.videos[i].video.length; j++) {
      data.videos[i].images = {
        mobile: useNextSanityImage(client, data.videos[i].mobile_image),
        desktop: useNextSanityImage(client, data.videos[i].desktop_image),
      };
    }
  }

  const windowWidth = useWindowWidth();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const intl = useIntl();

  const SLIDER_SOLUTION_CONFIG = {
    dots: false,
    rtl: router.locale === "he",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (slick, currentSlide, nextSlide) => {
      const item = document.querySelector(
        "#our-science .item[aria-expanded='true']"
      );

      if (item) {
        const video = item.querySelector(".video");
        const button = item.querySelector("a");

        if (video.player) {
          video.player.stopVideo();
        }

        item.setAttribute("aria-expanded", "false");
        video.classList.add("hidden");
        button.innerText = intl.formatMessage({
          id: "common.playVideo",
          defaultMessage: "Play Video",
        });
      }
    },
    nextArrow: <SliderCustomNextArrow color="light" />,
    prevArrow: <SliderCustomPreviousArrow color="light" />,
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

  useEffect(() => {
    gsap.fromTo(
      ".scroll-to-content",
      { opacity: 0.5 },
      {
        opacity: 1,
        duration: 2,
        y: "-=10px",
        yoyo: true,
        repeat: -1,
        ease: "easeInOut",
      }
    );
  }, []);

  useEffect(() => {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  const toggleVideo = (event) => {
    const item = event.target.closest(".item");
    const video = item.querySelector(".video");
    const button = item.querySelector("a");

    if (item.getAttribute("aria-expanded") === "false") {
      item.setAttribute("aria-expanded", "true");
      video.classList.remove("hidden");
      button.innerText = intl.formatMessage({
        id: "common.closeVideo",
        defaultMessage: "Close Video",
      });

      if (video.player) {
        video.player.playVideo();
      } else {
        const videoId = video.dataset.videoId;
        const player = new YT.Player(video, {
          height: "100%",
          width: "100%",
          videoId,
          events: {
            onReady: (event) => {
              event.target.playVideo();
              event.target.h.player = event.target;
            },
          },
        });
      }
    } else {
      item.setAttribute("aria-expanded", "false");
      video.classList.add("hidden");
      button.innerText = intl.formatMessage({
        id: "common.playVideo",
        defaultMessage: "Play Video",
      });

      if (video.player) {
        video.player.stopVideo();
      } else {
        const videoId = video.dataset.videoId;
        const player = new YT.Player(video, {
          height: "100%",
          width: "100%",
          videoId,
          events: {
            onReady: (event) => {
              event.target.stopVideo();
              event.target.h.player = event.target;
            },
          },
        });
      }
    }
  };

  return (
    <section
      id="our-science"
      className="section our-science relative w-full flex flex-wrap border-b-1 border-epm-gray-300 lg:flex-row-reverse lg:h-screen"
      data-side-menu-label={intl.formatMessage({
        id: "science.science.title",
        defaultMessage: "Our Science",
      })}
      data-side-menu-color="dark"
      data-side-menu-visibility="visible"
      data-header-menu-visibility="visible"
    >
      <div className="w-full lg:w-6/12 2xl:w-7/12">
        <div className="items animate opacity-0">
          <Slider {...SLIDER_SOLUTION_CONFIG}>
            {data.videos.map((slide) => {
              return (
                <div
                  className="item relative lg:flex-grow lg:h-screen"
                  key={slide.name}
                  dir={router.locale === "he" ? "rtl" : "ltr"}
                  aria-expanded="false"
                >
                  {
                    <div className="image w-full h-2/3-screen">
                      {isMobile && (
                        <Image
                          loading="eager"
                          src={slide.images.mobile.src}
                          alt={slide.name}
                          layout="fill"
                          objectFit="cover"
                          quality={100}
                        />
                      )}
                      {(isTablet || isDesktop) && (
                        <Image
                          loading="eager"
                          src={slide.images.desktop.src}
                          alt={slide.name}
                          layout="fill"
                          objectFit="cover"
                          quality={100}
                        />
                      )}
                      <div className=" absolute w-full bottom-8 flex justify-center">
                        <span className="button">
                          <Button
                            style="light"
                            onClick={(event) => toggleVideo(event)}
                          >
                            <FormattedMessage
                              id="common.playVideo"
                              defaultMessage="Play Video"
                            />
                          </Button>
                        </span>
                      </div>
                    </div>
                  }
                  <div
                    id={`video-${slugify(slide.name, { lower: true })}`}
                    className="video absolute inset-0 hidden"
                    data-video-id={slide.video}
                  ></div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className="lg:flex-shrink-0 lg:ps-24 xl:ps-56 lg:w-6/12 2xl:w-5/12 lg:h-screen overflow-y-hidden lg:overflow-y-auto">
        <div className="container px-8 lg:ps-0 py-8 lg:max-w-none lg:w-80 2xl:w-96">
          <div className="mb-6 lg:mb-0">
            <SectionHeader name={data.name} title={<h2>{data.title}</h2>} />
          </div>
          <div className="text animate opacity-0 lg:text-epm-base lg:mt-6">
            <BlockContent blocks={data.content} className="external-text" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurScience;
