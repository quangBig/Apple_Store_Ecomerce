import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../../../stores/useAuthStore';
import { toast } from 'react-toastify';

const GoogleLoginButton = () => {
    const loginWithGoogle = useAuthStore(state => state.loginWithGoogle);
    const loading = useAuthStore(state => state.loading);

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="w-full">
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        try {
                            await loginWithGoogle(credentialResponse.credential);
                        } catch (error) {
                            console.error('Google login error:', error);
                            toast.error('Đăng nhập Google thất bại');
                        }
                    }}
                    onError={() => {
                        toast.error('Đăng nhập Google thất bại');
                    }}
                    useOneTap
                    auto_select
                    theme="outline"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                    width="100%"
                    disabled={loading}
                    className={`
                        w-full
                        rounded-xl
                        shadow-md
                        hover:shadow-lg
                        transition-all
                        duration-300
                        transform
                        hover:-translate-y-0.5
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-blue-500
                        border-2
                        border-gray-200
                        hover:border-blue-400
                        bg-white
                        text-gray-700
                        font-semibold
                        text-lg
                        h-14
                        ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                    logo_alignment="left"
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;