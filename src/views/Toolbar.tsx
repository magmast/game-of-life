import { Box, Button, Paper, Slider, Text } from "@mantine/core";

import { useToolbarController } from "../controllers/ToolbarController";

export const Toolbar = () => {
  const { speed, playButtonText, clear, playOrPause, next, changeSpeed } =
    useToolbarController();

  return (
    <Paper
      shadow="lg"
      p="md"
      sx={{
        position: "absolute",
        bottom: "1rem",
        right: "1rem",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginBottom: 12,
        }}
      >
        <Button type="button" onClick={clear} mr="sm">
          CLEAR
        </Button>
        <Button type="button" onClick={playOrPause} mr="sm">
          {playButtonText}
        </Button>
        <Button type="button" onClick={next}>
          NEXT
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Text color="gray" size="sm">
          Speed
        </Text>
        <Slider
          min={1}
          max={10}
          value={speed}
          marks={[
            { value: 0, label: "Slow" },
            { value: 10, label: "Fast" },
          ]}
          onChange={(value) => changeSpeed(value)}
        />
      </Box>
    </Paper>
  );
};
