import React, { useState, ChangeEvent, FormEvent } from "react";
import Layer from "../../../../../../components/Layer";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import Select from "react-select";
import { FaUpload, FaReply } from "react-icons/fa";
import config from "../../../../../../config/config";
import { useRouter } from "next/router";
import axios_client from "../../../../../../config/axios_client";
import { useEffect } from "react";
import Image from "next/image";
const popup = require("../../../../../../lib/popup");
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
interface Posts {
  posts_slug: string;
  pages_slug: string;
  posts_ep: number;
  posts_detail: string;
}

export default function edit_posts({ ...props }) {
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [edit_posts, setedit_posts] = useState<Posts>({
    posts_slug: "",
    pages_slug: "",
    posts_ep: 0,
    posts_detail: "",
  });
  const [filesArray, setFilesArray] = useState<any[]>([]);

  useEffect(() => {
    setedit_posts({
      ...edit_posts,
      pages_slug: router.query.posts_slug as string,
    });

    if (router.query.posts_slug) {
      const slug = router.query.posts_slug as string;
      get_edit_posts(slug);
    }
  }, [router.query.posts_slug]);

  const get_edit_posts = async (slug: string) => {
    try {
      if (slug != undefined) {
        const res = await axios_client.post(`/posts/${slug}`);
        setedit_posts(res.data);
        console.log(edit_posts);
      }
    } catch (error) {
      console.log(error);
    }
  };




  const handleSubmid = async () => {
    console.log(edit_posts);
    try {
      const res = await axios_client.post(`/posts/edit/post`, edit_posts);
      console.log(res.data);

      popup.success("เพิ่มข้อมูลสำเร็จแล้ว", "");
      router.back();
    } catch (err: any) {
      console.log(`pages/posts/edit:submit` + err);
      popup.warning("เพิ่มข้อมูลไม่สำเร็จ", "");
    }
  };

  return (
    <>
      <Layer>
        <div className="container px-6 mx-auto grid">
          <div className="px-6 my-3 flex justify-start">
            <Link href={`/${config.ADMIN_PATH}/pages/`}>Pages</Link>
            <Link
              href={`/${config.ADMIN_PATH}/pages/posts/${router.query.pages_slug}`}
            >
              /{router.query.pages_slug}
            </Link>

            <p className="text-gray-400">/edit</p>
          </div>
          <div className="px-6 my-3 flex justify-end">
            <button
              className="flex items-center justify-between p-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              onClick={() => {
                router.push(
                  `/${config.ADMIN_PATH}/pages/posts/${router.query.pages_slug}`
                );
              }}
            >
              <FaReply className="w-3 h-3 m-2" />
              Posts
            </button>
          </div>
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            edit Posts
          </h2>

          <div className="px-4 py-3 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="my-2">
              <span className="text-gray-700 dark:text-gray-400 mt-4 text-sm">
                posts_slug | Exapmle : one-pice-ตอนที่-1
              </span>

              <input
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setedit_posts({
                    ...edit_posts,
                    posts_slug: e.target.value.split(" ").join("-"),
                  });
                }}
                value={edit_posts.posts_slug || ""}
              />
            </div>
            <div className="my-2">
              <span className="text-gray-700 dark:text-gray-400 mt-4 text-sm">
                posts_ep | Exapmle : one-pice-ตอนที่-1
              </span>

              <input
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                required
                type="number"
                step="0.1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setedit_posts({
                    ...edit_posts,
                    posts_ep: parseFloat(e.target.value),
                  });
                }}
                value={edit_posts.posts_ep || 0}
              />
            </div>
          </div>

          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            edit Posts_detail
          </h2>
          <div className="px-4 py-3 bg-white rounded-lg shadow-md dark:bg-gray-800 my-3">
          <div className="my-2">
              <span className="text-gray-700 dark:text-gray-400 mt-4 text-sm">
                posts_slug | Exapmle : one-pice-ตอนที่-1
              </span>

              <input
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setedit_posts({
                    ...edit_posts,
                    posts_detail: e.target.value,
                  });
                }}
                value={edit_posts.posts_detail || ""}
              />
            </div>
            
            <div className="my-2">
              <button
                className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green my-3"
                type="button"
                onClick={handleSubmid}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}
