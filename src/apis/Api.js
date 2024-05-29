import axios from "axios";

// creating backend Config!
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    }
})

// Test API
export const testApi = () => Api.get("/test")

// Resgister Api
export const registerUserApi = (data) => Api.post("/api/user/create", data)

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data)

// Create product API
export const createProductApi = (data) => Api.post("/api/product/create", data)

// get all products API
export const getAllProductsApi = () => Api.get("/api/product/get_all_products")

// http://localhost:5000/test