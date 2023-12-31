import React, { Suspense } from "react";
import Layer from "../../components/Layer";
import Image from "next/image";
import axios_client from "../../config/axios_client";
import axios from "axios";
import config from "../../config/config";
import ProgressBar from "react-progressbar-on-scroll";
const popup = require("../../lib/popup");
import dayjs from "../../lib/dayjsUtils";
import { useRouter } from "next/router";
import {
  FaListUl,
  FaTimes,
  FaCaretDown,
  FaAngleLeft,
  FaRegHeart,
  FaHeart,
  FaAngleRight,
  FaAngleUp,
  FaHome,
} from "react-icons/fa";
import { useState, useEffect } from "react";
("next/router");
import Link from "next/link";
import { NextSeo } from "next-seo";

import FB_comment from "../../components/FB_comment";
export default function Post({ ...props }) {
  const [nav_ep, setNav_ep] = useState(false);
  const [nav_control, setNav_control] = useState(true);
  const [info, setInfo] = useState({
    favorite: false,
  });
  const [currentPostIndex, setCurrentPostIndex] = useState(props.current_post);
  const [maxPosts, setMaxPosts] = useState(props.list_ep.length);
  const [minPosts, setMinPosts] = useState(() => props.list_ep[0].posts_ep);

  const router = useRouter();

  useEffect(() => {
    const checkfavoritestatus = () => {
      // ตรวจสอบสถานะ favorite และทำสิ่งที่ต้องการ
      const favoriteStatus = localStorage.getItem("favorite");
      if (favoriteStatus) {
        const favoriteData = JSON.parse(favoriteStatus);
        const pagesSlug = props.post.pages_slug;
        const foundfavorite = favoriteData.find(
          (favorite: any) => favorite.pages_slug === pagesSlug
        );
        if (foundfavorite) {
          setInfo((prevInfo) => ({
            ...prevInfo,
            favorites: true,
          }));
        }
      }
    };

    checkfavoritestatus();
  }, [props.post]);

  //! scroll
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    const max_scroll = document.body.scrollHeight - window.innerHeight;
    setScrollPosition(position);

    switch (true) {
      case position <= 300:
        setNav_control(true);
        break;
      case position > 300 && position < max_scroll - 1000:
        setNav_control(false);
        setNav_ep(false);
        break;
      case position > max_scroll - 1000:
        setNav_control(true);
        break;
      default:
        //
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //! scroll

  //!set favorite
  useEffect(() => {
    const pagesSlug = props.post.pages_slug;
    const favoriteStatus = localStorage.getItem("favorite");
    if (favoriteStatus) {
      const favoriteData = JSON.parse(favoriteStatus);
      const foundfavorite = favoriteData.find(
        (favorite: any) => favorite.pages_slug === pagesSlug
      );
      if (foundfavorite) {
        setInfo((prevInfo) => ({
          ...prevInfo,
          favorite: true,
        }));
      }
    }
  }, [props.post]);

  //! onclick event favorite
  const handlefavoriteclick = async () => {
    const favoriteStatus = localStorage.getItem("favorite");
    let favoriteData = [];

    if (favoriteStatus) {
      favoriteData = JSON.parse(favoriteStatus);
      const pagesSlug = props.post.pages_slug;
      if (favoriteData.includes(pagesSlug)) {
        // ถ้ามีค่าอยู่แล้วให้ลบออก
        favoriteData = favoriteData.filter((slug: any) => slug !== pagesSlug);
      } else {
        // ถ้าไม่มีค่าอยู่ให้เพิ่มเข้าไป
        favoriteData.push(props.post);
      }
    } else {
      // ถ้าไม่มีค่าเลยให้เพิ่มค่าเดียวเข้าไป
      favoriteData.push(props.post);
    }
    await add_point_follow();
    localStorage.setItem("favorite", JSON.stringify(favoriteData));

    setInfo({
      ...info,
      favorite: !info.favorite,
    });
  };

  const add_point_follow = async () => {
    try {
      let add_point = await axios.post(
        `${config.API_FRONT}fav/${props.res_page.pages_slug}`
      );
    } catch (error) {
      console.log(`add_point_follow` + error);
    }
  };

  //! update current post index
  useEffect(() => {
    setCurrentPostIndex(props.current_post);
  }, [props.current_post]);

  const NextButton = () => {
    const nextPostIndex = currentPostIndex + 1;
    const nextPost = props.list_ep[nextPostIndex];

    if (nextPost) {
      const nextPostSlug = nextPost.posts_slug;
      // setCurrentPostIndex(nextPostIndex);
      return (
        <Link href={`/${nextPostSlug}`}>
          <FaAngleRight className="text-color_white text-[20px]  delay-1000 ease-out cursor-pointer" />
        </Link>
      );
    } else {
      return (
        <div onClick={goToNextPost}>
          <FaAngleRight className="text-color_white text-[20px]  delay-1000 ease-out cursor-pointer" />
        </div>
      );
    }

    // กรณีที่ไม่มีโพสต์ถัดไป
  };

  const goToNextPost = () => {
    if (currentPostIndex < maxPosts - 1) {
    } else {
      // ถ้าเป็นโพสต์สุดท้ายในลิสต์
      const htmlContent = `
      <img src="/img/logo.png" alt="logo" width="100%" height="100%">
      <p className="text-2xl">โปรดติดตามตอนต่อไปที่ ${config.SITE_NAME}</p>
      <p>สามารถติดตาม ${props.post.pages_en} ได้ทุก ${props.post.pages_status_showing}</p>
    `;
      popup.message(htmlContent);
    }
  };

  const PrevButton = () => {
    if (currentPostIndex === 0) {
      // ถ้าเป็นโพสต์แรกในลิสต์
      return (
        <Link href={`/series/${props.post.pages_slug}`}>
          <FaAngleLeft className="text-color_white text-[20px]  delay-1000 ease-out cursor-pointer" />
        </Link>
      );
    } else {
      const prevPostIndex = currentPostIndex - 1;
      const prevPostSlug = props.list_ep[prevPostIndex];
      if (prevPostSlug) {
        const nextPostSlug = prevPostSlug.posts_slug;
        return (
          <Link href={`/${nextPostSlug}`}>
            <FaAngleLeft className="text-color_white text-[20px]  delay-1000 ease-out cursor-pointer" />
          </Link>
        );
      }
      return (
        <Link href={`/${prevPostSlug}`}>
          <FaAngleLeft className="text-color_white text-[20px]  delay-1000 ease-out cursor-pointer" />
        </Link>
      );
    }
  };

  const ep_list = () => {
    let charp_ep = props.list_ep.map((item: any, i: number) => (
      <li
        className="nav__item  dark:text-color_white border-dashed border-b-2 border-color_gray list-none"
        key={i}
      >
        <Link
          href={`${item.posts_slug}`}
          className="flex items-center justify-around gap-4 py-2"
        >
          <div className="ep">ตอนที่ {item.posts_ep}</div>
          <div className="date"> {dayjs(item.posts_create).format("LL")}</div>
        </Link>
      </li>
    ));
    return charp_ep.reverse();
  };

  return (
    <>
      <NextSeo
        title={`${props.post.pages_en} ตอนที่ ${props.post.posts_ep} - ${config.SITE_NAME}`}
        description={`อ่านมังงะ มังฮวา การ์ตูนเรื่อง ${props.post.pages_en} ${props.post.pages_th} ตอนที่ ${props.post.posts_ep} at ${config.SITE_NAME} – มังงะแปลไทย`}
        canonical={`${config.SITE_URL}${props.post.posts_slug}`}
      />

      <Layer>
        <div className="container mx-auto md:max-w-[700px]">
          <div className="content w-full flex justify-center flex-col text-center">
            <div className="title my-3">
              <h1 className="dark:text-color_white text-4xl md:text-5xl font-bold">
                {props.post.pages_en} ตอนที่ {props.post.posts_ep}
              </h1>
            </div>
            <div className="desc my-3">
              <h2 className="dark:text-color_gray px-3">
                อ่านมังงะ มังฮวา การ์ตูนเรื่อง {props.post.pages_en}{" "}
                {props.post.pages_th} ตอนที่ {props.post.posts_ep}
                at {config.SITE_NAME} – มังงะแปลไทย
              </h2>
            </div>

            <div
              className={`${
                nav_ep ? "fixed" : "hidden"
              }  nav__ep flex items-start justify-center z-[30] max-w-[350px] min-w-[350px] h-[400px] border-4 border-site_color bg-color_white dark:bg-[#000] left-1/2 -translate-x-1/2  bottom-20 rounded-2xl transition-all duration-300 ease-in-out delay-300 `}
            >
              <div className="nav__content flex flex-col w-full">
                <div className="nav__title py-2 border-b-4 border-site_color dark:text-color_white w-full relative">
                  <p>Charpter List</p>
                  <FaTimes
                    className="text-site_color text-[20px]  delay-1000 ease-out animate-pulse cursor-pointer absolute right-5 top-3"
                    onClick={() => setNav_ep(!nav_ep)}
                  />
                </div>
                <div
                  className="nav__list h-[330px] overflow-x-auto"
                  id="ep_list"
                >
                  <div className="">
                    <ul>{ep_list()}</ul>
                  </div>
                </div>
              </div>
            </div>

            {nav_control && (
              <div
                className={`fixed bottom-2 left-0  z-50 w-screen  p-3 transition-all duration-300 ease-in-out delay-300 flex justify-center items-center`}
              >
                <div className="w-[300px] h-[50px] bg-color_dark rounded-full flex items-center justify-around shadow-xl shadow-[#434343]">
                  <div className="prev">{PrevButton()}</div>
                  <div className="favorite">
                    {info.favorite ? (
                      <FaHeart
                        className="favorite text-site_color text-[20px] delay-1000 ease-out cursor-pointer"
                        // onClick={handleunfavoriteclick}
                      />
                    ) : (
                      <FaRegHeart
                        className="not_favorite text-site_color text-[20px] delay-1000 ease-out cursor-pointer"
                        onClick={handlefavoriteclick}
                      />
                    )}
                  </div>
                  <div className="home">
                    <Link href={`/`}>
                      <FaHome className="text-color_white text-[20px] delay-1000 ease-out cursor-pointer" />
                    </Link>
                  </div>

                  <div className="nav__list relative">
                    {nav_ep ? (
                      <FaTimes
                        className="text-site_color text-[20px]  delay-1000 ease-out animate-pulse cursor-pointer"
                        onClick={() => setNav_ep(!nav_ep)}
                      />
                    ) : (
                      <FaListUl
                        className="text-color_white text-[20px] delay-1000 ease-out cursor-pointer"
                        onClick={() => setNav_ep(!nav_ep)}
                      />
                    )}
                    <div
                      className={`nav__footer ${
                        nav_ep ? "flex" : "hidden"
                      } absolute top-[-25px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 md:hidden`}
                    >
                      <FaCaretDown className="text-color_white dark:text-[#000] text-[40px] delay-1000 ease-out" />
                    </div>
                  </div>
                  <div
                    className="top"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <FaAngleUp
                      className="text-color_white text-[20px]  delay-1000 ease-out cursor-pointer"
                      // create function onclick scroll to top
                    />
                  </div>
                  <div className="next">{NextButton()}</div>
                </div>
              </div>
            )}
                  <div className="reading relative md:min-h-[400px] w-auto min-h-[180px] flex justify-center items-center">
              <iframe
                width="100%"
                height="100%"
                src="https://partyanime.com/?v=zDo0bfSeV"
                frameBorder="0"
                scrolling="0"
                allowFullScreen
                className="md:min-h-[400px] w-full min-h-[180px] px-3"
              ></iframe>
            </div>
            <div className="scroll__progress__bar">
              <ProgressBar color="#6c2bd9" height={5} />
            </div>
          </div>

          <div className="comment text-3xl font-bold py-5">
            <div className="title">
              <p className="dark:text-color_white">
                <span className="text-site_color px-2">คอมเม้น</span>
              </p>
            </div>
            <div className="comment relative min-h-[100px]">
              <FB_comment key={router.asPath} current_asPath={router.asPath} />
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { data } = await axios_client.get(
      `public/posts/${context.query.post}`
    );

    const fetch_list_ep = await axios_client.get(
      `public/pages/${data[0].pages_slug}`
    );
    const list_ep = fetch_list_ep.data.posts;

    const current_reverse = fetch_list_ep.data.posts.reverse();
    const current_post = current_reverse.findIndex(
      (item: any) => item.posts_slug === context.query.post
    );

    return {
      props: {
        post: data[0],
        list_ep,
        current_post,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
