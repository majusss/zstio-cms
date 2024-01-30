import prisma from "@/utils/db";
import fs from "fs";
import path from "path";
import imgur from './imgur';

const root = path.join(path.parse(__dirname).dir.split(".next")[0], "public", "cdn")

export const removeFile = async (id: string) => {
    const file = await prisma.galery.findFirst({ where: { id } });
    if (file) {
      await prisma.galery.delete({ where: { id: file.id } });
      await imgur.deleteImage(file.deleteHash);
    }
};

export const addFile = async (title: string, filename: string, data: any) => {
  const upload = await imgur.upload({image: data, title: title})
  if(!upload.success) throw new Error("Error uploading image to imgur")
  await prisma.galery.create({
    data: {
      title,
      deleteHash: upload.data.deletehash || "",
      url: upload.data.link || "",
      shown: false,
    },
  });
};
