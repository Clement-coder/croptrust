import { HashConnect } from 'hashconnect';

let hashconnect: HashConnect;

const appMetadata = {
  name: "CropTrust",
  description: "A decentralized marketplace for agriculture",
  icon: "https://www.hashpack.app/img/logo.svg",
};

export const connectWallet = async () => {
  hashconnect = new HashConnect(true);
  const initData = await hashconnect.init(appMetadata, 'testnet', false);
  const pairingString = initData.pairingString;

  // Show pairing string to user
  console.log("Pairing string:", pairingString);

  return new Promise((resolve, reject) => {
    hashconnect.pairingEvent.once((pairingData) => {
      resolve(pairingData);
    });
  });
};
