import { getOrigin } from "@/utils/get-origin";
import { trpc } from "@/utils/trpc";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
  InputGroup,
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useReducer } from "react";

type CopyReducer = (
  state: Record<string, boolean>,
  action: { key: string; hasCopied?: boolean }
) => Record<string, boolean>;

export default function Preview() {
  const {
    query: { slug },
  } = useRouter();
  const [copyState, setCopyState] = useReducer<CopyReducer>(
    (state, { key, hasCopied }) => {
      return {
        ...state,
        [key]: hasCopied ?? !state[key],
      };
    },
    {}
  );

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

  const shortUrl = `${getOrigin()}/${data?.shortUrl}`;

  const fields = [
    {
      key: "shortUrl",
      label: "Short URL",
      value: shortUrl,
      canCopy: true,
    },
    {
      key: "originalUrl",
      label: "URL",
      value: data?.originalUrl,
    },
  ];

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
      {fields.map(({ key, value, label, canCopy }) => {
        return (
          <FormControl key={key}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
              <Input value={value} isReadOnly />
              {canCopy && (
                <InputRightAddon p="0">
                  <IconButton
                    aria-label="Copy URL"
                    onClick={() => {
                      navigator.clipboard.writeText(value);
                      setCopyState({ key, hasCopied: true });

                      setTimeout(() => {
                        setCopyState({ key, hasCopied: false });
                      }, 2000);
                    }}
                  >
                    {copyState[key] ? (
                      <CheckIcon color="green.400" />
                    ) : (
                      <CopyIcon />
                    )}
                  </IconButton>
                </InputRightAddon>
              )}
            </InputGroup>
          </FormControl>
        );
      })}
    </Stack>
  );
}
