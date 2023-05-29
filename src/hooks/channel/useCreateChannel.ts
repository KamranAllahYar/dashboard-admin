import { ref } from 'vue';

export function useCreateChannel() {
  const createFormData = ref({
    channel_name: '',
    channel_base_url: '',
    channel_logo_url: '',
    is_active: false,
  });

  return { createFormData };
}
