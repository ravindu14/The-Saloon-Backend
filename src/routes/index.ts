import { Router } from "express";
import { createAuthController } from "../controllers/auth";

export const initRoutes = () => {
  const router = new Router();

  // Auth
  const path = "/auth";
  const authController = createAuthController();
  router.put(`${path}`, authController.createOrUpdateUser);

  return router;
};
