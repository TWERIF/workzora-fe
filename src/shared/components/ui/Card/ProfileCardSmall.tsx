import Image from "next/image";
import React from "react";
import placeHolderAvatar from "../../../../../public/images/avatar_placeholder.png";

interface Preview {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}
export default function PreviewCardSmall({ preview }: { preview: Preview }) {
  const avatar = preview.avatarUrl || placeHolderAvatar;

  return (
    <div key={preview.id} className="flex flex-col items-center gap-3 group">
      <div className="relative w-[100px] h-[100px] rounded-3xl  overflow-hidden border-2 border-transparent ">
        <Image width={150} height={150} src={avatar} alt="profile icon" />
      </div>
      <span className="font-semibold text-center text-sm md:text-base">
        {`${preview.firstName} ${preview.lastName}`}
      </span>
    </div>
  );
}
