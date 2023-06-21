"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Memes = () => {
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.imgflip.com/get_memes").then((res) =>
        res.json().then((res.json = data))
      ),
  });
  const memes = data.data.memes;

  React.useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  useEffect(() => {
    console.log(captions);
  }, [captions]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // console.log(memes);

  // console.log(memes);

  //   const mutation = useMutation({
  //     mutationFn: postMemes,
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: ["memes"] });
  //     },
  //   });

  const randomImageNumber = Math.floor(Math.random(memes) * memes.length);
  const randomImage = memes[randomImageNumber];
  // console.log(randomImage);

  return (
    <div className="h-screen">
      <div className=" ">
        <h1 className="text-center text-lg font-semibold tracking-wide mb-5">
          Meme Generator
        </h1>
        <div className="container w-10/12 mx-auto flex flex-grid items-center justify-center py-5 gap-5">
          <button
            className="border border-gray-700 border-2 bg-gray-300 rounded-2xl p-2"
            onClick={() => console.log("Generate")}
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
      </div>
      <div className="container w-10/12 mx-auto flex flex-grid items-center justify-center py-5 gap-5">
        <div className="relative rounded ">
          <img
            src={randomImage.url}
            width={1200}
            height={900}
            className="w-full aspect-square "
            alt={randomImage.name}
          />
        </div>
        <div>
          {
            captions.map((caption, index)=>(
              <input key={index} type="text" className=" bg-gradient-to-r from-gray-100 to-gray-300 p-2 rounded-3xl font-medium" placeholder="Write a caption"   />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Memes;
