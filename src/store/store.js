import create from 'zustand';

export const useStore = create((set) => ({
    loginStatus : null,
    token: "",
    setLoginStatus: (status) => set({ loginStatus : status }),
    setToken: (tokenString) => set({ token : tokenString })
}));