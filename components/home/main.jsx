import { useState, useEffect } from "react";
import Image from "next/image";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { gsap } from "gsap";

function Main() {
  const windowWidth = useWindowWidth();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (windowWidth > 1024) {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
    } else if (windowWidth > 768) {
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
    setTimeout(() => {
      const tl = gsap.timeline();
  
      tl.to(".scroll-to-content", {
        duration: 3,
        y: "-=10px",
        yoyo: true,
        repeat: -1,
        ease: "easeInOut",
      });
    });
  }, []);

  const scrollToContent = (event) => {
    event.preventDefault();
    document.querySelector("#story").scrollIntoView({
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
      <div>
        <div className="absolute w-full h-full">
          {isMobile && (
            <img src="/img/mobile/homepage/hero@3x.jpg" alt="" className="inset-0" />
          )}
          {isDesktop && (
            <img src="/img/desktop/homepage/hero@2x.jpg" alt="" className="inset-0" />
          )}
        </div>
        <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-8 py-8 absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 bottom-36 lg:bottom-10">
          <h1 className="main__title animate font-title text-4xl lg:text-7.5xl lg:leading-tight tracking-wide mb-4 lg:mb-64">
            Medicines to All.
          </h1>
          <p className="main__tagline animate lg:text-3xl lg:font-light">
            New generation of prescription medications
          </p>
          <Image src="/img/mobile/1.jpg" alt="" width="1" height="1" />
        </div>
        <div className="scroll-to-content animate absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <a
            href="#story"
            onClick={scrollToContent}
            className="transition-opacity duration-150 hover:opacity-70"
          >
            <Image src="/img/icons/arrow_down.svg" width="28" height="16" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Main;
