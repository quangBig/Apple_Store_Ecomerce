import { toast } from "react-toastify";
import { persist } from "zustand/middleware";
import axios from "../lib/axios";
import { create } from "zustand";

export interface PageProduct {
    _id: string;
    name: string;
    slug: string;
    image: string;
    crteatedAt: string;
    updatedAt: string;
}
interface PageProductState {
    pageProducts: PageProduct[];
    loading: boolean;
    createPageProduct: (data: Partial<PageProduct>) => Promise<void>;
    getPageProducts: () => Promise<void>;
    getPageProductById: (id: string) => Promise<void>;
    updatePageProduct: (id: string, data: Partial<PageProduct>) => Promise<void>;
    deletePageProduct: (id: string) => Promise<void>;
}

export const usePageProductStore = create<PageProductState>()(
    persist(
        (set, get) => ({
            pageProducts: [],
            loading: false,
            createPageProduct: async (data) => {
                set({ loading: true });
                try {
                    const res = await axios.post("/page-products", data);
                    set((state) => ({
                        pageProducts: [...state.pageProducts, res.data],
                        loading: false
                    }));
                    toast.success("Tạo trang sản phẩm thành công");
                } catch (err) {
                    set({ loading: false });
                    toast.error("Tạo trang sản phẩm thất bại " + err.message);
                }
            },
            getPageProducts: async () => {
                set({ loading: true });
                try {
                    const res = await axios.get("/page-products");
                    set({ pageProducts: res.data, loading: false });
                } catch (err) {
                    set({ loading: false });
                    toast.error("Lấy danh sách trang sản phẩm thất bại " + err.message);
                }
            },
            getPageProductById: async (id: string) => {
                set({ loading: true });
                try {
                    const res = await axios.get(`/page-products/${id}`);
                    set({ loading: false });
                    return res.data;
                } catch (err) {
                    set({ loading: false });
                    toast.error("Lấy trang sản phẩm thất bại " + err.message);
                }
            },
            updatePageProduct: async (id: string, data) => {
                set({ loading: true });
                try {
                    const res = await axios.put(`/page-products/${id}`, data);
                    set((state) => ({
                        pageProducts: state.pageProducts.map((pageProduct) =>
                            pageProduct._id === id ? res.data : pageProduct
                        ),
                        loading: false
                    }));
                    toast.success("Cập nhật trang sản phẩm thành công");
                } catch (err) {
                    set({ loading: false });
                    toast.error("Cập nhật trang sản phẩm thất bại " + err.message);
                }
            },
            deletePageProduct: async (id: string) => {
                set({ loading: true });
                try {
                    await axios.delete(`/page-products/${id}`);
                    set((state) => ({
                        pageProducts: state.pageProducts.filter((pageProduct) => pageProduct._id !== id),
                        loading: false
                    }));
                    toast.success("Xoá trang sản phẩm thành công");
                } catch (err) {
                    set({ loading: false });
                    toast.error("Xoá trang sản phẩm thất bại " + err.message);
                }
            }
        }),
        { name: "page-products-store" }
    )
)