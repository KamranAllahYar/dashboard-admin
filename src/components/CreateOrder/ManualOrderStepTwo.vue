<template>
  <n-space :vertical="true" :style="{ display: props.activeStep === 2 ? 'initial' : 'none' }">
    <n-card
      style="
        border-radius: 10px;
        margin-top: 10px;
        border-width: 1px;
        display: flex;
        justify-items: center;
      "
    >
      <div style="display: flex; justify-content: center">
        <n-steps :current="2" size="small">
          <n-step title="Order Details" />
          <n-step title="Add items & Quality check" />
          <n-step title="Review & Courier Partner" />
          <n-step title="Submit Order" />
        </n-steps>
      </div>
    </n-card>
    <n-grid :x-gap="12" :y-gap="8" cols="5 xs:2 s:2 m:2 l:5" responsive="screen">
      <n-grid-item span="3 xs:2 s:2 m:2 l:3">
        <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px">
          <div>
            <n-space :vertical="true">
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Enter Item Details</n-h6>
              <div v-for="(item, index) in stepTwo.order_items" :key="index">
                <n-form
                  :ref="
                    (el) => {
                      itemsRef[index] = el;
                    }
                  "
                  :rules="rules"
                  :model="item"
                  size="medium"
                  label-placement="top"
                >
                  <n-grid :x-gap="8" cols="8 l:8" responsive="screen">
                    <n-form-item-gi
                      span="3"
                      label="Item Name"
                      path="item_name"
                      style="margin-left: 5px"
                    >
                      <n-input v-model:value="item.item_name" placeholder="Item Name" />
                    </n-form-item-gi>
                    <n-form-item-gi span="2" label="Variant Title" path="variant_title">
                      <n-input v-model:value="item.variant_title" placeholder="Variant Title" />
                    </n-form-item-gi>
                    <n-form-item-gi span="2" label="SKU" path="sku" style="margin-right: 5px">
                      <n-input v-model:value="item.sku" placeholder="SKU" />
                    </n-form-item-gi>

                    <n-form-item-gi
                      span="1"
                      style="align-items: flex-end; justify-content: center; display: flex"
                    >
                      <n-button
                        :strong="true"
                        :secondary="true"
                        :circle="true"
                        style="align-self: end"
                        type="error"
                        v-if="stepTwo.order_items.length > 1"
                        @click="deleteItem(index)"
                      >
                        <template #icon>
                          <n-icon>
                            <delete-outlined />
                          </n-icon>
                        </template>
                      </n-button>
                    </n-form-item-gi>
                  </n-grid>
                  <n-grid cols="8">
                    <n-form-item-gi
                      span="2"
                      label="Quantity"
                      path="quantity"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input
                        v-model:value="item.quantity"
                        @change="updateUnitPrice(index)"
                        placeholder="Quantity"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi
                      span="2"
                      label="Item Price"
                      path="unit_price"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input
                        v-model:value.number="item.unit_price"
                        @change="updateUnitPrice(index)"
                        placeholder="Item Price"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi
                      span="2"
                      label="Item Tax %"
                      path="total_tax_percentage"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input
                        v-model:value="item.total_tax_percentage"
                        @change="updateUnitTax(index)"
                        placeholder="Item Tax %"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi
                      span="1"
                      label="Price with Tax"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input
                        :disabled="true"
                        v-model:value="item.unit_price_with_taxes"
                        placeholder="Price with Tax"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi
                      span="1"
                      label="SubTotal"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input
                        :disabled="true"
                        v-model:value="item.item_subtotal"
                        placeholder="SubTotal"
                      />
                    </n-form-item-gi>
                  </n-grid>
                  <n-grid cols="8">
                    <n-form-item-gi
                      span="2"
                      label="Item Height (cm)"
                      path="item_height"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input v-model:value="item.item_height" placeholder="Item Height (cm)" />
                    </n-form-item-gi>
                    <n-form-item-gi
                      span="2"
                      label="Item Length (cm)"
                      path="item_length"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input v-model:value="item.item_length" placeholder="Item Length (cm)" />
                    </n-form-item-gi>
                    <n-form-item-gi
                      span="2"
                      label="Item Breadth (cm)"
                      path="item_breadth"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input v-model:value="item.item_breadth" placeholder="Item Breadth (cm)" />
                    </n-form-item-gi>
                    <n-form-item-gi
                      span="2"
                      label="Item Weight (Kg)"
                      path="item_weight"
                      style="margin-left: 5px; margin-right: 5px"
                    >
                      <n-input
                        v-model:value.number="item.item_weight"
                        @change="addWeight"
                        placeholder="Item Weight (Kg)"
                      />
                    </n-form-item-gi>
                  </n-grid>
                </n-form>
                <n-divider style="margin-top: 0px; border-width: 1px" />
              </div>

              <n-button
                type="success"
                style="font-weight: bold; border-radius: 10px"
                @click="addNewItem()"
                >Add</n-button
              >
            </n-space>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="2 xs:2 s:2 m:2 l:2">
        <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px">
          <n-space style="width: 100%; display: flex" :vertical="true">
            <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)"
              >Complete Shipment Details
            </n-h6>
            <n-form
              label-width="auto"
              label-placement="left"
              ref="formRef"
              :model="stepTwo"
              :rules="rules"
              size="medium"
            >
              <n-form-item-gi label="Weight (Kg)">
                <n-input
                  v-model:value="stepTwo.shipment_weight"
                  placeholder="Weight (Kg)"
                  :disabled="true"
                />
              </n-form-item-gi>
              <n-form-item-gi label="Invoice Value">
                <n-input
                  v-model:value="stepTwo.shipment_amount"
                  placeholder="Invoice Value"
                  :disabled="true"
                />
              </n-form-item-gi>
              <n-form-item-gi label="Client Order ID" path="client_order_id">
                <n-input v-model:value="stepTwo.client_order_id" placeholder="Client Order ID" />
              </n-form-item-gi>
            </n-form>
            <n-space :vertical="true">
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Dimensions (cm)</n-h6>
              <n-form
                ref="formRefTwo"
                :model="stepTwo"
                :rules="rules"
                size="medium"
                label-placement="top"
              >
                <n-grid :x-gap="6" cols="6 l:6" responsive="screen">
                  <n-form-item-gi span="2" label="Length" path="shipment_length">
                    <n-input v-model:value="stepTwo.shipment_length" placeholder="Length" />
                  </n-form-item-gi>
                  <n-form-item-gi span="2" label="Breadth" path="shipment_breadth">
                    <n-input v-model:value="stepTwo.shipment_breadth" placeholder="Breadth" />
                  </n-form-item-gi>
                  <n-form-item-gi span="2" label="Height" path="shipment_height">
                    <n-input v-model:value="stepTwo.shipment_height" placeholder="Height" />
                  </n-form-item-gi>
                </n-grid>
              </n-form>
            </n-space>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-card style="border-radius: 10px; margin-bottom: 40px; margin-top: 10px; border-width: 1px">
      <n-space style="display: flex; justify-content: space-between; align-items: center">
        <!--        <n-button-group>-->
        <n-button type="info" style="font-weight: bold; border-radius: 10px" @click="resetData">
          Reset
        </n-button>

        <div style="align-items: center">
          <n-button-group>
            <n-button
              color="#8a2be2"
              icon-placement="left"
              v-if="currentRef === 2"
              @click="prev"
              type="info"
              style="font-weight: bold; border-radius: 10px"
            >
              Back
            </n-button>
            <span style="width: 10px"></span>
            <n-button
              icon-placement="right"
              @click="next"
              type="info"
              style="font-weight: bold; border-radius: 10px; margin-left: 10px"
            >
              Next
            </n-button>
          </n-button-group>
        </div>
        <!--        </n-button-group>-->
      </n-space>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { useManualOrder } from '@/hooks/order/useManualOrder';
  import { ref } from 'vue';
  import { DeleteOutlined } from '@vicons/antd';
  import { FormInst, FormItemRule } from 'naive-ui';

  const itemsRef = ref<FormInst[] | []>([]);
  const formRef = ref<FormInst | null>(null);
  const formRefTwo = ref<FormInst | null>(null);
  let currentRef = ref<Number | null>(2);
  const { stepTwo } = useManualOrder();
  const props = defineProps({
    activeStep: {
      type: Number,
      default: 0,
    },
  });
  const newObject = {
    cgst_per: 0,
    igst_per: 0,
    sgst_per: 0,
    ugst_per: 0,
    item_breadth: 0,
    item_height: 0,
    item_length: 0,
    variant_title: '',
    total_tax_percentage: 0,
    unit_price_with_taxes: 0,
    item_name: null,
    item_weight: 0,
    quantity: 0,
    sku: null,
    unit_price: 0,
    item_subtotal: 0,
  };
  const rules = {
    item_name: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Name is required',
    },
    variant_title: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Variant title is required',
    },
    quantity: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Quantity is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Quantity should be an integer');
        }
        return true;
      },
    },
    sku: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'SKU is required',
    },
    unit_price: {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Price is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Price should be a number');
        }
        return true;
      },
      trigger: ['blur', 'input'],
    },
    total_tax_percentage: {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Tax is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Tax should be a number');
        }
        return true;
      },
      trigger: ['blur', 'input'],
    },
    shipment_weight: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Weight is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Weight should be a number');
        }
        return true;
      },
      message: 'Weight is required',
    },
    shipment_amount: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Invoice value is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Invoice value should be a number');
        }
        return true;
      },
    },
    shipment_length: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Length is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Length should be a number');
        }
        return true;
      },
    },
    shipment_breadth: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Breadth is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Breadth should be a number');
        }
        return true;
      },
    },
    shipment_height: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Height is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Height should be a number');
        }
        return true;
      },
    },
    client_order_id: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Client order ID is required',
    },
    item_length: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Length is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Length should be a number');
        }
        return true;
      },
    },
    item_height: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Height is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Height should be a number');
        }
        return true;
      },
    },
    item_breadth: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Breadth is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Breadth should be a number');
        }
        return true;
      },
    },
    item_weight: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Weight is required');
        } else if (!/^\d*$/.test(value) && !/^[-+]?[0-9]+\.[0-9]+$/.test(value)) {
          return new Error('Weight should be a number');
        }
        return true;
      },
    },
  };

  const emits = defineEmits(['stepTwoOrder', 'back']);

  function resetData() {
    stepTwo.value = {
      shipment_weight: 0,
      shipment_amount: 0,
      shipping_charge: 20,
      shipment_discount: 10,
      shipment_length: null,
      shipment_breadth: null,
      shipment_height: null,
      client_order_id: null,
      order_items: [
        {
          cgst_per: 0,
          igst_per: 0,
          sgst_per: 0,
          ugst_per: 0,
          item_breadth: 0,
          item_height: 0,
          item_length: 0,
          variant_title: '',
          total_tax_percentage: 0,
          unit_price_with_taxes: 0,
          item_name: null,
          item_weight: 0,
          quantity: 0,
          sku: null,
          unit_price: 0,
          item_subtotal: 0,
        },
      ],
    };
  }

  async function next() {
    let hasError = false;
    for (const itemRef of itemsRef.value) {
      await itemRef?.validate((error) => {
        if (error) {
          window['$message'].error('Please fill out required fields');
          hasError = true;
          return;
        }
      });
    }
    if (!hasError) {
      await formRef.value?.validate((error) => {
        if (error) {
          window['$message'].error('Please fill out required fields');
          hasError = true;
          return;
        }
      });
    }

    if (!hasError) {
      await formRefTwo.value?.validate((error) => {
        if (error) {
          window['$message'].error('Please fill out required fields');
          hasError = true;
          return;
        }
      });
    }

    if (!hasError) {
      // console.log('no errors submited');
      emits('stepTwoOrder', stepTwo.value);
    }
  }

  function prev() {
    emits('back');
  }

  function deleteItem(index) {
    stepTwo.value.order_items.splice(index, 1);
  }

  function addNewItem() {
    stepTwo.value.order_items.push({ ...newObject });
  }

  function updateUnitPrice(index) {
    let i = 0;
    stepTwo.value.shipment_amount = 0;
    stepTwo.value.order_items[index].unit_price_with_taxes = 0;
    stepTwo.value.order_items[index].unit_price_with_taxes =
      parseFloat(stepTwo.value.order_items[index].unit_price) +
      parseFloat(
        (stepTwo.value.order_items[index].total_tax_percentage / 100) *
          stepTwo.value.order_items[index].unit_price
      );
    stepTwo.value.order_items[index].item_subtotal =
      parseFloat(stepTwo.value.order_items[index].quantity) *
      parseFloat(stepTwo.value.order_items[index].unit_price_with_taxes);
    while (i < stepTwo.value.order_items.length) {
      stepTwo.value.shipment_amount += parseFloat(stepTwo.value.order_items[i].item_subtotal);
      i++;
    }
  }
  function updateUnitTax(index) {
    let i = 0;
    stepTwo.value.shipment_amount = 0;
    stepTwo.value.order_items[index].unit_price_with_taxes = 0;
    stepTwo.value.order_items[index].unit_price_with_taxes =
      parseFloat(stepTwo.value.order_items[index].unit_price) +
      parseFloat(
        (stepTwo.value.order_items[index].total_tax_percentage / 100) *
          stepTwo.value.order_items[index].unit_price
      );
    stepTwo.value.order_items[index].item_subtotal =
      parseFloat(stepTwo.value.order_items[index].quantity) *
      parseFloat(stepTwo.value.order_items[index].unit_price_with_taxes);
    while (i < stepTwo.value.order_items.length) {
      stepTwo.value.shipment_amount += parseFloat(stepTwo.value.order_items[i].item_subtotal);
      i++;
    }
  }

  function addWeight() {
    let i = 0;
    stepTwo.value.shipment_weight = 0;
    while (i < stepTwo.value.order_items.length) {
      stepTwo.value.shipment_weight +=
        parseFloat(stepTwo.value.order_items[i].quantity) *
        parseFloat(stepTwo.value.order_items[i].item_weight);
      i++;
    }
  }
</script>
