import { useChatStore } from "@/stores/ChatStore";
import { Button, Loader, px, createStyles, MantineTheme } from "@mantine/core";
// import {
//   IconMicrophone,
//   IconMicrophoneOff,
//   IconX,
//   IconPlayerPlay,
//   IconPlayerPause,
//   IconVolumeOff,
//   IconVolume,
// } from "@tabler/icons-react";
import ChatTextInput from "./ChatTextInput";
import { useRouter } from "next/router";
// import UIControllerSettings from "./UIControllerSettings";
// import * as OpusRecorder from "@/stores/RecorderActions";
// import * as AzureRecorder from "@/stores/AzureRecorderActions";
// import {
//   addChat,
//   setPlayerMode,
//   setPushToTalkMode,
// } from "@/stores/ChatActions";
// import { toggleAudio } from "@/stores/PlayerActions";

const styles = createStyles((theme: MantineTheme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    position: "fixed",
    bottom: 0,
    left: 0,
    [`@media (min-width: ${theme.breakpoints.sm})`]: {
      left: 200,
    },
    [`@media (min-width: ${theme.breakpoints.md})`]: {
      left: 250,
    },
    right: 0,
    zIndex: 1,
    maxWidth: 820,
    margin: "0 auto",
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  playerControls: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: "72px",
  },
  textAreaContainer: {
    display: "flex",
    flexGrow: 1,
    alignItems: "flex-end",
  },
  textArea: {
    flexGrow: 1,
  },
  recorderButton: {
    width: "72px",
  },
  recorderControls: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: "72px",
  },
}));


const ChatInput = () => {
  const { classes } = styles();

  const router = useRouter();

  const editingMessage = useChatStore((state) => state.editingMessage);

  // const pushToTalkMode = useChatStore((state) => state.pushToTalkMode);
  // const audioState = useChatStore((state) => state.audioState);

  // const activeChatId = useChatStore((state) => state.activeChatId);
  const showTextDuringPTT = useChatStore((state) => state.showTextDuringPTT);
  const showTextInput = showTextDuringPTT || editingMessage;

  // const modelChoiceSTT = useChatStore((state) => state.modelChoiceSTT);
  // const Recorder = modelChoiceSTT === "azure" ? AzureRecorder : OpusRecorder;

  // console.log("rendered with audioState", audioState);
  return (
    <div className={classes.textAreaContainer}>
      {showTextInput && <ChatTextInput className={classes.textArea} />}
    </div>
  );
};



export default function UIController() {
  const { classes } = styles();

  return (
    <div className={classes.container}>
      <ChatInput />
    </div>
  );
}
