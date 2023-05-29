<template>
  <n-space :vertical="true" style="margin-right: 30px; margin-left: 30px">
    <n-grid :x-gap="12" :y-gap="8" cols="10 xs:2 s:2 m:2 l:10" responsive="screen">
      <n-grid-item span="3 xs:2 s:2 m:2 l:3">
        <n-space :vertical="true">
          <p
            style="
              font-weight: bold;
              font-size: 16px;
              line-height: 36px;
              letter-spacing: -0.03em;
              color: rgb(38, 63, 151);
              margin: 0px;
            "
            >Balance Details</p
          >
          <n-statistic tabular-nums style="margin-top: 25px">
            {{ currency.format(walletStore.wallet.balance ? walletStore.wallet.balance : 0) }}
          </n-statistic>
          <p
            style="
              font-weight: bold;
              font-size: 16px;
              line-height: 16px;
              letter-spacing: 0.4px;
              color: rgb(159, 162, 180);
            "
          >
            Available Balance
          </p>
          <p tabular-nums style="margin-top: 25px; color: rgb(213, 0, 0); font-size: 24px">
            {{
              currency.format(
                walletStore.wallet.on_hold_balance ? walletStore.wallet.on_hold_balance : 0
              )
            }}
          </p>
          <div style="display: flex; flex-direction: row">
            <p
              style="
                margin-top: 9px;
                font-weight: bold;
                font-size: 16px;
                line-height: 16px;
                letter-spacing: 0.4px;
                color: rgb(213, 0, 0);
              "
            >
              Hold Balance
            </p>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button quaternary circle type="error">
                  <template #icon>
                    <n-icon><info-circle-outlined /></n-icon>
                  </template>
                </n-button>
              </template>
              Holding balance will be updated based on dispute resolution. Please check weight
              reconciliation section in manage finance page for status.
            </n-tooltip>
          </div>

          <p tabular-nums style="margin-top: 25px; color: rgb(101, 191, 115); font-size: 24px">
            {{
              currency.format(
                walletStore.wallet.usable_balance ? walletStore.wallet.usable_balance : 0
              )
            }}
          </p>
          <p
            style="
              font-weight: bold;
              font-size: 16px;
              line-height: 16px;
              letter-spacing: 0px;
              color: rgb(101, 191, 115);
            "
          >
            Usable Balance
          </p>
          <img
            src="https://d10srchmli830n.cloudfront.net/1640599733904_pana.svg"
            style="width: 150px; margin-top: 30px"
          />
          <p
            @click="showTermsAndCondition = !showTermsAndCondition"
            style="
              font-weight: bold;
              color: rgb(38, 63, 151);
              margin: 10px 0px;
              cursor: pointer;
              text-decoration: underline;
            "
            >TERMS & CONDITIONS</p
          >
        </n-space>
      </n-grid-item>
      <n-grid-item span="1 xs:2 s:2 m:2 l:1">
        <n-divider :vertical="true" style="width: 1px; height: 100%" />
      </n-grid-item>

      <n-grid-item span="6 xs:2 s:2 m:2 l:6">
        <p
          style="
            font-weight: bold;
            font-size: 16px;
            line-height: 36px;
            letter-spacing: -0.03em;
            color: rgb(38, 63, 151);
            margin: 0px;
          "
        >
          Recharge your WeShip Wallet</p
        >
        <n-card style="border-radius: 10px; background-color: rgb(237, 240, 249)">
          <n-space :vertical="true">
            <p
              style="
                font-weight: 600;
                font-size: 14px;
                letter-spacing: -0.01em;
                color: rgb(38, 63, 151);
              "
            >
              Select amount for quick recharge</p
            >
            <n-space justify="center">
              <n-button
                round
                type="info"
                style="background-color: #ffffff; color: #2b85e4"
                @click="changeRechargeAmount(200)"
              >
                PKR 200
              </n-button>
              <n-button
                round
                type="info"
                style="background-color: #ffffff; color: #2b85e4"
                @click="changeRechargeAmount(500)"
              >
                PKR 500
              </n-button>
              <n-button
                round
                type="info"
                style="background-color: #ffffff; color: #2b85e4"
                @click="changeRechargeAmount(1000)"
              >
                PKR 1,000
              </n-button>
              <n-button
                round
                type="info"
                style="background-color: #ffffff; color: #2b85e4"
                @click="changeRechargeAmount(5000)"
              >
                PKR 5,000
              </n-button>
            </n-space>
            <n-form
              label-width="auto"
              ref="formRef"
              style="margin-top: 5px"
              :model="formValue"
              :rules="rules"
              label-placement="top"
              size="medium"
            >
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  margin-bottom: 5px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                Or enter your amount to recharge</p
              >
              <n-form-item path="recharge_amount" :show-label="false" style="margin-bottom: 0px">
                <n-input
                  v-model:value="formValue.recharge_amount"
                  placeholder="Minimum Recharge PKR200"
                  @change="changeRechargeAmount"
                />
              </n-form-item>
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  margin-bottom: 5px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                Have a coupon? Enter code to validate</p
              >
              <n-space style="gap: 0px 0px">
                <n-form-item path="recharge_amount" :show-label="false" style="margin-bottom: 0px">
                  <n-input v-model:value="formValue.coupon" placeholder="" />
                </n-form-item>
                <n-button type="info" style="background-color: #ffffff; color: #2b85e4">
                  Validate
                </n-button>
              </n-space>
            </n-form>
            <n-space justify="space-between">
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
                >Recharge Amount</p
              >
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                {{ currency.format(formValue.recharge_amount) }}
              </p>
            </n-space>
            <n-space justify="space-between">
              <n-space :vertical="true" style="gap: 0px 0px">
                <p
                  style="
                    font-weight: 600;
                    font-size: 14px;
                    letter-spacing: -0.01em;
                    color: rgb(38, 63, 151);
                  "
                  >Bonus Amount (0%)</p
                >
                <p
                  style="
                    font-size: 12px;
                    letter-spacing: -0.01em;
                    color: rgb(38, 63, 151);
                    opacity: 0.6;
                  "
                  >Added to the wallet after successful recharge</p
                >
              </n-space>
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                {{ currency.format(formValue.bonus_amount) }}
              </p>
            </n-space>
            <n-space justify="space-between">
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
                >Amount to be paid</p
              >
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                {{ currency.format(formValue.amount_to_be_paid) }}
              </p>
            </n-space>

            <n-button
              type="info"
              :disabled="!formValue.amount_to_be_paid"
              style="width: 100%"
              @click="walletDeposit()"
            >
              RECHARGE NOW
            </n-button>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-collapse-transition :show="showTermsAndCondition">
      <n-space :vertical="true">
        <p style="font-size: 14px; color: rgb(38, 63, 151); letter-spacing: 0.01em"
          >Minimum recharge amount is PKR 200</p
        >
        <p style="font-size: 14px; color: rgb(38, 63, 151); letter-spacing: 0.01em"
          >WeShip Credits value is the same as that of Pakistani Rupee i.e. 1 WeShip Credit = PKR
          1</p
        >
        <p style="font-size: 14px; color: rgb(38, 63, 151); letter-spacing: 0.01em"
          >WeShip Credits are valid on all transactions and bills on www.WeShip.pk</p
        >
        <p style="font-size: 14px; color: rgb(38, 63, 151); letter-spacing: 0.01em"
          >WeShip Credits are refundable to users. For refund, please connect with us at
          support@WeShip.pk. Please note, the refund of credits earned on wallet recharge will be as
          per ledger details.</p
        >
      </n-space>
    </n-collapse-transition>

    <n-modal v-model:show="showWalletRechargeModal" preset="dialog" style="width: 50%">
      <template #header>
        <div>Choose a Payment Method</div>
      </template>
      <n-space :vertical="true">
        <wallet-recharge
          :amount="formValue.recharge_amount"
          @created="showWalletRechargeModal = false"
        />
      </n-space>
    </n-modal>
  </n-space>
</template>
<script lang="ts" setup>
  import { InfoCircleOutlined } from '@vicons/antd';
  import { ref } from 'vue';
  import { useWalletStore } from '@/store/modules/wallet';
  import { useCurrency } from '@/hooks/useCurrency';

  const showTermsAndCondition = ref(false);
  const showWalletRechargeModal = ref(false);
  const walletStore = useWalletStore();
  const currency = useCurrency();

  const formValue: any = ref({
    bonus_amount: 0,
    recharge_amount: 0,
    amount_to_be_paid: 0,
  });

  const rules = [];

  function changeRechargeAmount(amount) {
    if (amount) {
      formValue.value.recharge_amount = amount;
      formValue.value.amount_to_be_paid =
        parseFloat(formValue.value.bonus_amount) + parseFloat(amount);
    } else {
      formValue.value.amount_to_be_paid = 0;
    }
  }
  function walletDeposit() {
    showWalletRechargeModal.value = true;
  }
</script>
