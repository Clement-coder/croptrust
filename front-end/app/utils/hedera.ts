import { HashConnect } from 'hashconnect';
import { Contract, ethers } from "ethers";

let hashconnect: HashConnect | null = null;
const appMetadata = {
  name: "CropTrust",
  description: "A decentralized marketplace for agriculture",
  icon: "https://www.hashpack.app/img/logo.svg",
};

// Placeholder for the deployed FarmerRegistry contract address
const FARMER_REGISTRY_CONTRACT_ID = "0.0.12345"; // Replace with actual contract ID after deployment

// ABI for FarmerRegistry (truncated for brevity, full ABI from FarmerRegistry.json)
const FARMER_REGISTRY_ABI = [
  {
    "inputs": [],
    "name": "ListingNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UserAlreadyRegistered",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farmer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "location",
        "type": "string"
      }
    ],
    "name": "FarmerRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farmer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "listingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "crop",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "ListingAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farmer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "listingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "name": "ListingUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_crop",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "addListing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "farmers",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_farmer",
        "type": "address"
      }
    ],
    "name": "getFarmerListings",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "crop",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          }
        ],
        "internalType": "struct FarmerRegistry.Listing[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "listings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "crop",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_metadataURI",
        "type": "string"
      }
    ],
    "name": "registerFarmer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_listingId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_active",
        "type": "bool"
      }
    ],
    "name": "updateListingStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let connectedAccountID: string | null = null;

export const initHashConnect = async () => {
  if (!hashconnect) {
    hashconnect = new HashConnect(true);
    await hashconnect.init(appMetadata, 'testnet', false);

    hashconnect.pairingEvent.on((pairingData) => {
      console.log("Wallet connected:", pairingData);
      if (pairingData.accountIds && pairingData.accountIds.length > 0) {
        connectedAccountID = pairingData.accountIds[0];
      }
    });

    hashconnect.disconnectionEvent.on((data) => {
      console.log("Wallet disconnected:", data);
      connectedAccountID = null;
    });
  }
  return hashconnect;
};

export const connectToHashpack = async () => {
  const hc = await initHashConnect();
  if (hc) {
    hc.connectToLocalWallet();
  }
};

export const disconnectFromHashpack = async () => {
  const hc = await initHashConnect();
  if (hc && hc.hcData.topic) {
    hc.disconnect(hc.hcData.topic);
  }
};

export const checkHashpackConnection = async () => {
  const hc = await initHashConnect();
  return hc ? hc.hcData.pairingData.length > 0 : false;
};

export const getConnectedAccountID = () => connectedAccountID;

export const getFarmerRegistryContract = async () => {
  const hc = await initHashConnect();
  if (!hc || !connectedAccountID) {
    throw new Error("HashConnect not initialized or wallet not connected.");
  }

  const provider = new ethers.providers.Web3Provider(hc.getProvider(hc.hcData.pairingData[0].topic));
  const signer = provider.getSigner();

  // Convert Hedera Contract ID to EVM address (example, actual conversion might vary)
  const contractAddress = `0x${FARMER_REGISTRY_CONTRACT_ID.split('.').pop()}`;

  const farmerRegistryContract = new Contract(contractAddress, FARMER_REGISTRY_ABI, signer);
  return farmerRegistryContract;
};

export const isFarmerRegistered = async (): Promise<boolean> => {
  try {
    const walletAddress = getConnectedAccountID();
    if (!walletAddress) return false;
    const contract = await getFarmerRegistryContract();
    const farmer = await contract.farmers(walletAddress);
    return farmer.isRegistered;
  } catch (error) {
    console.error("Error checking farmer registration:", error);
    return false;
  }
};

export const registerFarmer = async (name: string, location: string, metadataURI: string) => {
  try {
    const contract = await getFarmerRegistryContract();
    const tx = await contract.registerFarmer(name, location, metadataURI);
    await tx.wait();
    console.log("Farmer registered successfully!");
  } catch (error) {
    console.error("Error registering farmer:", error);
    throw error;
  }
};

export const getFarmerDetails = async () => {
  try {
    const walletAddress = getConnectedAccountID();
    if (!walletAddress) return null;
    const contract = await getFarmerRegistryContract();
    const farmer = await contract.farmers(walletAddress);
    return {
      name: farmer.name,
      location: farmer.location,
      metadataURI: farmer.metadataURI,
      isRegistered: farmer.isRegistered,
      wallet: walletAddress,
    };
  } catch (error) {
    console.error("Error fetching farmer details:", error);
    return null;
  }
};