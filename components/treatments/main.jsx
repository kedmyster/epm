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
    gsap.fromTo(
      ".scroll-to-content",
      { opacity: 0.5 },
      {
        opacity: 1,
        duration: 3,
        y: "-=10px",
        yoyo: true,
        repeat: -1,
        ease: "easeInOut",
      }
    );
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
      className="section main w-full bg-cover text-center text-white relative lg:h-screen lg:-mt-20"
      data-side-menu-color="light"
      data-side-menu-visibility="visible"
    >
      <div className="absolute w-full h-full">
        {isMobile && (
          <Image
            loading="eager"
            src="/img/mobile/hero@3x.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        )}
        {isDesktop && (
          <Image
            loading="eager"
            src="/img/desktop/hero@2x.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        )}
      </div>
      <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
      <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:bottom-24 lg:w-full">
        <div className="container mx-auto px-8 py-8 absolute bottom-36 lg:bottom-10 lg:relative lg:z-10">
          <p className="text-xs uppercase font-title mb-4 lg:hidden">
            Our Treatments
          </p>
          <h1 className="font-title text-4xl lg:text-8xl tracking-wide lg:w-container lg:mx-auto lg:leading-tight">
            Medicines We Develop Today
          </h1>
          
        </div>
        <div className="container w-container mx-auto px-8 py-8 hidden relative z-10 lg:flex lg:flex-row ">
        <div className="w-1/3">
          <div className="icon w-16 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="68" height="68" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text font-title text-2xl">Alternative</div>
        </div>
        <div className="w-1/3">
          <div className="icon w-16 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="68" height="68" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text font-title text-2xl">Affordable</div>
        </div>
        <div className="w-1/3">
          <div className="icon w-16 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="68" height="68" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text font-title text-2xl">No side effects</div>
        </div>
      </div>
      </div>
      <div className="scroll-to-content absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a
          href="#story"
          onClick={scrollToContent}
          className="transition-opacity duration-150 hover:opacity-70"
        >
          <Image src="/img/icons/arrow_down.svg" width="28" height="16" />
        </a>
      </div>
    </section>
  );
}

export default Main;
