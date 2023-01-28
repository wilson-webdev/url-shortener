import { PageProps } from "@/types/page-props";
import { trpc } from "@/utils/trpc";
import { GetServerSideProps } from "next";

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
