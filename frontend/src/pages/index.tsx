import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Layer from "../../components/Layer";
import Poster from "../../components/Poster";
import axios_client from "../../config/axios_client";
import config from "../../config/config";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import React from "react";
import Popular from "../../components/Popular";
import FB_page from "../../components/FB_page";
export default function Home({ ...props }) {
  const Poster = React.lazy(() => import("../../components/Poster"));
  // const Popular = React.lazy(() => import("../../components/Popular"));
  // const FB_page = React.lazy(() => import("../../components/FB_page"));

  const [currentPage, setCurrentPage] = useState(1); // หน้าปัจจุบัน
  const [itemsPerPage, setItemsPerPage] = useState(10); // จำนวนรายการต่อหน้า
  const [totalPages, setTotalPages] = useState(0); // จำนวนหน้าทั้งหมด
  const [displayedPages, setDisplayedPages] = useState([]); // รายการหน้าที่จะแสดงในหน้าปัจจุบัน
  const router = useRouter();

  //! is mobile ? show 10 : show 20
  useEffect(() => {
    const updateItemsPerPage = () => {
      const isMobile = window.innerWidth <= 768; // เช็คว่าเป็นโมบายหรือไม่ (ตัวอย่างใช้ขนาดหน้าจอ <= 768px)
      const perPage = isMobile ? 10 : 20; // กำหนดจำนวนรายการต่อหน้าใหม่ตามเงื่อนไข
      setItemsPerPage(perPage); // อัปเดตจำนวนรายการต่อหน้า
    };

    // เรียกฟังก์ชันอัปเดตเมื่อหน้าจอเปลี่ยนขนาด
    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage(); // เรียกฟังก์ชันเมื่อคอมโพเนนต์ถูกโหลด

    // คืนค่าฟังก์ชันเพื่อทำความสะอาดเมื่อคอมโพเนนต์ถูกยกเลิก
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    // คำนวณจำนวนหน้าทั้งหมด
    const total = Math.ceil(props.pages_lastep.length / itemsPerPage);

    setTotalPages(total);
  }, [props.pages_lastep, itemsPerPage]);

  useEffect(() => {
    // กำหนดรายการหน้าที่จะแสดงในหน้าปัจจุบัน
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagesToDisplay = props.pages_lastep.slice(startIndex, endIndex);
    setDisplayedPages(pagesToDisplay);
  }, [props.pages_lastep, currentPage, itemsPerPage]);

  // ฟังก์ชันเปลี่ยนหน้า
  const changePage = (pageNumber: number) => {
    // เพิ่มโค้ดด้านล่างเพื่อให้หน้าปัจจุบันแสดงตรงตามหน้าที่คลิกเลือก
    // ใช้ setTimeout เพื่อให้มีเวลาในการโหลดข้อมูล
    window.scrollTo(0, 400);
    let change_scroll = new Promise((resolve, reject) => {
      setTimeout(() => {
        setCurrentPage(pageNumber);
        resolve(
          setDisplayedPages(
            props.pages_lastep.slice(
              (pageNumber - 1) * itemsPerPage,
              pageNumber * itemsPerPage
            )
          )
        );
      }, 800);
    });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePageRange = 1; // จำนวนหมายเลขเพจที่แสดง

    // หาหมายเลขเพจที่แสดงก่อนหน้า
    let startPage = currentPage - visiblePageRange;
    if (startPage < 1) {
      startPage = 1;
    }

    // หาหมายเลขเพจที่แสดงถัดไป
    let endPage = currentPage + visiblePageRange;
    if (endPage > totalPages) {
      endPage = totalPages;
    }

    // เพิ่มหมายเลขเพจลงในอาร์เรย์
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`${
            i === currentPage ? "bg-site_color" : "bg-header_bg_menu"
          }  m-2 rounded-md  text-color_white hover:bg-site_color hover:text-color_white ease-out duration-300`}
        >
          <button
            className={`cursor-pointer  px-[10px] py-[5px]`}
            onClick={() => changePage(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    // กำหนดการแสดงเพิ่มเติมหากหมายเลขเพจไม่ได้อยู่ที่ตำแหน่งสุดท้ายของเพจทั้งหมด
    if (endPage < totalPages) {
      pageNumbers.push(
        <li key="next-dots" className="">
          <span className="dots text-color_white">...</span>
        </li>
      );
      pageNumbers.push(
        <li
          key={totalPages}
          className="bg-header_bg_menu  px-[10px] py-[5px] m-2 rounded-md  text-color_white hover:bg-site_color hover:text-color_white ease-out duration-300"
        >
          <button
            className="cursor-pointer"
            onClick={() => changePage(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <NextSeo canonical={`${config.SITE_URL}`} />
      <Layer>
        <section>
          <div className="notify w-full bg-site_color">
            <h1 className="text-center text-3xl text-color_white">
              เว็บอ่านมังงะ อ่านการ์ตูนแปลไทย อัปเดตตอนล่าสุดใหม่ก่อนใครที่นี่{" "}
              {config.SITE_NAME}
            </h1>
          </div>
        </section>
        <section className="container mx-auto md:max-w-[1080px] px-3">
          <section>
            <div className="poppular w-full my-5" id="poppular">
              <div className="poppular-title">
                <h2 className="text-3xl text-site_color">
                  Poppular{" "}
                  <span className="dark:text-color_white text-color_dark_gray">
                    สุดฮิต
                  </span>
                </h2>
              </div>
              <div className="poppular-content grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 relative min-h-[200px]">
                {/* <Suspense fallback={<Loading />}></Suspense> */}
                <Popular poppular={props.poppular} />
              </div>
            </div>
          </section>
          <section>
            <div className="like_fanpage w-full my-5" id="like_fanpage">
              <div className="like_fanpage-title">
                <h2 className="text-3xl text-site_color">
                  Like Fanpage {config.SITE_NAME}{" "}
                  <span className="dark:text-color_white text-color_dark_gray">
                    FANPAGE FCฝากติดตามให้ด้วยนะ
                  </span>
                </h2>
              </div>

              <div className="fb_page relative min-h-[100px]">
                <FB_page />
              </div>
            </div>
          </section>
          <section>
            <div className="update_new w-full" id="update">
              <div className="update_new-title">
                <h3 className="text-3xl text-site_color">
                  {config.SITE_NAME}{" "}
                  <span className="dark:text-color_white text-color_dark_gray">
                    อัพเดทล่าสุด
                  </span>
                </h3>
              </div>
              <div className="update_new-content grid grid-cols-2  md:grid-cols-3 gap-1  lg:grid-cols-5 relative min-h-[200px]">
                <Suspense fallback={<Loading />}>
                  {displayedPages.map((pages: any, i: number) => {
                    return (
                      <Poster
                        key={i}
                        i={i}
                        pages_slug={pages.pages_slug}
                        pages_last_update={pages.pages_last_update}
                        pages_last_ep={pages.pages_last_ep}
                        pages_en={pages.pages_en}
                        pages_type={pages.pages_type}
                        pages_title={pages.pages_title}
                        pages_thumbnail={pages.pages_thumbnail}
                        posts_slug={pages.posts_slug}
                      />
                    );
                  })}
                </Suspense>
              </div>
              <div className="pagination">
                <div className="w-full">
                  <div className="items-per-page">
                    <ul className="flex justify-center items-center gap-1 py-5">
                      {currentPage > 1 ? (
                        <li className="bg-header_bg_menu m-2 rounded-md  text-color_white hover:bg-site_color hover:text-color_white ease-out duration-300">
                          <button
                            className="cursor-pointer px-[10px] py-[5px]"
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                      ) : null}
                      {renderPageNumbers()}
                      {currentPage < totalPages ? (
                        <li className="bg-header_bg_menu   m-2 rounded-md  text-color_white hover:bg-site_color hover:text-color_white ease-out duration-300">
                          <button
                            className="cursor-pointer px-[10px] py-[5px]"
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </Layer>
    </>
  );
}

export async function getServerSideProps() {
  try {
    let res_lastep = await axios_client.get(`public/last_updated`);
    let fetch_poppular = await axios_client.get(`public/tags/popular`);
    let pages_lastep = await res_lastep.data;
    let poppular = await fetch_poppular.data;
    return {
      props: {
        pages_lastep,
        poppular,
        revalidate: 1800, // เคลือนย้ายคีย์ revalidate ไปอยู่ภายใต้คีย์ props
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
