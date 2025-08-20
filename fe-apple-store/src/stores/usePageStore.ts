import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Page {
    _id: string;
    title: string;
    decs: string;
    imgae: string;
    link: string;
    createdAt?: string;
    updatedAt?: string;
}

interface PageState {
    pages: Page[];
    loading: boolean;
    createPage: (data: Partial<Page>) => Promise<void>;
    getPages: () => Promise<void>;
    getPageById: (id: string) => Promise<Page>;
    updatePage: (id: string, data: Partial<Page>) => Promise<void>;
    deletePage: (id: string) => Promise<void>;
}

export const usePageStore = create<PageState>()(
    persist(
        (set, get) => ({
            pages: [],
            loading: false,
            createPage: async (data) => {
                set({ loading: true });
                try {
                    const res = await axios.post("/pages", data);
                    set((state) => ({
                        pages: [...state.pages, res.data],
                        loading: false
                    }));
                    toast.success("Tạo trang thành công");
                } catch (err) {
                    set({ loading: false });
                    toast.error("Tạo trang thất bại");
                }
            },
            getPages: async () => {
                set({ loading: true });
                try {
                    const res = await axios.get("/pages");
                    set({ pages: res.data, loading: false });
                } catch (err) {
                    set({ loading: false });
                    toast.error("Lấy danh sách trang thất bại");
                }
            },
            getPageById: async (id: string) => {
                set({ loading: true });
                try {
                    const res = await axios.get(`/pages/${id}`);
                    set({ loading: false });
                    return res.data;
                } catch (err) {
                    set({ loading: false });
                    toast.error("Không tìm thấy trang");
                    throw err;
                }
            },
            updatePage: async (id: string, data) => {
                set({ loading: true });
                try {
                    const res = await axios.put(`/pages/${id}`, data);
                    set((state) => ({
                        pages: state.pages.map((page) =>
                            page._id === id ? res.data : page
                        ),
                        loading: false
                    }));
                    toast.success("Cập nhật trang thành công");
                } catch (err) {
                    set({ loading: false });
                    toast.error("Cập nhật trang thất bại");
                }
            },
            deletePage: async (id: string) => {
                set({ loading: true });
                try {
                    await axios.delete(`/pages/${id}`);
                    set((state) => ({
                        pages: state.pages.filter((page) => page._id !== id),
                        loading: false
                    }));
                    toast.success("Xóa trang thành công");
                } catch (err) {
                    set({ loading: false });
                    toast.error("Xóa trang thất bại");
                }
            },
        }),
        { name: "page-store" }
    )
);