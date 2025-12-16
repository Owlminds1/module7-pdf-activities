"use client";
import Image from "next/image";
import  { useState } from "react";
type MyImageProps = {
  path: string;
};
const MyImage = ({ path }: MyImageProps) => {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImageUrl] = useState(path);
  return (
    <Image
      src={imgUrl}
      width={400}
      height={100}
      onError={() => setImageUrl("/placeholder_image.jpg")}
      className={`${
        loading ? "blur-0" : "blur-sm"
      } transition-all duration-500 ease-in-out w-[400px] h-[400px] object-contain`}
      onLoad={() => setLoading(true)}
      alt="Image Not Found"
    />
  );
};

export default MyImage;
