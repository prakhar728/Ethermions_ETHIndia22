const nftwallet = require("../models/Nft");
const borrowedNft = require("../models/Borrow");
const router = require("express").Router();

router.post(
  "/:contract_address/:wallet_address/borrownft",
  async (req, res) => {
    try {
      const { roi, repay, token_id,amount } = req.body;
      if (!roi)
        return res.status(400).json({ message: "Rate of interest not found" });
      if (!repay)
        return res.status(400).json({ message: "Repayment time not found" });
      if (!amount)
        return res.status(400).json({ message: "Repayment Amount not found" });
      const { wallet_address, contract_address } = req.params;
      if (!wallet_address)
        return res.json({ message: "Wallet address Not found" });
      if (!contract_address)
        return res.json({ message: "Contract address Not found" });

      const mynft = await nftwallet.findOne({
        $and: [{ token_id }, { contract_address }],
      });

      console.log(mynft)

      if (!mynft) {
        return res.status(400).send({ message: "NFT not found" });
      }

      const { title, description, status, image } = mynft;

      if (status != "open") {
        return res.status(400).send({
          message: "Cannot borrow an NFT which is not open to borrow",
        });
      }

      const newnft=await nftwallet.findOneAndUpdate(
        {
          $and: [{ token_id }, { contract_address }],
        },
        { status: "borrowed", roi, repay, amount }
      );

      console.log(newnft)

      await borrowedNft.create({
        title,
        description,
        borrower_address: wallet_address,
        contract_address,
        token_id,
        roi,
        repay,
        image,
        amount,
      });

      const allNFT = await nftwallet.find({
        $and: [{ wallet_address }, { status: "open" }],
      });

      return res.json({
        message: `Successfully Borrowed NFT with ${title} & ${contract_address}`,
        nft: allNFT,
      });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
  }
);

router.get("/:wallet_address/getnft", async (req, res) => {
  try {
    const { wallet_address } = req.params;
    if (!wallet_address)
      return res.status(400).json({ message: "No wallet address found" });

    const nft = await nftwallet.find({
      $and: [{ wallet_address }, { status: "open" }],
    });

    return res.status(200).send({
      message: `Successfully Fetched NFTs which can be borrowed with wallet address ${wallet_address}`,
      nft,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
});

router.get("/:wallet_address/borrownft", async (req, res) => {
  try {
    const wallet_address = req.params.wallet_address;
    if (!wallet_address)
      return res.json({ message: "Wallet address Not found" });

    const allNFTS = await borrowedNft.find({
      $and: [{ borrower_address:wallet_address }],
    });

    return res
      .status(200)
      .send({ message: `Successfully Fetched Borrowed NFTs by borrower address ${wallet_address}`, nft: allNFTS });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
});

module.exports = router;
