import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useAuthStore } from "../../stores/useAuthStore";
import { usePageProductStore } from "../../stores/usePageProduct";
import { useProductStore } from "../../stores/useProductStore";



const Header = ({ logoColor = "#000" }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubMenu, setMobileSubMenu] = useState(null);
    const { pageProducts, getPageProducts } = usePageProductStore();
    const { getProducts, products, createProduct, loading, updateProduct, deleteProduct } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    // console.log(products, 'products in header');

    useEffect(() => {
        getPageProducts();
    }, [getPageProducts]);

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    return (
        <header className="w-full flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 lg:py-6 backdrop-blur-md backdrop-saturate-150 shadow-md z-50 relative">
            {/* Mobile menu button */}
            <button
                className="lg:hidden p-2 -ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? (
                    <CloseIcon style={{ fontSize: 28, color: logoColor }} />
                ) : (
                    <MenuIcon style={{ fontSize: 28, color: logoColor }} />
                )}
            </button>

            {/* Logo */}
            <Link to="/" className="lg:ml-0 ml-4">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 sm:h-8 sm:w-8"
                >
                    <path
                        d="M25.7 17.6c-.1-3.2 2.6-4.7 2.7-4.8-1.5-2.2-3.8-2.5-4.6-2.6-2-0.2-3.9 1.2-4.9 1.2-1 0-2.5-1.2-4.1-1.1-2.1.1-4.1 1.2-5.2 3-2.2 3.7-.6 9.1 1.6 12.1 1.1 1.5 2.4 3.2 4.1 3.1 1.6-.1 2.2-1 4.1-1 1.9 0 2.4 1 4.1 1 1.7 0 2.8-1.5 3.8-3 1.2-1.7 1.7-3.4 1.7-3.5 0-.1-3.2-1.2-3.3-4.7zM21.6 7.2c.9-1.1 1.5-2.6 1.3-4.2-1.3.1-2.8.9-3.7 2-0.8.9-1.5 2.5-1.2 4 .1 0 2.1-.1 3.6-1.8z"
                        fill={logoColor}
                    />
                </svg>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
                <ul className="flex gap-6 xl:gap-8 font-bold text-sm xl:text-base text-gray-400 relative">
                    <li>
                        <Link to="/" className="hover:text-blue-500 transition">Home</Link>
                    </li>
                    {[...pageProducts] // clone mảng để tránh mutate
                        .sort((a, b) => a.name.localeCompare(b.name)) // sắp xếp theo tên A-Z
                        .map((item, idx) => (
                            <li
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => setOpenMenu(idx)}
                                onMouseLeave={() => setOpenMenu(null)}
                            >
                                <Link to={item.slug} className="hover:text-blue-500 transition">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>


            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
                    <div
                        className="absolute top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                >
                                    <path
                                        d="M25.7 17.6c-.1-3.2 2.6-4.7 2.7-4.8-1.5-2.2-3.8-2.5-4.6-2.6-2-0.2-3.9 1.2-4.9 1.2-1 0-2.5-1.2-4.1-1.1-2.1.1-4.1 1.2-5.2 3-2.2 3.7-.6 9.1 1.6 12.1 1.1 1.5 2.4 3.2 4.1 3.1 1.6-.1 2.2-1 4.1-1 1.9 0 2.4 1 4.1 1 1.7 0 2.8-1.5 3.8-3 1.2-1.7 1.7-3.4 1.7-3.5 0-.1-3.2-1.2-3.3-4.7zM21.6 7.2c.9-1.1 1.5-2.6 1.3-4.2-1.3.1-2.8.9-3.7 2-0.8.9-1.5 2.5-1.2 4 .1 0 2.1-.1 3.6-1.8z"
                                        fill={logoColor}
                                    />
                                </svg>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <CloseIcon style={{ fontSize: 28, color: logoColor }} />
                            </button>
                        </div>
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex gap-6 xl:gap-8 font-bold text-sm xl:text-base text-gray-400 relative">
                                <li>
                                    <Link to="/" className="hover:text-blue-500 transition">Home</Link>
                                </li>

                                {/* Categories */}
                                {[...new Set(products.map((p) => p.category))].map((cat, idx) => (
                                    <li
                                        key={cat}
                                        className="relative"
                                        onMouseEnter={() => setOpenMenu(idx)}
                                        onMouseLeave={() => setOpenMenu(null)}
                                    >
                                        <button className="hover:text-blue-500 transition">{cat}</button>

                                        {/* Dropdown: products by category */}
                                        {openMenu === idx && (
                                            <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-56 py-2 z-50">
                                                {products
                                                    .filter((p) => p.category === cat)
                                                    .map((prod) => (
                                                        <li key={prod._id}>
                                                            <Link
                                                                to={`/products/${prod._id}`}
                                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition"
                                                            >
                                                                {prod.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    </div>
                </div>
            )}

            {/* User Actions */}
            <div className="flex gap-3 sm:gap-4 items-center text-gray-400">
                <Link to="/cart" className="p-1 sm:p-2">
                    <LocalMallIcon style={{ fontSize: 26 }} className="hover:text-blue-500 transition-colors" />
                </Link>
                <div className="relative p-1 sm:p-2">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="hover:text-blue-500 transition-colors"
                    >
                        <AccountCircleIcon style={{ fontSize: 26 }} />
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 animate-fadein">
                            <div className="px-4 py-3 border-b border-gray-100">
                                {user ? (
                                    <>
                                        <p className="text-sm text-gray-500">Xin chào, <span className="font-semibold text-gray-800">{user.name}</span></p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-500">Tài khoản</p>
                                )}
                            </div>
                            {!user && (
                                <>
                                    <Link to="/login" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200 flex items-center" onClick={() => setShowUserMenu(false)}>
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>Đăng nhập
                                    </Link>
                                    <Link to="/register" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200 flex items-center" onClick={() => setShowUserMenu(false)}>
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>Đăng ký
                                    </Link>
                                </>
                            )}
                            {user && (
                                <>
                                    <Link to="/orders" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200 flex items-center" onClick={() => setShowUserMenu(false)}>
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>Đơn mua
                                    </Link>
                                    {user.role === "admin" && (
                                        <Link to="/admin" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200 flex items-center" onClick={() => setShowUserMenu(false)}>
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg>Quản lý cửa hàng
                                        </Link>
                                    )}
                                    <button onClick={() => { logout(); setShowUserMenu(false); navigate("/"); }} className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors duration-200 flex items-center">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>Đăng xuất
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay to close dropdown when clicking outside */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </header>
    );
};

export default Header;