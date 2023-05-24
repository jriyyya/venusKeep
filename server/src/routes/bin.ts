import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/:id/add", async (req, res) => {
  try {
    if (req.body.value) {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $push: { bin: req.body.value },
      });

      return res.status(200).send({ code: 0, index: user?.bin.length });
    } else {
      return res.status(400).send({ code: 2, message: "Invalid value" });
    }
  } catch {
    return res.status(500).send({ code: 1, message: "Failed to add to bin" });
  }
});

router.get("/:id/seek/:index", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const index = Number(req.params.index);
    if (user && (index === 0 || index) && index < user.bin.length) {
      return res.status(200).send({ code: 0, value: user.bin[index] });
    } else {
      return res.status(400).send({ code: 1, error: "Invalid index" });
    }
  } catch {
    return res.status(500).send({ code: 1, message: "Failed to seek" });
  }
});

router.get("/:id/seek", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).send({ code: 0, bin: user.bin });
    }
    return res.status(400).send({ code: 0, message: "User not found" });
  } catch {
    return res.status(500).send({ code: 1, message: "Failed to seek" });
  }
});
// post -> /bin/add (body : {value : 'string'})
// returns -> {index : <new index>}

// get -> /bin/seek/:index
// returns -> item at indexx, error if does not exist

export default router;
