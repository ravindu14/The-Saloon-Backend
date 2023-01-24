import { Router } from "express";
import { createAuthController } from "../controllers/auth";

export const initRoutes = () => {
  const router = new Router();

  // Auth
  const path = "/auth";
  const authController = createAuthController();

  router.post(`${path}/signup`, authController.createOrUpdateUser);
  router.post(`${path}/login`, authController.login);

  return router;
};
