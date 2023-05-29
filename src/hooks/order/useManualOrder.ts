import { ref } from 'vue';

export function useManualOrder() {
  const stepOne = ref({
    order_place_type: 'forward',
    order_type: 'express',
    country_code: '+92',
    name: 'rashid',
    phone: '3037761164',
    email: 'rashid@gmail.com',
    zip_code: '123123',
    address1: 'phase 8',
    payment_method: 'cod',
    city: 'Lahore',
    country: 'Pakistan',
    state: 'Punjab',
    multi_package_service: false,
    total_boxes: '1',
    shipping_address_id: null,
    placed_on_weship: true,
  });
  const stepTwo = ref({
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
  });
  const stepThree = ref({
    merchant_courier_id: null,
    courier_name: null,
  });
  return { stepOne, stepTwo, stepThree };
}
