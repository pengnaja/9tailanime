import React from "react";
import Head from "next/head";
import Script from "next/script";
export default function FB_page() {
  return (
    <>
      <div className="fb_page flex items-center justify-center my-3">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F9tailmanga&tabs&width=500&height=130&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId=691037392854889"
          width="500"
          height="130"
          scrolling="no"
          frameBorder={0}
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="mx-auto"
        ></iframe>
      </div>
    </>
  );
}
