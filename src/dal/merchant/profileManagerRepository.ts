import { MerchantProfileDto } from "../../dto/merchant/merchantDto";
import ProfileSchema from "./model/profile";

export class ProfileManagerRepository {
  private model: any;

  constructor() {
    this.model = ProfileSchema;
  }

  public createProfile = async (profile: MerchantProfileDto) => {
    return await this.model.create(profile);
  };

  public getProfileByMerchant = async (userId: String) => {
    return await this.model.findOne({ userId });
  };

  public updateMerchantProfile = async (
    userId: String,
    profile: MerchantProfileDto
  ) => {
    const updatedProfile = await this.model.findOneAndUpdate(
      { userId },
      { $set: profile },
      { new: true }
    );

    const newProfile: MerchantProfileDto = {
      userId: updatedProfile.userId,
      businessName: updatedProfile.businessName,
      address: updatedProfile.address,
      openTime: updatedProfile.openTime,
      closeTime: updatedProfile.closeTime,
      bannerImage: updatedProfile.bannerImage,
      description: updatedProfile.description,
      latitude: updatedProfile.latitude,
      longitude: updatedProfile.longitude,
      contact: updatedProfile.contact,
    };

    return newProfile;
  };

  public getProfileByMerchantName = async (keyword: String) => {
    return await this.model.find({ businessName: { $regex: keyword } });
  };
}
