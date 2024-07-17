"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { UploadButton } from "@/lib/uploadthing";
import deleteFiles from "@/actions/deleteFiles";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, value }) => {
  if (value) {
    return (
      <div className="relative w-40 h-40">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-md object-cover"
        />
        <button
          onClick={async () => {
            onChange("");
            await deleteFiles(value);
          }}
          className="absolute top-2 right-2 p-1 text-white rounded-full shadow-sm bg-rose-500"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadButton
      endpoint="productImage"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
      appearance={{
        button: `${buttonVariants({
          variant: "default",
          size: "sm",
        })}`,
        container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
        allowedContent: "hidden",
      }}
    />
  );
};

export default FileUpload;
