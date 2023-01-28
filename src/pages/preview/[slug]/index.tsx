import { getOrigin } from "@/utils/get-origin";
import { trpc } from "@/utils/trpc";
import {
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Preview() {
  const {
    query: { slug },
  } = useRouter();
  const { data, isLoading, error } = trpc.url.getUrl.useQuery(
    {
      slug: slug as string,
    },
    {
      retry(failureCount, error) {
        if (error.data?.code === "NOT_FOUND") {
          return false;
        }

        return true;
      },
    }
  );

  const fields = [
    {
      label: "Short URL",
      value: `${getOrigin()}/${data?.shortUrl}`,
    },
    {
      label: "URL",
      value: data?.originalUrl,
    },
  ];

  console.log(error);

  if (error) {
    return (
      <Text textAlign="center">
        <strong>{slug}</strong> not found
      </Text>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack>
      {fields.map((field) => {
        return (
          <FormControl key={field.value + field.label}>
            <FormLabel>{field.label}</FormLabel>
            <Input value={field.value} isReadOnly />
          </FormControl>
        );
      })}
    </Stack>
  );
}
