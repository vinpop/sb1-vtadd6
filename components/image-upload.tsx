"use client";

import { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ImageUploadProps {
  onImageChange: (imageUrl: string) => void;
}

export function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 177.78, // 16:9 aspect ratio
    x: 0,
    y: 0
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setShowCropDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (crop: PixelCrop) => {
    if (imageRef.current && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          imageRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            onImageChange(url);
            setShowCropDialog(false);
            setPreviewUrl("");
            setSelectedFile(null);
          }
        });
      }
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        Upload Image
      </Button>
      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <div className="relative max-h-[70vh] overflow-auto">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={9/16}
                locked
              >
                <img
                  ref={imageRef}
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full"
                />
              </ReactCrop>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowCropDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleCropComplete(crop as PixelCrop)}>
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}