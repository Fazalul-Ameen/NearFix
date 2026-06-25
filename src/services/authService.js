import API from "../utils/api";

const LOCAL_USERS_KEY = "nearfix_users";

export const login = async (identifier, password) => {
  try {
    const response = await API.post("/auth/login", { identifier, password });
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    }
  } catch (err) {
    console.warn("Backend login failed, attempting local storage login...", err);
    
    // Local storage fallback login
    const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    const cleanIdentifier = identifier.trim().toLowerCase();
    const matchedUser = localUsers.find(
      (u) =>
        u.email?.toLowerCase() === cleanIdentifier ||
        u.phoneNumber === cleanIdentifier
    );

    if (matchedUser && matchedUser.password === password) {
      const demoToken = "demo-jwt-token-123456";
      const userData = {
        id: matchedUser.id || `user-${Date.now()}`,
        fullname: matchedUser.fullName,
        email: matchedUser.email,
        phoneNumber: matchedUser.phoneNumber,
        role: matchedUser.role || "customer",
        streetAddress: matchedUser.streetAddress,
        city: matchedUser.city,
        state: matchedUser.state,
        pinCode: matchedUser.pinCode,
      };
      
      localStorage.setItem("token", demoToken);
      localStorage.setItem("user", JSON.stringify(userData));
      
      return {
        success: true,
        user: userData,
        token: demoToken,
      };
    }
    
    // Throw readable error message
    const errorMsg = err.response?.data?.message || "Invalid email, phone number, or password.";
    throw new Error(errorMsg);
  }
};

export const signup = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (err) {
    console.warn("Backend signup failed, attempting local storage registration...", err);
    
    const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    const alreadyExists = localUsers.some(
      (u) => u.email === userData.email || u.phoneNumber === userData.phoneNumber
    );

    if (alreadyExists) {
      throw new Error("A user with this email or phone number already exists.");
    }

    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      role: userData.role || "customer",
    };

    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify([...localUsers, newUser]));
    return {
      success: true,
      message: "Registration saved locally.",
      user: {
        id: newUser.id,
        fullname: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
    };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
