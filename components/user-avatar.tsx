import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProfileProps {
  src?: string;
  className?: string;
  name?: string;
}

const UserAvatar: React.FC<AvatarProfileProps> = ({ src, className, name }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
        <AvatarImage src={src} />
      </Avatar>
      <p>{name}</p>
    </div>
  );
};

export default UserAvatar;
