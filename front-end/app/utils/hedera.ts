import { HashConnect } from 'hashconnect';

let hashconnect: HashConnect | null = null;
const appMetadata = {
  name: "CropTrust",
  description: "A decentralized marketplace for agriculture",
  icon: "https://www.hashpack.app/img/logo.svg",
};

export const initHashConnect = async () => {
  if (!hashconnect) {
    hashconnect = new HashConnect(true);
    await hashconnect.init(appMetadata, 'testnet', false);
  }
  return hashconnect;
};

export const connectToHashpack = async (setConnected: (connected: boolean) => void) => {
  const hc = await initHashConnect();
  if (hc) {
    hc.connectToLocalWallet();
    hc.pairingEvent.once((pairingData) => {
      console.log("Wallet connected:", pairingData);
      setConnected(true);
    });
  }
};

export const disconnectFromHashpack = async (setConnected: (connected: boolean) => void) => {
  const hc = await initHashConnect();
  if (hc && hc.hcData.topic) {
    hc.disconnect(hc.hcData.topic);
    setConnected(false);
  }
};

export const checkHashpackConnection = async () => {
  const hc = await initHashConnect();
  return hc ? hc.hcData.pairingData.length > 0 : false;
};