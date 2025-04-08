import axiosClient from "../confige/axios.js";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = (url) => {
  return axiosClient
    .get(`/${url}`)
    .then((response) => response)
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
};

const post = (url, data) => {
  return axiosClient
    .post(`/${url}`, data)
    .then((response) => response)
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
};

const put = (url, data) => {
  return axiosClient
    .put(`/${url}`, data)
    .then((response) => response)
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
};

const del = (url) => {
  return axiosClient
    .delete(`/${url}`)
    .then((response) => response)
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
};

export function submitContactForm(data) {
  return axiosClient
    .post("/contact", data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error submitting contact form:", error);
      throw error;
    });
}

export function getAllContacts() {
  return axiosClient
    .get("/getcontacts")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching contacts:", error);
      throw error;
    });
}

export const login = async (endpoint, data) => {
  try {
    const response = await axiosClient.post(`/${endpoint}`, data);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

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

export function AdminLogin(data) {
  return axiosClient
    .post("/admin/login", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
}

export function AdminRegister(data) {
  return axiosClient
    .post("/admin/reg", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
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

export function sendOtp(phone) {
  return axiosClient
    .post("/send-otp", { phone })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
}

export function verifyOtp(phone, otp) {
  return axiosClient
    .post("/verify-otp", { phone, otp })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error ------", error);
      throw error;
    });
}

export { get, post, put, del };

export function getStaff() {
  return axiosClient
    .get("/staff")
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching staff:", error);
      throw error;
    });
}

export function getStaffById(id) {
  return axiosClient
    .get(`/staff/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching staff member:", error);
      throw error;
    });
}

export function updateStaff(id, data) {
  return axiosClient
    .put(`/staff/${id}`, data)
    .then((response) => response)
    .catch((error) => {
      console.error("Error updating staff:", error);
      throw error;
    });
}

export function deleteStaff(id) {
  return axiosClient
    .delete(`/staff/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error deleting staff:", error);
      throw error;
    });
}

export function getMenu() {
  return axiosClient
    .get("/menu/getmenu")
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching menu:", error);
      throw error;
    });
}

export function getMenuById(id) {
  return axiosClient
    .get(`/menu/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching menu:", error);
      throw error;
    });
}

export function updateMenu(id, data) {
  return axiosClient
    .put(`/menu/menu/${id}`, data)
    .then((response) => response)
    .catch((error) => {
      console.error("Error updating menu:", error);
      throw error;
    });
}

export function deleteMenu(id) {
  return axiosClient
    .delete(`/menu/menu/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error deleting menu:", error);
      throw error;
    });
}

export function createMenu(data) {
  return axiosClient
    .post("/menu/addmenu", data)
    .then((response) => response)
    .catch((error) => {
      console.error("Error creating menu item:", error);
      throw error;
    });
}

export function getOrders() {
  return axiosClient
    .get("/menu/getorder")
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching orders:", error);
      throw error;
    });
}

export function getOrdersById(id) {
  return axiosClient
    .get(`/menu/orders/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching orders:", error);
      throw error;
    });
}

export function updateOrders(id, data) {
  return axiosClient
    .put(`/menu/order/${id}`, data)
    .then((response) => response)
    .catch((error) => {
      console.error("Error updating orders:", error);
      throw error;
    });
}

export function deleteOrders(id) {
  return axiosClient
    .delete(`/menu/order/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error deleting orders:", error);
      throw error;
    });
}

export function createOrders(data) {
  return axiosClient
    .post("/menu/addorder", data)
    .then((response) => response)
    .catch((error) => {
      console.error("Error creating order:", error);
      throw error;
    });
}

export function getadminbookings() {
  return axiosClient
    .get("/admin/bookings")
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching bookings:", error);
      throw error;
    });
}

export function updateBooking(id, data) {
  return axiosClient
    .put(`/admin/bookings/${id}`, data)
    .then((response) => response)
    .catch((error) => {
      console.error("Error updating booking:", error);
      throw error;
    });
}

export function deleteBooking(id) {
  return axiosClient
    .delete(`/admin/bookings/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error deleting booking:", error);
      throw error;
    });
}

export function booktable(data) {
  return axiosClient
    .post("/book-table", data)
    .then((response) => response)
    .catch((error) => {
      console.error("Error booking table:", error);
      throw error;
    });
}

