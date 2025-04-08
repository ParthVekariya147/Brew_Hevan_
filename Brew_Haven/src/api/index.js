import axiosClient from "../confige/axios";

export function login(URL, data) {
  return axiosClient
    .post(`/${URL}`, data)
    .then((response) => {
      return response;
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
    })
    .catch((error) => {
      console.log("error ------", error);
    });
}

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

export function forgetPsswordSendOtp(email) {
  return axiosClient
    .post("/forgot-password/send-otp", { email })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
}

export function forgetPasswordVerifyOtp(email, otp) {
  return axiosClient
    .post("/forgot-password/verify-otp", { email, otp })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
}

export function resetpassword(data) {
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


export function subscribe(data) {
  return axiosClient
  .post("/subscribe",data)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.log("error ------", error);
    throw error;
  });
}

export function submitContactForm(data) {
  return axiosClient
    .post("/contact", data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error submitting contact form:", error);
      throw error;
    });
}