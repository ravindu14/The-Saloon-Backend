import { Router } from "express";
import { createAuthController } from "../controllers/auth";
import { createMerchantController } from "../controllers/merchant";
import authMiddleware from "../shared/middlewares/auth.middleware";

export const initRoutes = () => {
  const router = new Router();

  // Auth
  const userPath = "/auth";
  const authController = createAuthController();

  router.post(`${userPath}/signup`, authController.createOrUpdateUser);
  router.post(`${userPath}/login`, authController.login);
  router.get(
    `${userPath}/user-profile`,
    authMiddleware,
    authController.getUserProfile
  );
  router.put(
    `${userPath}/user-profile`,
    authMiddleware,
    authController.updateUserProfile
  );

  // Merchant
  const merchantPath = "/merchant";
  const merchantController = createMerchantController();

  router.post(
    `${merchantPath}/services`,
    authMiddleware,
    merchantController.createService
  );
  router.get(
    `${merchantPath}/services`,
    authMiddleware,
    merchantController.getAllServices
  );
  router.get(
    `${merchantPath}/profile`,
    authMiddleware,
    merchantController.getMerchantProfile
  );
  router.put(
    `${merchantPath}/profile`,
    authMiddleware,
    merchantController.updateMerchantProfile
  );

  //agenda routes
  //admin routes
  return router;
};
