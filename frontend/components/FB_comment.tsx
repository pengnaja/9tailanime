import React, { useEffect, useState } from "react";
import config from "../config/config";

export default function FB_comment({ ...props }) {
  const [path, setPath] = useState(props.current_asPath);

  useEffect(() => {
    let newPath = props.current_asPath;
    if (newPath.startsWith("/")) {
      newPath = newPath.substring(1);
    }
    setPath(newPath);

    // Force re-parse of FB Comments Plugin
    // @ts-ignore
    if (window.FB) {
      // @ts-ignore
      window.FB.XFBML.parse();
    }
  }, [props.current_asPath]);

  return (
    <>
      <div className="comments bg-color_white flex justify-center items-center py-3">
        <div
          className="fb-comments"
          data-href={`${config.SITE_URL}${path}`}
          data-width="auto"
          data-numposts="3"
        />
      </div>
    </>
  );
}
