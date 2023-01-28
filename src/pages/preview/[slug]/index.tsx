import { getOrigin } from "@/utils/get-origin";
import { trpc } from "@/utils/trpc";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Preview() {
  const {
    query: { slug },
  } = useRouter();
  const { data } = trpc.url.getUrl.useQuery({ slug: slug as string });

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
