import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[],
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
  },
  actions: {
    addItem(item: { id: string; name: string; price: number }) {
      const existingItem = this.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem(itemId: string) {
      this.items = this.items.filter((i) => i.id !== itemId);
      //   const index = this.items.findIndex((i) => i.id === itemId);
      //   if (index !== -1) {
      //     this.items.splice(index, 1);
      //   }
    },
    clearCart() {
      this.items = [];
    },
    confirmOrder() {
      alert("สั่งซื้อสินค้าสำเร็จ");
      this.clearCart();
    },
  },
});
