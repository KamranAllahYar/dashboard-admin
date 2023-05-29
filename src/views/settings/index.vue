<template>
  <n-grid :x-gap="12" :y-gap="8" cols="4 xs:2 s:2 m:2 l:4" responsive="screen">
    <n-grid-item span="1 xs:2 s:2 m:2 l:1">
      <div>
        <n-card style="border-radius: 10px">
          <n-menu
            :on-update:value="selectedAction"
            :options="menuOptions"
            :default-value="selectedOption"
            :default-expanded-keys="defaultExpandedKeys"
          />
        </n-card>
      </div>
    </n-grid-item>
    <n-grid-item span="3 xs:2 s:2 m:2 l:3">
      <div>
        <n-card style="border-radius: 10px">
          <KeepAlive>
            <general-details :id="id" v-if="selectedOption === 'company-details'" />
          </KeepAlive>
          <KeepAlive>
            <pickup-location :id="id" v-if="selectedOption === 'pickup-location'" />
          </KeepAlive>
          <KeepAlive>
            <company-users :id="id" v-if="selectedOption === 'users'" />
          </KeepAlive>
          <KeepAlive>
            <manage-mails :id="id" v-if="selectedOption === 'manage-mails'" />
          </KeepAlive>
          <KeepAlive>
            <secured-shipment :id="id" v-if="selectedOption === 'secure-shipment'" />
          </KeepAlive>
          <KeepAlive>
            <order-statuses :id="id" v-if="selectedOption === 'order-statuses'" />
          </KeepAlive>
          <KeepAlive>
            <kyc-details :id="id" v-if="selectedOption === 'kyc-details'" />
          </KeepAlive>
        </n-card>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import GeneralDetails from '@/components/AccountSetup/GeneralDetails.vue';
  import type { MenuOption } from 'naive-ui';
  import PickupLocation from '@/components/AccountSetup/PickupLocation.vue';
  import CompanyUsers from '@/components/AccountSetup/CompanyUsers.vue';
  import ManageMails from '@/components/AccountSetup/ManageMails.vue';
  import OrderStatuses from '@/components/AccountSetup/OrderStatuses.vue';
  import KycDetails from '@/components/KycDetails/KycDetails.vue';

  const selectedOption: any = ref('company-details');
  const defaultExpandedKeys = ref(['account-setup']);
  const route = useRoute();
  const id = route.query.id;
  const menuOptions: MenuOption[] = [
    {
      label: 'Account Setup',
      key: 'account-setup',
      children: [
        {
          label: 'Company Details',
          key: 'company-details',
        },
        {
          label: 'Pickup Location',
          key: 'pickup-location',
        },
        {
          label: 'Users',
          key: 'users',
        },
        {
          label: 'Manage Mails',
          key: 'manage-mails',
        },
        {
          label: 'Secure Shipment',
          key: 'secure-shipment',
        },
        {
          label: 'Order Statuses',
          key: 'order-statuses',
        },
      ],
    },
    {
      label: 'KYC Details',
      key: 'kyc-details',
    },
  ];

  const selectedAction = (key) => {
    selectedOption.value = key;
  };
</script>

<style scoped></style>
