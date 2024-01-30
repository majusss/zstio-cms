import { toastError } from "@/utils/toasting";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import AddFileComponent from "./AddFileComponent";
import FilePreview from "./FilePreview";
import FileUploader from "./FileUploader";

export default function FilesHandler() {
  const [selectedImages, setSelectedImages] = useState<
    { file: File; blob: string }[]
  >([]);

  const [hostedImgs, setHostedImgs] = useState<
    { id: string; title: string; filename: string; url: string }[]
  >([]);

  const updateHostedImgs = useCallback(async () => {
    try {
      const request = await axios.get("/api/uploads");
      setHostedImgs(request.data.files);
    } catch (error) {
      toastError("Nie udało się pobrać listy plików");
    }
  }, []);

  useEffect(() => {
    updateHostedImgs();
  }, [updateHostedImgs]);

  const onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [
        ...prevState,
        { file, blob: URL.createObjectURL(file) },
      ]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="text-white w-full h-full">
      <div className="w-full bg-[#121212] text-center sticky">
        <h1 className="text-xl p-2 font-semibold">ZARZĄDZANIE PLIKAMI</h1>
      </div>
      <input {...getInputProps()} className="" />
      <div className="px-4 py-2">
        <div className="grid grid-cols-imgs gap-4">
          {hostedImgs?.length > 0 &&
            hostedImgs.map((img) => (
              <FilePreview
                key={img.id}
                id={img.id}
                name={img.title}
                img={img.url}
                updateHostedImgs={() => {
                  setTimeout(() => {
                    updateHostedImgs();
                  }, 1000);
                }}
              />
            ))}
          {selectedImages?.length > 0 &&
            selectedImages.map((image) => (
              <FileUploader
                key={image.blob}
                blob={image.blob}
                image={image.file}
                setSelectedImages={setSelectedImages}
                updateHostedImgs={() => {
                  setTimeout(() => {
                    updateHostedImgs();
                  }, 1000);
                }}
              />
            ))}
          <div {...getRootProps()}>
            <AddFileComponent isDragActive={isDragActive} />
          </div>
        </div>
      </div>
    </div>
  );
}
