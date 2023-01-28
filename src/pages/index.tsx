import { trpc } from "@/utils/trpc";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useState } from "react";
import { PageProps } from "@/types/page-props";
import { useRouter } from "next/router";

export default function Home({}: PageProps) {
  const {
    query: { invalidUrl },
    push,
  } = useRouter();
  const [url, setUrl] = useState("");
  const { error, mutateAsync, isLoading } = trpc.url.generateUrl.useMutation();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      mutateAsync({ url }).then(
        ({ shortUrl }) => {
          push(`/preview/${shortUrl}`);
        },
        () => {}
      );
    },
    [mutateAsync, url, push]
  );

  return (
    <Stack as="form" gap="2" onSubmit={handleSubmit}>
      {invalidUrl && (
        <Text>
          <strong>{invalidUrl}</strong> not found!
        </Text>
      )}
      <FormControl isInvalid={!!error}>
        <FormLabel>URL</FormLabel>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        {!!error && (
          <FormErrorMessage>Please provide a valid URL</FormErrorMessage>
        )}
      </FormControl>

      <Button isLoading={isLoading} isDisabled={url.length === 0} type="submit">
        Generate short URL
      </Button>
    </Stack>
  );
}
