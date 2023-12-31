import React, { Suspense, useEffect, useState } from "react";
import Layer from "../../../components/Layer";
import axios_client from "../../../config/axios_client";
import axios from "axios";
import Image from "next/image";
import { FaStar, FaBookOpen, FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import dayjs from "../../../lib/dayjsUtils";
import config from "../../../config/config";
import { CSSProperties } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import FB_comment from "../../../components/FB_comment";
export default function Page({ ...props }: any) {
  const [info, setInfo] = useState({
    favorite: false,
  });

  const router = useRouter();
  // const FB_comment = React.lazy(() => import("../../../components/FB_comment"));

  //! set favorite
  useEffect(() => {
    const pagesSlug = props.res_page.pages_slug;
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
  }, [props.res_page.pages_slug]);

  //! onclick event favorite
  const handlefavoriteclick = async () => {
    const favoriteStatus = localStorage.getItem("favorite");
    let favoriteData = [];

    if (favoriteStatus) {
      favoriteData = JSON.parse(favoriteStatus);
      const pagesSlug = props.res_page.pages_slug;
      if (favoriteData.includes(pagesSlug)) {
        // ถ้ามีค่าอยู่แล้วให้ลบออก
        favoriteData = favoriteData.filter((slug: any) => slug !== pagesSlug);
      } else {
        // ถ้าไม่มีค่าอยู่ให้เพิ่มเข้าไป
        favoriteData.push(props.res_page);
      }
    } else {
      // ถ้าไม่มีค่าเลยให้เพิ่มค่าเดียวเข้าไป
      favoriteData.push(props.res_page);
    }

    localStorage.setItem("favorite", JSON.stringify(favoriteData));
    await add_point_follow();
    setInfo({
      ...info,
      favorite: !info.favorite,
    });
  };

  const add_point_follow = async () => {
    try {
      let add_point = await axios.post(
        `${config.API_FRONT}fav/${
          props.res_page.pages_slug
        }`
      );
    } catch (error) {
      console.log(`add_point_follow` + error);
    }
  };

  //!
  return (
    <>
      <NextSeo
        title={`${props.res_page.pages_title}`}
        description={` ${props.res_page.pages_description}`}
        canonical={`${config.SITE_URL}series/${props.res_page.pages_slug}`}
      />

      <Layer>
        <div className="page relative">
          <div
            className="pages_thumb relative z-0  overflow-hidden page_thumbnail"
            id="page_thumbnail"
          >
            <div
              style={
                {
                  "--image-url": `url(${config.CDN_URL}${props.res_page.pages_thumbnail})`,
                } as CSSProperties
              }
              className="pages_thumb_img bg-cover bg-center h-[300px]  bg-no-repeat  bg-[image:var(--image-url)]"
            ></div>
          </div>

          <div className="pages_detail relative w-full bottom-[100px] container h-100 mx-auto flex  md:col z-10 flex-col-reverse md:flex-row-reverse px-5 md:px-0 md:max-w-[1080px]">
            <div className="pages_deltail_ep w-full md:w-9/12">
              <div className="title w-full mt-10 md:my-0 relative">
                <h1 className="text-2xl md:text-5xl text-dark_gray text-color_dark dark:text-color_white ">
                  {props.res_page.pages_title}
                </h1>
              </div>

              <div className="pages_content md:mx-10 md:mt-[80px]">
                <div className="story my-10 text-left dark:text-color_gray text-color_dark_gray">
                  <h2 className="text-2xl ">
                    เรื่องย่อ {props.res_page.pages_en} แปลไทย{" "}
                  </h2>
                  <p className="text-md">
                    อ่านมังงะ {props.res_page.pages_en} {""}
                    {props.res_page.pages_th} {props.res_page.pages_simple}
                  </p>
                </div>
                <div className="tags my-5">
                  {props.res_tags.map((tags: any, i: number) => {
                    return (
                      <Link
                        key={i}
                        href={`/tags/${tags.tags_slug}`}
                        className="text-center p-2 justify-center  dark:bg-header_bg_menu  font-bold bg-color_white inline-flex  m-1 rounded-md dark:text-color_white text-color_dark_gray hover:bg-site_color dark:hover:bg-site_color hover:text-color_white ease-out duration-300"
                      >
                        {tags.tags_name.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
                <div className="back_homepage w-auto text-site_color md:gap-2 my-3 grid grid-cols-1">
                  <span className="">
                    <Link href="/">หน้าแรก</Link>
                    &nbsp;|&nbsp;
                    <Link href={`/series/${props.res_page.pages_slug}`}>
                      อ่าน {props.res_page.pages_th} แปลไทย
                    </Link>
                  </span>
                </div>
                <div className="ep my-3">
                  <div className="ep_img relative w-full h-[130px] md:w-[400px] md:h-[150px]">
                    <Image
                      src="/img/logo.png"
                      className=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={`${config.SITE_NAME} อ่านการ์ตูน อ่านมังงะ อ่านการ์ตูนออนไลน์ อ่านมังงะออนไลน์`}
                      title={`${config.SITE_NAME} อ่านการ์ตูน อ่านมังงะ อ่านการ์ตูนออนไลน์ อ่านมังงะออนไลน์`}
                    />
                  </div>
                  <div className="ep_title text-3xl font-bold my-3">
                    <p className="dark:text-color_white">
                      <span className="text-site_color px-2">ลำดับตอน</span>
                      ล่าสุด
                    </p>
                  </div>
                  <div className="ep_list">
                    <ul
                      className="overflow-y-scroll list-none max-h-[500px] scroll-smooth "
                      id="ep_list"
                    >
                      {props.res_ep.map((item: any, index: number) => {
                        return (
                          <li
                            key={index}
                            className="dark:bg-header_bg_dark dark:text-color_gray  bg-color_white m-2 p-2 rounded-md dark:hover:bg-site_color dark:hover:text-color_white hover:bg-site_color hover:text-color_white shadow-md"
                          >
                            <Link
                              href={`/${item.posts_slug}`}
                              title={`อ่าน ${props.res_page.pages_th} ตอนที่ ${item.posts_ep} แปลไทย`}
                            >
                              <div className={`ep_container  flex gap-5 `}>
                                <div className="ep_icon text-2xl font-bold flex justify-center items-center dark:bg-pages_bg_bookopen bg-[#e6e6e6]  p-4 rounded-md">
                                  <FaBookOpen className="text-md" />
                                </div>
                                <div className="ep_text">
                                  <div className="text-xl ">
                                    <p className="">
                                      {props.res_page.pages_en} แปลไทย
                                      {` ตอนที่ ${item.posts_ep}`}
                                    </p>
                                  </div>
                                  <div className="ep_date">
                                    <p className="text-sm">
                                      {dayjs(item.posts_create).format("LL")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="comment text-3xl font-bold py-5">
                    <div className="title">
                      <p className="dark:text-color_white">
                        <span className="text-site_color px-2">คอมเม้น</span>
                      </p>
                    </div>
                    <div className="comment relative min-h-[100px]">
                      <FB_comment
                        key={router.asPath}
                        current_asPath={router.asPath}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pages_deltail_info w-full md:w-3/12 flex justify-center items-center md:justify-start flex-col">
              <div className="thumb mx-auto w-[250px] h-[350px] relative">
                <Image
                  src={`${config.CDN_URL}${props.res_page.pages_thumbnail}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain rounded-[15px] shadow-md"
                  alt={props.res_page.pages_title}
                  title={props.res_page.pages_title}
                />
              </div>
              <div className="status w-full flex my-2 h-[50px]">
                <div className="type w-full  bg-pages_status_type flex items-center justify-center rounded-l-full text-center text-color_white text-2xl p-3 shadow-md">
                  {props.res_page.pages_type}
                </div>
                <div className="status_showing bg-pages_status_showing flex items-center justify-center w-full rounded-r-full text-center text-color_white text-2xl shadow-md">
                  {props.res_page.pages_status_showing}
                </div>
              </div>
              <div className="star w-full h-[50px] dark:bg-pages_bg_star bg-color_white flex justify-center items-center rounded-full my-2 shadow-md">
                <div className="icon relative">
                  <FaStar className="text-pages_star text-[20px] absolute right-6 top-[3px]" />
                  <span className="text-[20px] leading-2 dark:text-color_white text-color_dark_gray font-bold">
                    {props.res_page.pages_star}
                  </span>
                </div>
              </div>
              <div className="bookmark w-full h-[50px] bg-site_color flex justify-center items-center rounded-full my-2 shadow-md cursor-pointer">
                {info.favorite ? (
                  <>
                    <div
                      className="icon w-full flex justify-center items-center gap-3"
                      // onClick={handleunfavoriteclick}
                    >
                      <FaHeart className="favorite  text-color_white" />

                      <p className="text-color_white text-left">Follow</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="icon w-full flex justify-center items-center gap-3"
                      onClick={handlefavoriteclick}
                    >
                      <FaRegHeart className="not_favorite  text-color_white" />

                      <p className="text-color_white text-left">Follow</p>
                    </div>
                  </>
                )}
                {/* <FaBookOpen className="absolute top-1 right-20 text-color_white " />
                <p className="text-color_white">อ่านย้อนหลัง</p> */}
              </div>

              <div className="follow text-center my-2">
                <p className="dark:text-color_gray text-color_dark_gray">
                  มีผู้ติดตามจำนวน {props.res_page.pages_follow}
                </p>
              </div>
              <div className="sub w-full rounded-md dark:bg-header_bg_dark bg-color_white p-5 shadow-md">
                <ul>
                  <li>
                    <p className="font-bold text-color_dark_gray dark:text-color_gray text-2xl">
                      English
                    </p>
                    <span className="text-color_dark_gray dark:text-color_gray">
                      {" "}
                      {props.res_page.pages_en}
                    </span>
                  </li>
                  <li>
                    <p className="font-bold text-color_dark_gray dark:text-color_gray text-2xl">
                      Thai
                    </p>
                    <span className="text-color_dark_gray dark:text-color_gray">
                      {" "}
                      {props.res_page.pages_th}
                    </span>
                  </li>
                  <li>
                    <p className="font-bold text-color_dark_gray dark:text-color_gray text-2xl">
                      Total Charpter
                    </p>
                    <span className="text-color_dark_gray dark:text-color_gray">
                      {" "}
                      {props.res_ep[0].posts_ep}
                    </span>
                  </li>
                  <li>
                    <p className="font-bold text-color_dark_gray dark:text-color_gray text-2xl">
                      View
                    </p>
                    <span className="text-color_dark_gray dark:text-color_gray">
                      {props.res_page.pages_view}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    let res = await axios_client.get(`public/pages/${context.query.slug}`);
    let res_ep = await res.data.posts;
    let res_page = await res.data.pages[0];
    let res_tags = await res.data.tags;
    return { props: { res_page, res_tags, res_ep } };
  } catch (error) {
    console.log(error);
  }
  return { props: {} };
}
