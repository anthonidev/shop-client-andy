"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  defaultImage?: string | null;
}

export function ImageUpload({ onChange, defaultImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isDefaultImage, setIsDefaultImage] = useState(false);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
      setIsDefaultImage(true);
    }
  }, [defaultImage]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file || null);
  };

  const handleFile = (file: File | null) => {
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
          setIsDefaultImage(false);
        };
        reader.readAsDataURL(file);
        onChange(file);
      } else {
        alert("Por favor selecciona un archivo de imagen válido");
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file || null);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    setIsDefaultImage(false);
    onChange(null);
  };

  return (
    <div className="grid gap-2">
      <Label>Imagen del producto</Label>
      <div
        className={`
          relative flex flex-col items-center justify-center w-full min-h-[200px]
          border-2 border-dashed rounded-lg transition-colors
          ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25"
          }
          ${preview ? "p-2" : "p-8"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative w-full h-full min-h-[196px] rounded-md overflow-hidden">
            {/* Usamos diferentes propiedades de Image según si es URL o base64 */}
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
              // Si es una URL externa, necesitamos configurar next/image
              {...(isDefaultImage
                ? {
                    unoptimized: true,
                  }
                : {})}
            />
            <div
              className="absolute top-2 right-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <ImagePlus className="h-8 w-8 mb-4 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Haz clic para subir</span> o
              arrastra y suelta
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG o WEBP (máx. 4MB)
            </p>
          </div>
        )}
        <input
          type="file"
          className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${
            preview ? "hidden" : ""
          }`}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
