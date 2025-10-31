# CropTrust: A Decentralized Marketplace for Agriculture

**CropTrust** is a decentralized, blockchain-based marketplace built on **Hedera Hashgraph** that connects farmers directly with buyers, fostering transparency, security, and fairness in the agricultural supply chain.

By removing intermediaries, CropTrust empowers farmers to earn fair prices for their produce while providing buyers with trusted, verifiable transactions through **Hedera smart contracts** and **escrow mechanisms** powered by the **Hedera Token Service (HTS)** and **Smart Contract Service (HSCS)**.

---

## Core Components

The CropTrust ecosystem is powered by a suite of Hedera smart contracts that ensure a seamless, trustless, and transparent experience.

### 1. Farmer Registry (`FarmerRegistry.sol`)

Acts as the digital identity hub for farmers on the **Hedera Smart Contract Service**.

**Key Features**

* **Profile registration:** farmers register their name, location, and farm details on the Hedera network.
* **Crop listings:** registered farmers can list crops for sale (crop type, price, and quantity), stored and verified using **Hedera Consensus Service (HCS)** for transparency.
* **Profile verification:** each farmer is associated with a verifiable, immutable on-chain identity linked to their **Hedera account ID**.

---

### 2. Marketplace (`CropTrustMarketplace.sol`)

The marketplace serves as the core trading platform where buyers can browse and purchase crops from registered farmers.
All listings, transactions, and order events are logged using the **Hedera Consensus Service** to maintain an auditable record.

**Functions**

* Discover available crop listings registered on Hedera.
* Initiate secure purchases through **HTS-based USDT payments**.
* Automatically create escrow contracts using **Hedera Smart Contract Service** for secure fund handling.

---

### 3. Escrow (`CropTrustEscrow.sol`)

The escrow contract is the financial backbone of CropTrust, ensuring safe and transparent transactions between buyers and farmers on **Hedera**.

**Features**

* **Secure fund holding:** buyer’s payment (USDT via HTS) is locked in escrow on-chain.
* **Stable payments:** transactions utilize **Hedera Token Service** to process USDT transfers.
* **Confirmation and release:** funds are released via Hedera contract calls when the buyer confirms receipt.
* **Dispute resolution:** an arbitrator account on Hedera can decide disputes to refund or release funds.
* **Failsafe mechanism:** if no confirmation after a predefined period (e.g., 48 hours), funds auto-release to the farmer using a scheduled Hedera transaction.

---

## User Workflow

CropTrust offers a unified experience where users can act as both **farmers** and **buyers** using one Hedera account.

### 1. Get Started / Onboarding

* User visits the CropTrust dApp and clicks **“Get Started.”**
* Connects a **Hedera-compatible wallet** (such as **HashPack** or **Blade Wallet**).
* Once connected, CropTrust recognizes the user’s **Hedera account ID** as their on-chain identity.

---

### 2. User Registration

After connecting the wallet, the user registers on-chain through the **FarmerRegistry** smart contract deployed on **Hedera Smart Contract Service**.

**Required Information**

* Full name
* Email or contact information
* Location (country, state)
* Farm or business name
* Role preference (Farmer or Buyer – can switch later)
* Optional: farm image or logo (stored on IPFS)

Registration creates a **unique on-chain profile** linked to the user’s **Hedera account ID**.

---

### 3. Dashboard Access

After registration, the user is redirected to their personalized dashboard, which displays:

* Profile information fetched from Hedera smart contracts
* Connected Hedera account ID
* Role toggle (Farmer ↔ Buyer)
* Access to the global marketplace (using HCS event logs for listings)

---

### 4. Role-Based Actions

Users can easily switch between Farmer Mode and Buyer Mode using a toggle button.

**Farmer Mode**

* Create new crop listings (name, price, quantity, description, image).
* Manage existing listings (edit, pause, or delete).
* View active and completed sales (queried from Hedera event logs).
* Monitor payment statuses via escrow smart contracts.

**Buyer Mode**

* Browse available crop listings from Hedera network.
* Filter by crop type, price, or farmer location.
* Initiate purchase to trigger **HTS-based escrow contract**.
* Confirm delivery and release payment through Hedera transaction.
* View order history recorded via **Hedera Consensus Service**.

---

### 5. Marketplace

Accessible to all users, the global marketplace displays:

* Verified crop listings stored on Hedera.
* Farmer details and verified Hedera identities.
* Prices denominated in USDT via **Hedera Token Service**.
* “Buy Now” functionality linked directly to Hedera escrow contracts.

---

### 6. Escrow Transaction Flow

1. Buyer selects a crop and clicks **Buy Now**.
2. Buyer deposits USDT; funds are held in the **CropTrustEscrow** contract on Hedera.
3. Farmer is notified of escrow creation via **Hedera Consensus Service**.
4. Farmer delivers goods offline.
5. Buyer confirms receipt; payment is released automatically through **HTS transfer**.
6. If no confirmation within 48 hours, the **Hedera Scheduled Transaction Service** releases funds to the farmer.
7. Disputes can be resolved by an **arbitrator account** on Hedera.

---

### 7. Post-Transaction

After successful trades:

* Farmer’s reputation score increases, logged on Hedera for transparency.
* Buyer can rate and review the transaction.
* Both users can view transaction history verified on the Hedera network.

---

### Workflow Summary Diagram (Text Overview)

```
[Get Started] → [Connect Hedera Wallet]
     ↓
[Register User Info → On-chain Profile Created (Hedera Smart Contract Service)]
     ↓
[Dashboard]
     ├── View Profile (Hedera Account ID)
     ├── Toggle Role: Farmer ↔ Buyer
     ├── Access Marketplace (via HCS)
     ↓
(Farmer Mode)                         (Buyer Mode)
 ├── List Crops on Hedera              ├── Browse Hedera Listings
 ├── Manage Listings (Smart Contract)  ├── Initiate Escrow (HTS USDT)
 └── Track Sales via HCS               ├── Confirm Delivery (HSCS)
                                      └── View Orders (HCS Logs)
     ↓
[Escrow Handles Funds → Auto Release / Dispute Resolution on Hedera]
     ↓
[Reputation & Feedback Stored on Hedera]
```

---

## Technology Stack

| Layer             | Technology                               |
| ----------------- | ---------------------------------------- |
| Frontend          | React.js, Next.js, TailwindCSS           |
| Smart Contracts   | Solidity (Hedera Smart Contract Service) |
| Blockchain        | Hedera Hashgraph                         |
| Storage           | IPFS (for crop images and documents)     |
| Token Payments    | USDT via Hedera Token Service (HTS)      |
| Messaging / Audit | Hedera Consensus Service (HCS)           |

---

## Installation and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/croptrust.git
cd croptrust

# Frontend setup
cd front-end
npm install
npm run dev
# Visit http://localhost:3000

# Smart contract setup
cd ../Smart-contract
npm install

# Compile and deploy contracts to Hedera
npx hardhat run scripts/deploy.js --network hedera-testnet
```

---

## Directory Structure

```
croptrust/
│
├── front-end/                 # React + Next.js frontend
│   ├── components/            # UI Components
│   ├── pages/                 # Application pages
│   ├── utils/                 # Helper functions and Hedera SDK integration
│   └── public/                # Static assets
│
├── Smart-contract/            # Solidity smart contracts for Hedera
│   ├── contracts/             # Core smart contracts
│   ├── scripts/               # Deployment scripts for Hedera Testnet
│   └── test/                  # Test scripts
│
└── README.md                  # Project documentation
```

---

## Security and Transparency

* **Hedera-native transactions:** all payments and logs are handled via Hedera services.
* **Non-custodial:** funds never leave smart contract control.
* **Transparent transactions:** verifiable through Hedera’s public ledger.
* **Immutable records:** farmer profiles and crop listings permanently stored on-chain.
* **Escrow-backed protection:** both parties are safeguarded through Hedera’s atomic transaction design.

---

## Future Enhancements

* Integration with **Hedera Oracles** for real-time commodity price data.
* Tokenized incentives using **HTS-based CropTrust utility token**.
* Decentralized reputation scoring via **HCS-based trust metrics**.
* Integration with **Hedera-based logistics dApps** for crop delivery tracking.

---

## License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for details.

