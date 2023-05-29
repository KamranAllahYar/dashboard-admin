import { ref } from 'vue';

export function useCreateCourier() {
  const createFormData = ref({
    name: '',
    is_active: false,
    meta_data_parameters: [{ key: '', value: '' }],
  });

  return { createFormData };
}
