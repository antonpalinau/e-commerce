import React, { Profiler } from "react";

import { HomepageContainer } from "./homepage.styles";
import Directory from "../../components/directory/directory.components";

const HomePage = () => (
  <HomepageContainer>
    <Profiler
      id="Directory"
      onRender={(id, phase, actualDuration) => {
        console.log({
          id,
          phase,
          actualDuration,
        });
      }}
    >
      <Directory />
    </Profiler>
  </HomepageContainer>
);

export default HomePage;
