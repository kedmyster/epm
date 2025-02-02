import { useState, useEffect } from "react";
import Image from "next/image";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { gsap } from "gsap";
import Link from "next/link";
import { useIntl } from "react-intl";

function Main({ data }) {
  const windowWidth = useWindowWidth();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const intl = useIntl();

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

  const scrollToContent = (event) => {
    event.preventDefault();
    document.querySelector("#our-science").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="main"
      className="section main w-full bg-cover text-center text-white relative lg:h-screen"
      data-side-menu-color="light"
      data-side-menu-visibility="visible"
      data-header-menu-visibility="hidden"
    >
      <div className="video">
        {isMobile && (
          <video
            width="375"
            height="812"
            poster="/img/mobile/science/hero@2x.jpg"
            className="inset-0 w-full h-screen object-cover"
            autoPlay
            playsInline
            muted
            loop
          >
            <source src="/videos/mobile/science.mp4" type="video/mp4" />
            <Image
              priority="true"
              src="/img/mobile/science/hero@2x.jpg"
              alt={intl.formatMessage({
                id: "science.hero.title",
                defaultMessage:
                  "Unlock the medical potential of synthetic cannabinoid acids",
              })}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </video>
        )}
        {(isTablet || isDesktop) && (
          <video
            width="1920"
            height="1080"
            poster="/img/desktop/science/hero@2x.jpg"
            className="inset-0 w-full h-screen object-cover"
            autoPlay
            playsInline
            muted
            loop
          >
            <source src="/videos/desktop/science.mp4" type="video/mp4" />
            <Image
              priority="true"
              src="/img/desktop/science/hero@2x.jpg"
              alt={intl.formatMessage({
                id: "science.hero.title",
                defaultMessage:
                  "Unlock the medical potential of synthetic cannabinoid acids",
              })}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </video>
        )}
      </div>
      {/*<div className="absolute w-full h-full inset-0 bg-black bg-opacity-50"></div>*/}
      <div className="absolute bottom-0 w-full py-12">
        <div className="container mx-auto px-8 py-8 relative lg:z-10">
          <h1 className="font-title animate opacity-0 text-4xl lg:text-6xl lg:leading-tight tracking-wide">
            {data.title}
          </h1>
        </div>
        <div className="scroll-to-content animate opacity-0">
          <a
            href="#our-science"
            className="transition-opacity duration-150 hover:opacity-70"
            onClick={scrollToContent}
          >
            <Image
              src="/img/icons/arrow_down.svg"
              alt={data.title}
              width="28"
              height="16"
              loading="eager"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Main;
