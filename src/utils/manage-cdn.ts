import prisma from "@/utils/db";
import fs from "fs";
import path from "path";

const root = path.join(path.parse(__dirname).dir.split(".next")[0], "public", "cdn")

export const removeFile = async (id: string) => {
  try {
    const file = await prisma.galery.findFirst({ where: { id } });
    if (file) {
      await prisma.galery.delete({ where: { id: file.id } });
      await fs.unlinkSync(path.join(root, file.filename));
    }
  } catch (error) {}
};

export const addFile = async (title: string, filename: string, data: any) => {
  await fs.writeFileSync(path.join(root, filename), data);
  await prisma.galery.create({
    data: {
      title,
      filename,
      url: `/cdn/${filename}`,
      shown: false,
    },
  });
};
