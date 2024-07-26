"use client";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImg";

export default function CropImg({
  imgFile,
  cropedDialog,
  handleCroppedImg,
}: {
  imgFile: any;
  cropedDialog: any;
  handleCroppedImg: any;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(imgFile, croppedAreaPixels);
      handleCroppedImg(croppedImage);
      cropedDialog(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      <div className="bg-grey absolute z-50 rounded-md w-[80%] left-1/2 transform -translate-x-1/2 py-[20px]">
        <div className="relative h-[250px] w-[95%] mx-auto">
          {imgFile === null ? (
            <div className="text-center text-black">masukan gambar</div>
          ) : (
            <Cropper
              image={imgFile}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          )}
        </div>
        <label htmlFor="zoom" className="block mx-auto text-center pt-[20px]">
          <p>zoom</p>
        </label>
        <input
          id="zoom"
          type="range"
          min={1}
          max={3}
          step={0.1}
          onChange={(e: any) => {
            setZoom(e.target.value);
          }}
          className="mx-auto block w-[50%] bg-red-600 accent-green"
        />
        <div className="flex justify-end px-[50px] pt-[20px]">
          <button
            className="btn bg-green text-white flex gap-[5px] items-center"
            onClick={handleDone}
          >
            done <img src="/svg/success.svg" className="w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
