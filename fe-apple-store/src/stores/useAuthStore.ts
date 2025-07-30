import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../lib/axios";
import { ToastContainer, toast } from 'react-toastify';

export interface User {
    _id: string;
    lastname: string;
    name: string;
    email: string;
    phonenumber: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    checkingAuth: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

interface RegisterData {
    lastname: string;
    name: string;
    email: string;
    phonenumber: string;
    password: string;
    confirmpassword: string;
}

export const useAuthStore = create<AuthState, [['zustand/persist', AuthState]]>(
    persist<AuthState>(
        (set, get) => ({
            user: null,
            token: null,
            loading: false,
            checkingAuth: false,
            login: async (email, password) => {
                set({ loading: true });
                try {
                    const res = await axios.post("/auth/login", { email, password });
                    const { access_token } = res.data;
                    set({ token: access_token });
                    // Lấy profile
                    const profileRes = await axios.get("/auth/profile", {
                        headers: { Authorization: `Bearer ${access_token}` }
                    });
                    set({ user: profileRes.data, loading: false });
                    toast.success("Đăng nhập thành công")

                } catch (error: any) {
                    set({ loading: false });
                    throw error;
                }
            },
            register: async (data) => {
                set({ loading: true });
                try {
                    await axios.post("/auth/register", data);
                    set({ loading: false });
                    toast.success("Đăng ký thành công");
                } catch (error: any) {
                    set({ loading: false });

                    const msg = error?.response?.data?.message;
                    if (Array.isArray(msg)) {
                        toast.error(msg.join(", "));
                    } else {
                        toast.error(msg || "Lỗi đăng ký");
                    }

                    throw error;
                }
            },
            logout: () => {
                set({ user: null, token: null });
                toast.success("Đăng xuất thành công");
            },
            checkAuth: async () => {
                set({ checkingAuth: true });
                const token = get().token;
                if (!token) {
                    set({ user: null, checkingAuth: false });
                    return;
                }
                try {
                    const response = await axios.get("/auth/profile", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    set({ user: response.data, checkingAuth: false });
                } catch (error) {
                    set({ user: null, checkingAuth: false });
                }
            },
        }),
        {
            name: "auth-store",
        }
    )
);