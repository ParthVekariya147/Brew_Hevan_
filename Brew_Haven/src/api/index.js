import axiosClient from "../confige/axios";

export function login(URL, data) {
  return axiosClient
    .post(`/${URL}`, data)
    .then((response) => {
      return response;
      console.log(response);
    })
    .catch((error) => {
      console.log("error ------", error);
    });
}

export function register(URL, data) {
  return axiosClient
    .post(`/${URL}`, data)
    .then((response) => {
      return response;
      console.log(response);
    })
    .catch((error) => {
      console.log("error ------", error);
    });
}

export function add(URL, data) {
  return axiosClient
    .post(`/${URL}`, data)
    .then((response) => {
      return response;
      console.log(response);
    })
    .catch((error) => {
      console.log("error ------", error);
    });
}

// Add these new functions
export function sendOtp(email) {
  return axiosClient
    .post("/send-otp", { email })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
}

export function verifyOtp(email, otp) {
  return axiosClient
    .post("/verify-otp", { email, otp })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
}

export function getMenu() {
  return axiosClient
    .get("/getmenu")
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching menu:", error);
      throw error;
    });
}

export const createOrder = (orderData) => {
  return axiosClient.post("/orders", orderData);
};

export const fetchOrders = () => {
  return axiosClient.get("/orders");
};

export function resetPassword(data) {
  return axiosClient
    .post("/reset-password", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
}

// export function forgotPassword(email, newPassword) {
//   return axiosClient
//     .post("/forgotpassword", { email, newPassword })
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       console.log("error ------", error);
//       throw error;
//     });
// }

