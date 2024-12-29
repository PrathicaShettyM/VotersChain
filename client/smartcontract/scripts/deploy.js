const hre = require("hardhat");

async function main() {
    const [admin] = await hre.ethers.getSigners(); // Admin deploys the contract
    console.log("Deploying the contract with admin:", admin.address);

    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    await voting.deployed();
    console.log("Voting contract deployed at:", voting.address);

    // Register candidates and voters on the blockchain
    const voterAddresses = [
        "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", 
        "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
        "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
        "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
        "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    ];

    const candidateDetails = [
        { address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", name: "Modi", party: "BJP" },
        { address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", name: "Rahul Gandhi", party: "Congress" },
        { address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", name: "Kejriwal", party: "AAP" },
    ];

    // 1. Register voters
    for (const voterAddress of voterAddresses) {
        const tx = await voting.registerVoter(voterAddress);
        await tx.wait();
        console.log(`Registered voter: ${voterAddress}`);
    }

    // 2. Register candidates
    for (const candidate of candidateDetails) {
        const tx = await voting.registerCandidate(candidate.address, candidate.name, candidate.party);
        await tx.wait();
        console.log(`Registered candidate: ${candidate.address} ${candidate.name} (${candidate.party})`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
