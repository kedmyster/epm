import Image from "next/image";

function SocialMedia() {
  return (
    <>
      <div id="social-media" className="social-media fixed left-6 top-3/4 z-10">
          <div className="mb-3">
            <a
              href="https://www.linkedin.com/company/epmip/"
              target="_blank"
              rel="noopener"
              className="transition-opacity duration-150 hover:opacity-70"
            >
              <Image
                src="/img/icons/twitter-light-gray.svg"
                width="30"
                height="30"
                alt="Twitter"
              />
            </a>
          </div>
          <div className="mb-3">
            <a
              href="https://www.youtube.com/channel/UCr8mb7WyEcxGCEXIyYS0Cog"
              target="_blank"
              rel="noopener"
              className="transition-opacity duration-150 hover:opacity-70"
            >
              <Image
                src="/img/icons/instagram-light-gray.svg"
                width="30"
                height="30"
                alt="Instagram"
              />
            </a>
          </div>
      </div>
    </>
  );
}

export default SocialMedia;
