const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("Lock", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
  
  
  
  
    describe("Deployment", function () {
      it("Should set the right unlockTime", async function () {

      const [owner, otherAccount] = await ethers.getSigners();
      const ZappNft = await ethers.getContractFactory("ZappTokenNFT");
      const znft = await ZappNft.deploy();
      });
  
      it("Should set the right owner", async function () {
        const [owner, otherAccount] = await ethers.getSigners();
        const ZappNft = await ethers.getContractFactory("ZappTokenNFT");
        const znft = await ZappNft.deploy();
        await znft.transferOwnership("0x94e99f2247f855841e73a82c0562f2bfd760c1fe")
        expect(await znft.owner()).to.equal("0x94e99f2247f855841e73a82c0562f2bfd760c1fe");

      });
  
  
    //   it("Should fail if the unlockTime is not in the future", async function () {
    //     // We don't use the fixture here because we want a different deployment
    //     const latestTime = await time.latest();
    //     const Lock = await ethers.getContractFactory("Lock");
    //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //       "Unlock time should be in the future"
    //     );
    //   });
    });
});
  
//     describe("Withdrawals", function () {
//       describe("Validations", function () {
//         it("Should revert with the right error if called too soon", async function () {
//           const { lock } = await loadFixture(deployOneYearLockFixture);
  
//           await expect(lock.withdraw()).to.be.revertedWith(
//             "You can't withdraw yet"
//           );
//         });
  
//         it("Should revert with the right error if called from another account", async function () {
//           const { lock, unlockTime, otherAccount } = await loadFixture(
//             deployOneYearLockFixture
//           );
  
//           // We can increase the time in Hardhat Network
//           await time.increaseTo(unlockTime);
  
//           // We use lock.connect() to send a transaction from another account
//           await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//             "You aren't the owner"
//           );
//         });
  
//         it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//           const { lock, unlockTime } = await loadFixture(
//             deployOneYearLockFixture
//           );
  
//           // Transactions are sent using the first signer by default
//           await time.increaseTo(unlockTime);
  
//           await expect(lock.withdraw()).not.to.be.reverted;
//         });
//       });
  
//       describe("Events", function () {
//         it("Should emit an event on withdrawals", async function () {
//           const { lock, unlockTime, lockedAmount } = await loadFixture(
//             deployOneYearLockFixture
//           );
  
//           await time.increaseTo(unlockTime);
  
//           await expect(lock.withdraw())
//             .to.emit(lock, "Withdrawal")
//             .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//         });
//       });
  
//       describe("Transfers", function () {
//         it("Should transfer the funds to the owner", async function () {
//           const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//             deployOneYearLockFixture
//           );
  
//           await time.increaseTo(unlockTime);
  
//           await expect(lock.withdraw()).to.changeEtherBalances(
//             [owner, lock],
//             [lockedAmount, -lockedAmount]
//           );
//         });
//       });
//     });
//   });
  