import { useState, useEffect } from "react";
import Image from "next/image";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { useIntl } from "react-intl";
import { useNextSanityImage } from "next-sanity-image";
import client from "../../client";
import { gsap } from "gsap";
import SectionHeader from "../shared/SectionHeader";
import { getId } from "../../utils";

const BlockContent = require("@sanity/block-content-to-react");

function Leadership({ data }) {
  for (let i = 0; i < data.leaders__group.length; i++) {
    for (let j = 0; j < data.leaders__group[i].leaders.length; j++) {
      data.leaders__group[i].leaders[j].images = {
        mobile: useNextSanityImage(
          client,
          data.leaders__group[i].leaders[j].mobile_image
        ),
        desktop: useNextSanityImage(
          client,
          data.leaders__group[i].leaders[j].desktop_image
        ),
      };
    }
  }

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

  const toggleLeader = (event) => {
    event.preventDefault();

    const leaders = document.querySelectorAll(".leader");
    const currentLeader = event.target.closest(".leader");

    leaders.forEach((leader) => {
      const leaderText = leader.querySelector(".leader__text");
      const arrow = leader.querySelector(".arrow");

      if (leader === currentLeader) {
        if (currentLeader.getAttribute("aria-expanded") === "false") {
          leader.setAttribute("aria-expanded", "true");
          leaderText.classList.remove("hidden");
          gsap.to(arrow, { rotation: 180, duration: 0.25 });
        } else {
          leader.setAttribute("aria-expanded", "false");
          leaderText.classList.add("hidden");
          gsap.to(arrow, { rotation: 0, duration: 0.25 });
        }
      } else {
        leader.setAttribute("aria-expanded", "false");
        leaderText.classList.add("hidden");
        gsap.to(arrow, { rotation: 0, duration: 0.25 });
      }
    });
  };

  return (
    <>
      {data.leaders__group.map((group) => {
        return (
          <section
            id={getId(group.id)}
            key={getId(group.title)}
            className="section leadership relative w-full flex flex-col lg:flex-row lg:border-b-1 lg:border-epm-gray-300 lg:h-screen min-h-0 lg:min-h-screen"
            data-side-menu-label={group.label}
            data-side-menu-color="dark"
            data-side-menu-visibility="visible"
            data-header-menu-visibility="visible"
          >
            <div className="lg:flex-grow lg:ps-24 xl:ps-56 lg:w-6/12 2xl:w-5/12 lg:h-screen overflow-y-hidden lg:overflow-y-auto">
              <div className="container mx-auto lg:mx-0 px-8 lg:ps-0 py-8 lg:max-w-none lg:w-80 2xl:w-96 lg:top-0">
                <div className="">
                  <SectionHeader
                    name={group.name}
                    title={<h2>{group.title}</h2>}
                  />
                </div>
                {(isTablet || isDesktop) && (
                  <div className="animate opacity-0 text lg:text-epm-base lg:mt-6">
                    <BlockContent
                      blocks={group.content}
                      className="external-text"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="leaders lg:w-6/12 2xl:w-7/12 lg:flex-shrink-0 lg:h-full">
              <div className="leaders-group relative lg:h-screen overflow-y-hidden lg:overflow-y-auto">
                {group.leaders.map((leader) => {
                  return (
                    <>
                      <div
                        className="leader animate opacity-0 relative cursor-pointer lg:w-full bg-white transition-colors duration-150 hover:bg-epm-gray-100 border-t border-epm-gray-300 last:border-b"
                        key={leader.name}
                        onClick={(event) => toggleLeader(event)}
                        aria-expanded="false"
                      >
                        <div className="flex flex-row">
                          <div className="leader_image relative h-full overflow-y-hidden lg:overflow-y-none leading-0 lg:w-32 xl:w-36 2xl:w-40 lg:h-1/6-screen">
                            {isMobile && (
                              <div className="">
                                <Image
                                  src={leader.images.mobile.src}
                                  alt={leader.name}
                                  width={104}
                                  height={104}
                                  objectFit="cover"
                                  quality={100}
                                />
                              </div>
                            )}
                            {isTablet && (
                              <Image
                                src={leader.images.desktop.src}
                                alt={leader.name}
                                width={134}
                                height={134}
                                objectFit="cover"
                                quality={100}
                              />
                            )}
                            {isDesktop && (
                              <Image
                                src={leader.images.desktop.src}
                                alt={leader.name}
                                width={157}
                                height={157}
                                objectFit="cover"
                                quality={100}
                              />
                            )}
                          </div>
                          <div className="leader_content flex flex-col flex-grow ps-4 lg:ps-8 xl:ps-24 2xl:ps-36">
                            <div className="flex flex-col justify-center h-full lg:h-1/6-screen">
                              <div className="leader__name text-base lg:text-xl xl:text-2xl leading-tight font-bold mb-1">
                                {leader.name}
                              </div>
                              <div className="leader__role text-xs lg:epm-base font-light w-44 sm:w-auto">
                                {leader.role}
                              </div>
                              {/*<div className="leader__group text-xxs 2xl:text-base font-light uppercase pt-3">
                                {group.group}
                              </div>*/}
                            </div>
                            {isDesktop && (
                              <div className="leader__text font-light font-epm-base 2xl:text-lg mt-8 lg:mb-8 lg:w-64 xl:w-78 2xl:w-101 hidden">
                                <BlockContent
                                  blocks={leader.text}
                                  className="external-text"
                                />
                              </div>
                            )}
                          </div>
                          <div className="icon mx-4 lg:mx-8 flex flex-col justify-start pt-10 lg:pt-14 xl:pt-16">
                            <div className="arrow">
                              {isMobile && (
                                <Image
                                  src="/img/icons/arrow_down_dark.svg"
                                  alt={leader.name}
                                  width={20}
                                  height={12}
                                  layout="intrinsic"
                                  quality={100}
                                />
                              )}
                              {(isTablet || isDesktop) && (
                                <Image
                                  src="/img/icons/arrow_down_dark.svg"
                                  alt={leader.name}
                                  width={40}
                                  height={24}
                                  objectFit="cover"
                                  quality={100}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        {(isMobile || isTablet) && (
                          <div className="leader__text px-8 pt-4 pb-8 hidden">
                            <BlockContent
                              blocks={leader.text}
                              className="external-text"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default Leadership;
