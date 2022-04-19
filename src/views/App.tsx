import { css } from "@emotion/react";
import BoardView from "./BoardView";
import PlayerView from "./PlayerView";
import { Toolbar } from "./Toolbar";

const App = () => (
  <div
    css={css({
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    })}
  >
    <PlayerView />
    <BoardView />
    <Toolbar />
  </div>
);

export default App;
