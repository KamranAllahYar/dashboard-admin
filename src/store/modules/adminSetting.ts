import { defineStore } from 'pinia';
import { getOrderStatus } from '@/api/order';
import { store } from '@/store';

export interface IOrderStatus {
  id: number;
  status: string;
  masking: string;
  position: number;
}
export interface IAdminSettings {
  orderStatuses: IOrderStatus[] | [];
}

export const useAdminSettingStore = defineStore({
  id: 'app-admin-settings',
  state: (): IAdminSettings => ({
    orderStatuses: [],
  }),
  getters: {
    getOrderStatuses(): IOrderStatus[] {
      return this.orderStatuses;
    },
  },
  actions: {
    setOrderStatuses(orderStatuses: IOrderStatus[]) {
      this.orderStatuses = orderStatuses;
    },
    // get admin order status information
    GetAdminOrderStatuses() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      return new Promise((resolve) => {
        getOrderStatus()
          .then((res) => {
            const { result } = res;
            that.setOrderStatuses(result.data);
            resolve(result.data);
          })
          .catch((error) => {
            resolve(error);
          });
      });
    },
  },
});
// Need to be used outside the setup
export function useAdminStore() {
  return useAdminSettingStore(store);
}
