import create from 'zustand';

export const useStore = create((set) => ({
    loginStatus : null,
    token: "",
    email: "",
    setUserEmail: (user) => set({ email : user}),
    setLoginStatus: (status) => set({ loginStatus : status }),
    setToken: (tokenString) => set({ token : tokenString })
}));

export const inventoryStore = create((set) => ({
    inventoryList : [],
    addInvenotry : (inventory) => set((state) => ({
        inventoryList: [
            ...state.inventoryList,{
                InventoryName : inventory.InventoryName,
                Description : inventory.Description,
                SKU : inventory.SKU,
                Category : inventory.Category,
                Quantity : inventory.Quantity
            }
        ]
    })),
    setInventoryList: (invList) => set({inventoryList : invList})
}))