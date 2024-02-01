import prisma from "@/lib/db";
import imgur from "./imgur";

export const removeFile = async (id: string) => {
  const file = await prisma.galery.findFirst({ where: { id } });
  if (file) {
    await prisma.galery.delete({ where: { id: file.id } });
    await imgur.deleteImage(file.deleteHash);
  }
};

export const addFile = async (title: string, data: Buffer) => {
  const upload = await imgur.upload({ image: data, title });
  if (!upload.success) throw new Error("Error uploading image to imgur");
  await prisma.galery.create({
    data: {
      title,
      deleteHash: upload.data.deletehash || "",
      url: upload.data.link || "",
      shown: false,
    },
  });
};
