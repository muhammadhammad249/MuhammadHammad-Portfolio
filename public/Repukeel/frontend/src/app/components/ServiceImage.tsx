/* eslint-disable */
"use client";

import { useState } from "react";

export default function ServiceImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
        Image coming soon
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-cover rounded-xl"
      onError={() => setHidden(true)}
    />
  );
}
