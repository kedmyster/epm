import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { gsap } from "gsap";

// import { GSDevTools } from "gsap/dist/GSDevTools";
// gsap.registerPlugin(GSDevTools);

const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const VISIBILITY_VISIBLE = "visible";
const VISIBILITY_HIDDEN = "hidden";

function SideMenu() {
  const router = useRouter();

  const animateSideMenuHover = (sideMenu, section, menuItem, pill, label) => {
    if (!section.id) {
      return;
    }

    const theme = section.dataset.sideMenuColor;

    const tlSideMenuHover = gsap.timeline();

    tlSideMenuHover.add("side-menu-hover");

    menuItem.animationHover = tlSideMenuHover;

    menuItem.addEventListener("mouseenter", function (event) {
      const active = document.querySelector(".side-menu li.active");
      const current = this.closest("li");
      const anchor = active.querySelector("a");
      const section = document.querySelector(anchor.getAttribute("href"));
      const theme = section.dataset.sideMenuColor;
      const tlSideMenuHover = gsap.timeline();
      const pill = current.querySelector(".slide__pill");
      const label = current.querySelector(".slide__label");

      if (active !== current) {
        tlSideMenuHover.to(
          pill,
          {
            width: "1.9375rem",
            backgroundColor: "#FFD534",
            duration: 0.1,
            // onComplete: () => console.log("Hey")
          },
          "side-menu-hover"
        );
      }

      if (theme === THEME_LIGHT) {
        tlSideMenuHover.to(
          label,
          {
            opacity: 1,
            color: "#FFFFFF",
            duration: 0.1,
            // onComplete: () => console.log("mouseenter-tlSideMenuHover-label")
          },
          "side-menu-hover"
        );
      } else if (theme === THEME_DARK) {
        tlSideMenuHover.to(
          label,
          {
            opacity: 1,
            color: "#636466",
            duration: 0.1,
            // onComplete: () => console.log("mouseenter-tlSideMenuHover-label")
          },
          "side-menu-hover"
        );
      }
    });

    menuItem.addEventListener("mouseleave", function (event) {
      const active = document.querySelector(".side-menu li.active");
      const current = this.closest("li");
      const anchor = active.querySelector("a");
      const section = document.querySelector(anchor.getAttribute("href"));
      const theme = section.dataset.sideMenuColor;
      const tlSideMenuHover = gsap.timeline();
      const pill = current.querySelector(".slide__pill");
      const label = current.querySelector(".slide__label");

      if (active !== current) {
        if (theme === THEME_LIGHT) {
          tlSideMenuHover.to(
            pill,
            {
              width: "0.5625rem",
              backgroundColor: "#FFFFFF",
              duration: 0.1,
              // onComplete: () => console.log("mouseleave-tlSideMenuHover-pill")
            },
            "side-menu-hover"
          );
        } else if (theme === THEME_DARK) {
          tlSideMenuHover.to(
            pill,
            {
              width: "0.5625rem",
              backgroundColor: "#636466",
              duration: 0.1,
              // onComplete: () => console.log("mouseleave-tlSideMenuHover-pill")
            },
            "side-menu-hover"
          );
        }
      }

      tlSideMenuHover.to(
        label,
        {
          opacity: 0,
          duration: 0.1,
          // onComplete: () => console.log("mouseleave-tlSideMenuHover-label")
        },
        "side-menu-hover"
      );
    });
  };

  const animateSideMenuActiveState = (
    sideMenu,
    section,
    menuItem,
    pill,
    label
  ) => {
    if (!section.id) {
      return;
    }

    const theme = section.dataset.sideMenuColor;
    const logoTheme = section.dataset.logoColor;
    const menuItems = sideMenu.querySelectorAll(".menu-item");
    const logoIcon = document.querySelector(".logo svg .logo-icon");
    const logoText = document.querySelectorAll(".logo svg .logo-text");

    const tlSideMenuPills = gsap.timeline({
      paused: true,
      onStart: () => menuItem.closest("li").classList.add("active"),
      onReverseComplete: () =>
        menuItem.closest("li").classList.remove("active"),
      scrollTrigger: {
        trigger: `#${section.id}`,
        start: "top-=50%",
        end: "bottom-=50%",
        toggleActions: "play reverse play reverse",
      },
    });

    const tlSideMenuLabels = gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.to(label, {
          opacity: 0,
          delay: 1.5,
          duration: 0.1,
          // onComplete: () => console.log("animateSideMenuActiveState-tlSideMenuLabels-label")
        });
      },
      scrollTrigger: {
        trigger: `#${section.id}`,
        start: "top-=50%",
        end: "bottom-=50%",
        toggleActions: "play reverse play reverse",
      },
    });

    const tlLogo = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: `#${section.id}`,
        start: "top-=50%",
        end: "bottom-=50%",
        toggleActions: "play reverse play reverse",
      },
    });

    tlLogo.add(`logo-${section.id}`);

    if (theme === THEME_LIGHT) {
      tlSideMenuLabels.to(
        label,
        {
          opacity: 1,
          color: "#FFFFFF",
          duration: 0.1,
          // onComplete: () => console.log("animateSideMenuActiveState-tlSideMenuLabels-label")
        },
        `side-menu-${section.id}`
      );
    } else if (theme === THEME_DARK) {
      tlSideMenuLabels.to(
        label,
        {
          opacity: 1,
          color: "#636466",
          duration: 0.1,
          // onComplete: () => console.log("animateSideMenuActiveState-tlSideMenuLabels-label")
        },
        `side-menu-${section.id}`
      );
    }

    if (logoTheme === THEME_LIGHT) {
      tlLogo.to(
        logoIcon,
        {
          fill: "#ffd534",
          opacity: 1,
          duration: 0.1,
          // onComplete: () => console.log("Hey")
        },
        `logo-${section.id}`
      );

      logoText.forEach((item) => {
        tlLogo.to(
          item,
          {
            fill: "#a9acb0",
            opacity: 1,
            duration: 0.1,
            // onComplete: () => console.log("Hey")
          },
          `logo-${section.id}`
        );
      });
    } else if (logoTheme === THEME_DARK) {
      tlLogo.to(
        logoIcon,
        {
          fill: "#636466",
          opacity: 0.5,
          duration: 0.1,
          // onComplete: () => console.log("Hey")
        },
        `logo-${section.id}`
      );

      logoText.forEach((item) => {
        tlLogo.to(
          item,
          {
            fill: "#636466",
            opacity: 1,
            duration: 0.1,
            // onComplete: () => console.log("Hey")
          },
          `logo-${section.id}`
        );
      });
    }

    tlSideMenuPills.add(`side-menu-${section.id}`);

    menuItems.forEach((item) => {
      const itemPill = item.querySelector(".slide__pill");
      const itemLabel = item.querySelector(".slide__label");

      if (menuItem === item.querySelector("a")) {
        tlSideMenuPills.to(
          itemPill,
          {
            backgroundColor: "#FFD534",
            width: "1.9375rem",
            duration: 0.1,
            // onComplete: () => console.log("animateSideMenuActiveState-tlSideMenuLabels-pill")
          },
          `side-menu-${section.id}`
        );
      } else {
        if (theme === THEME_LIGHT) {
          tlSideMenuPills.to(
            itemPill,
            {
              backgroundColor: "#FFFFFF",
              duration: 0.1,
              // onComplete: () => console.log("animateSideMenuActiveState-tlSideMenuLabels-pill")
            },
            `side-menu-${section.id}`
          );
        } else if (theme === THEME_DARK) {
          tlSideMenuPills.to(
            itemPill,
            {
              backgroundColor: "#636466",
              duration: 0.1,
              // onComplete: () => console.log("animateSideMenuActiveState-tlSideMenuLabels-pill")
            },
            `side-menu-${section.id}`
          );
        }
      }
    });
  };

  const animateSideMenuVisibility = (
    sideMenu,
    section,
    menuItem,
    pill,
    label
  ) => {
    if (!section.id) {
      return;
    }

    if (section.dataset.sideMenuVisibility == "hidden") {
      const tlSideMenuVisibility = gsap.timeline({
        scrollTrigger: {
          trigger: `#${section.id}`,
          start: "top-=50%",
          end: "bottom-=50%",
          toggleActions: "play reverse play reverse",
        },
      });

      tlSideMenuVisibility.to(sideMenu, {
        opacity: 0,
        duration: 0.1,
        // onComplete: () => console.log("Hey")
      });
    }
  };

  const utils = {
    animateSideMenuHover,
    animateSideMenuActiveState,
    animateSideMenuVisibility,
  };

  useEffect(() => {
    setTimeout(() => {
      const sideMenu = document.querySelector(".side-menu");
      const sections = Array.from(document.querySelectorAll(".section"));
      const menuItems = Array.from(sideMenu.querySelectorAll(".menu-item"));

      sections.forEach((section) => {
        if (sideMenu) {
          const menuItem = document.querySelector(
            `.side-menu li a[href='#${section.id}']`
          );
          const pill = menuItem.querySelector(".slide__pill");
          const label = menuItem.querySelector(".slide__label");

          utils.animateSideMenuHover(sideMenu, section, menuItem, pill, label);
          utils.animateSideMenuActiveState(
            sideMenu,
            section,
            menuItem,
            pill,
            label
          );
          utils.animateSideMenuVisibility(
            sideMenu,
            section,
            menuItem,
            pill,
            label
          );
        }

        // GSDevTools.create();
      });
    }, 1500);
  }, [router.pathname]);

  const sections = Array.from(document.querySelectorAll(".section"));

  if (sections.length === 0) {
    return null;
  } else {
    return (
      <>
        <div
          id="side-menu"
          className="side-menu fixed start-8 top-1/2 transform -translate-y-1/2 z-10"
        >
          <nav role="navigation">
            <ul>
              {sections.map((section, index) => {
                const label = section.getAttribute("data-side-menu-label");

                if (label) {
                  return (
                    <li
                      key={section.id}
                      className="menu-item my-8 font-title text-xxs tracking-wide"
                    >
                      <div className="slide cursor-pointer relative">
                        <a
                          href={`#${section.id}`}
                          className="block uppercase cursor-pointer relative"
                        >
                          <div className="slide__pill" />
                          <div className="slide__label">{label}</div>
                        </a>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li className="menu-item hidden" key={section.id}>
                      <div className="slide">
                        <a href={`#${section.id}`}></a>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default SideMenu;
