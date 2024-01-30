import prisma from "@/utils/db";
import fs from "fs";

export const removeFile = async (id: string) => {
  try {
    const file = await prisma.galery.findFirst({ where: { id } });
    if (file) {
      await prisma.galery.delete({ where: { id: file.id } });
      await fs.unlinkSync("./public/cdn/" + file.filename);
    }
  } catch (error) {}
};

export const addFile = async (title: string, filename: string, data: any) => {
  await fs.writeFileSync("./public/cdn/" + filename, data);
  await prisma.galery.create({
    data: {
      title,
      filename,
      url: `/cdn/${filename}`,
      shown: false,
    },
  });
};
