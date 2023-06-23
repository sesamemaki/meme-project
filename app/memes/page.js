"use client";
import Script from "next/script";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "app/modal.js";
import "flowbite";

const Memes = (defaultModal) => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [generated, setGenerated] = useState();

  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();
    formData.append("username", "BurcuYilmaz");
    formData.append("password", "2522529b");
    formData.append("template_id", currentMeme.id);
    captions.forEach((caption, index) =>
      formData.append(`boxes[${index}][text]`, caption)
    );
    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) =>
      res.json().then((res) => {
        console.log(res.data.url);
        setGenerated(res.data.url);
      })
    );
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((res) => {
        const _memes = res.data.memes;
        shuffleArray(_memes);
        setMemes(_memes);
      });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  return (
    <div className="h-screen w-full p-5 bg-gradient-to-r from-blue-200 to-transparent">
      {generated && <Modal generated={generated} />}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.js"></Script>
      <h1 className="text-center text-2xl font-semibold tracking-wide mb-2 ">
        Meme Generator
      </h1>
      <p className="text-center text-xl">
        The Fastest Meme Generator on the Planet. Easily add text to images or
        memes.
      </p>

      <div className="flex flex-grid justify-center py-5 gap-5 ">
        <button
          className="border border-gray-700 border-2 bg-gray-300 rounded-2xl p-2"
          onClick={generateMeme}
        >
          Generate
        </button>
        <button
          className="border border-gray-700 border-2 rounded-2xl p-2"
          onClick={() => setMemeIndex(memeIndex + 1)}
        >
          Skip
        </button>
      </div>

      <div id="left" className="grid grid-cols-2 gap-4  ">
        {memes.length ? (
          <div className="shadow-xl rounded ">
            <img
              src={memes[memeIndex].url}
              width={memes[memeIndex].width}
              height={memes[memeIndex].height}
              alt={memes.name}
            />
          </div>
        ) : (
          ""
        )}

        <div id="right" className="flex flex-col m-2">
          {captions.map((c, index) => (
            <input
              key={index}
              type="text"
              className=" bg-gradient-to-r from-gray-100 to-gray-300 p-2 m-2 rounded-3xl font-small"
              placeholder="Write your caption"
              onChange={(e) => updateCaption(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memes;
