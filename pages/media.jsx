import Head from "next/head";
import MediaComponent from "../components/media/media"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Media() {
  const page = {
    media: {
      slides: [
        {
          url: "#",
          images: {
            src: "/img/icons/media/forbes.svg",
            width: "213",
            height: "55",
          },
          name: "Forbes",
          quote:
            "More Potent Than CBD, THC: Dr. Raphael Mechoulam Explains His Latest Discovery",
          date: "July 12, 2020",
        },
        {
          url: "#",
          images: {
            src: "/img/icons/media/nbc.svg",
            width: "255",
            height: "57",
          },
          name: "NBC News",
          quote:
            "Cannabis research pioneer hopes latest discovery is not overlooked — again",
          date: "Sep 26, 2019",
        },
        {
          url: "#",
          images: {
            src: "/img/icons/media/discover.svg",
            width: "224",
            height: "64",
          },
          name: "Discover",
          quote:
            "The 'Father of Cannabis Research' on the Untapped Potential of Marijuana as Medicine",
          date: "November 21, 2019",
        },
        {
          url: "#",
          images: {
            src: "/img/icons/media/endpoints.svg",
            width: "247",
            height: "23",
          },
          name: "EndpoiontsNews",
          quote: "Startup EPM launches, high off cannabinoid acid innovation",
          date: "Jul 12, 2020",
        },
      ]
    }
  }
  return (
    <>
      <Head>
        <title>Media - EPM</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <MediaComponent data={page.media}/>
    </>
  );
}
