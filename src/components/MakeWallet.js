import { keystore } from "eth-lightwallet";
import React, { useState, useEffect } from "react";
import { Button, Divider, Form } from "semantic-ui-react";

export default function MakeWallet({ settingAddress }) {
  const [seed, setSeed] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState({});
  const [downloadLink, setDownloadLink] = useState();
  const [makeComplete, setMakeComplete] = useState(false);

  const makeTextFile = () => {
    if (address.address !== undefined) {
      const data = new Blob(["지갑 주소 : " + address.address + "\n" + "keystore : " + address.keystore], { type: "text/plain" });
      setMakeComplete(true);
      if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);

      setDownloadLink(window.URL.createObjectURL(data));
    }
  };
  const changeSeed = (e) => {
    setSeed(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const makeAddress = (seed, pwd) => {
    keystore.createVault(
      {
        password: pwd,
        seedPhrase: seed,
        hdPathString: "m/0'/0'/0'",
      },
      function (err, ks) {
        ks.keyFromPassword(password, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);

          let address = ks.getAddresses().toString();
          let keystore = ks.serialize();
          setAddress({ keystore: keystore, address: address });
        });
      }
    );

    setMakeComplete(true);
  };
  const valid = () => {
    if (keystore.isSeedValid(seed)) {
      makeAddress(seed, password);
    }
  };

  useEffect(() => {
    makeTextFile();
    settingAddress(address.keystore, address.address);
  }, [address]);
  return (
    <>
      <Form>
        <Form.TextArea label="Mnemonic" placeholder="Write Mnemonic" onChange={changeSeed} value={seed} />

        <Form.Input icon="lock" iconPosition="left" label="Password" placeholder="Write Password" type="password" onChange={changePassword} value={password} />

        <Button onClick={valid} content="Create Address !" primary />
      </Form>
      <Divider />
      <Button active={makeComplete}>
        <a download="Mnemonic_Address.txt" href={downloadLink}>
          {makeComplete ? "Download" : "Create Address First!"}
        </a>
      </Button>
    </>
  );
}
