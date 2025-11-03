import { Router } from "express";

const categoryRouter = Router();

//Valid Routes
categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", placeNewCategory);

categoryRouter.get("/:id", getCategoryByID);
categoryRouter.put("/:id", updateCategoryByID);
categoryRouter.delete("/:id", deleteCategoryByID);

//Method not allowed
categoryRouter.put("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
categoryRouter.patch("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
categoryRouter.delete("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

categoryRouter.post("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
categoryRouter.patch("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

export default categoryRouter;
