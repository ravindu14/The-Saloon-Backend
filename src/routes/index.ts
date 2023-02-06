import { Router } from "express";
import { createAuthController } from "../controllers/auth";
import authMiddleware from "../shared/middlewares/auth.middleware";

export const initRoutes = () => {
  const router = new Router();

  // Auth
  const path = "/auth";
  const authController = createAuthController();

  router.post(`${path}/signup`, authController.createOrUpdateUser);
  router.post(`${path}/login`, authController.login);
  router.get(
    `${path}/user-profile`,
    authMiddleware,
    authController.getUserProfile
  );

  return router;
};
