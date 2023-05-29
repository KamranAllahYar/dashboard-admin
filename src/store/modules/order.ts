import { defineStore } from 'pinia';
import { store } from '@/store';

export const useOrderStore = defineStore({
  id: 'app-orders',
  state: () => ({
    createOrder: {
      order_type: '',
      name: '',
      phone: '',
      customer_email: '',
      customer_zipcode: '',
      customer_address: '',
      shipment_type: '',
    },
  }),
  getters: {},
  actions: {},
});

// Need to be used outside the setup
export function useOrdersStoreWidthOut() {
  return useOrderStore(store);
}
