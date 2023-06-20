"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

const Memes = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.imgflip.com/get_memes").then((res) =>
        res.json().then((res.json = data))
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const memes = data.data.memes;
  console.log(memes);

  //   const mutation = useMutation({
  //     mutationFn: postMemes,
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: ["memes"] });
  //     },
  //   });

  return (
    <div>
      {memes.map((meme) => (
        <>
          <div style={{}}>
            <p key={meme.id}>{meme.name}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Memes;
