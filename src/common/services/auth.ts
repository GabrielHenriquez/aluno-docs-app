import { IUser } from "@stores/auth/authStore.model";
import { API } from "common/configs/api";
import { ICredentials } from "common/models/auth";

class AuthService {
  async login(credentials: ICredentials): Promise<IUser> {
    try {
      const { data } = await API.post("/auth/login", credentials);
      return data;
    } catch (error) {
      throw new Error("Invalid credentials or server error");
    }
  }
}

export default new AuthService();
