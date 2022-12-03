const borrowedNft = require("../models/Borrow");
const lentnft = require("../models/Lend");
const nftwallet = require("../models/Nft");

const router = require("express").Router();

router.post("/clear", async (req, res) => {
  await borrowedNft.remove();
  await lentnft.remove();
  await nftwallet.remove();

  return res.status(200).json({ message: "Cleared DataBase Successfully" });
});

module.exports = router;
