"use client";

import { Input } from "@/components/ui/input";
import { uploadImage } from "@/services/fileUploadService";
import { ImageIcon } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  preview: string;
  setPreview: (preview: string) => void;
}

export function ImageUpload({ preview, setPreview }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      await uploadImage(file);
    } else {
      setPreview("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center w-full">
        {preview ? (
          <div
            className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden"
            style={{ maxHeight: "128px" }}
          >
            <img
              src={preview}
              style={{ maxHeight: "128px" }}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>
              </p>
            </div>
          </label>
        )}
        <Input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  );
}
