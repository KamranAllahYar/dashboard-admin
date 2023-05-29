import { defineStore } from 'pinia';
import { store } from '@/store';
import { getWallet, rechargeWallet } from '@/api/wallet/wallet';

export interface IWallet {
  id: number;
  balance: number;
  is_active: boolean;
  merchant_id: number;
  on_hold_balance: number;
  usable_balance: number;
}

export interface IWalletState {
  wallet: IWallet;
}

export const useWalletStore = defineStore({
  id: 'app-wallet',
  state: (): IWalletState => ({
    wallet: {
      id: 0,
      balance: 0,
      is_active: false,
      merchant_id: 0,
      on_hold_balance: 0,
      usable_balance: 0,
    },
  }),
  getters: {
    getWallet(): IWallet {
      return this.wallet;
    },
  },
  actions: {
    setWallet(wallet: IWallet) {
      this.wallet = {
        id: wallet.id,
        balance: parseFloat(wallet.balance),
        on_hold_balance: parseFloat(wallet.on_hold_balance),
        usable_balance: parseFloat(wallet.usable_balance),
        merchant_id: wallet.merchant_id,
        is_active: wallet.is_active,
      };
    },
    // get admin order status information
    GetWallet() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      return new Promise((resolve) => {
        getWallet()
          .then((res) => {
            const { result } = res;
            that.setWallet(result.data);
            resolve(result.data);
          })
          .catch((error) => {
            resolve(error);
          });
      });
    },

    async RechargeWallet(data) {
      const rechargeResponse = await rechargeWallet(data);
      this.GetWallet().then();
      return rechargeResponse;
    },
  },
});

// Need to be used outside the setup
export function useWallet() {
  return useWalletStore(store);
}
