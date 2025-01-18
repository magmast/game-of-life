import { AppShell, Header, MantineProvider, Text } from "@mantine/core";

import BoardView from "./BoardView";
import PlayerView from "./PlayerView";
import { Toolbar } from "./Toolbar";

const App = () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <AppShell
      header={
        <Header
          height={52}
          sx={{ display: "flex", alignItems: "center", padding: "1rem" }}
        >
          <Text>Game of Life</Text>
        </Header>
      }
      styles={{
        root: { height: "100vh", display: "flex", flexDirection: "column" },
        body: { flexGrow: 1 },
        main: { padding: 0, position: "relative" },
      }}
    >
      <PlayerView />
      <BoardView />
      <Toolbar />
    </AppShell>
  </MantineProvider>
);

export default App;
