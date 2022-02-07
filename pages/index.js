import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Container, Divider, Grid, Segment } from "semantic-ui-react";
import MakeMnemonic from "../src/components/MakeMnemonic";
import MakeWallet from "../src/components/MakeWallet";
import WriteAddress from "../src/components/WriteAddress";

export default function Home() {
  const [createdAddress, setCreatedAddress] = useState({});
  const settingAddress = (keystore, address) => {
    console.log(keystore, address);
    setCreatedAddress({ keystore: keystore, address: address });
  };
  const abc = () => {
    console.log(createdAddress);
  };
  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Grid.Row>
            <Container>
              <MakeMnemonic />
              <Divider />
              <div style={{ height: "50px", display: "flex", flexDirection: "column" }}>
                <b>Address</b>
                <p>{createdAddress !== {} ? createdAddress.address : ""}</p>
                <Divider />
                <b>{createdAddress !== undefined ? "If you want keystore information, Please download textFile " : ""}</b>
              </div>
            </Container>
            {/* <WriteAddress createdAddress={createdAddress} /> */}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <MakeWallet settingAddress={settingAddress} />
        </Grid.Column>
      </Grid>
      <Divider vertical>
        <b>→</b>
      </Divider>
    </Segment>
  );
}
