import { keystore } from "eth-lightwallet";
import React, { useState } from "react";
import { Button, Container, Divider } from "semantic-ui-react";

const MakeMnemonic = () => {
  const [mnemonic, setMnemonic] = useState("");
  const makeNemonic = () => {
    setMnemonic(keystore.generateRandomSeed());
  };
  return (
    <>
      <Container textAlign="left">
        <Button onClick={makeNemonic}>Create Mnemonic</Button>
      </Container>
      <Divider />
      <Container textAlign="left">
        <div style={{ height: "50px", display: "flex", flexDirection: "column" }}>
          <b>Mnemonic</b>
          <p>{mnemonic}</p>
        </div>
      </Container>
    </>
  );
};

export default MakeMnemonic;
