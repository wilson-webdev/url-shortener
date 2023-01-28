import { PageProps } from "@/types/page-props";
import { GetServerSideProps } from "next";
import { prisma } from "@/server/utils/prisma";

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params = {},
}) => {
  const { slug } = params;

  // Can we use TRPC here?
  const url = await prisma?.url.findUnique({
    where: {
      shortUrl: slug as string,
    },
  });

  if (!url) {
    return {
      redirect: {
        destination: `/?invalidUrl=${slug}`,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: url.originalUrl,
      permanent: true,
    },
  };
};

export default function Home() {
  return null;
}
