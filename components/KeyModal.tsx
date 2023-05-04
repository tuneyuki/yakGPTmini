import { useState } from "react";
import {
  Button,
  Group,
  Box,
  Loader,
  Tabs,
  px,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import {
  IconCheck,
  IconX,
} from "@tabler/icons-react";

export function APIPanel({
  name,
  initialKey,
  initialRegion,
  setKeyFun,
  setKeyFunRegion,
  descriptionAboveInput,
  descriptionBelowInput,
  validateKey,
  closeModal,
}: {
  name: string;
  initialKey: string | undefined;
  initialRegion?: string | undefined;
  setKeyFun: (key: string) => void;
  setKeyFunRegion?: (key: string) => void;
  descriptionAboveInput: string;
  descriptionBelowInput: React.ReactNode;
  validateKey: (key: string, region?: string) => Promise<boolean>;
  closeModal: () => void;
}) {
  const [checkStatus, setCheckStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [apiKey, setApiKey] = useState(initialKey);
  const [region, setRegion] = useState(initialRegion);

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckStatus("idle");
    setApiKey(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (apiKey) {
      setCheckStatus("loading");

      const keyValid = await validateKey(apiKey, region);

      if (keyValid) {
        notifications.show({
          message: "Key saved!",
          color: "green",
        });
        setKeyFun(apiKey);
        if (setKeyFunRegion && region) {
          setKeyFunRegion(region);
        }
        setCheckStatus("success");
      } else {
        notifications.show({
          message: "Something went wrong",
          color: "red",
        });
        setCheckStatus("error");
      }
    }
  };

  const iconMap = {
    idle: null,
    loading: <Loader size={px("1rem")} />,
    success: <IconCheck color="green" size={px("1rem")} />,
    error: <IconX color="red" size={px("1rem")} />,
  };
  const icon = iconMap[checkStatus];
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>🔑 {name}:</h2>
        <p>{descriptionAboveInput}</p>
        <PasswordInput
          label="API Key"
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          icon={icon}
          value={apiKey}
          onChange={handleKeyChange}
        />
        {setKeyFunRegion && (
          <TextInput
            label="Region"
            placeholder="westus"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          />
        )}
        {descriptionBelowInput}
        <Group position="right" mt="md">
          <Button
            type="submit"
            disabled={initialKey === apiKey && initialRegion === region}
          >
            Save
          </Button>
          <Button onClick={closeModal} variant="light">
            Cancel
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default function KeyModal({ close }: { close: () => void }) {
  return (
    <div>

    </div>
  );
}
