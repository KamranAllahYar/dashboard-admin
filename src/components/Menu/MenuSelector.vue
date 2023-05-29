<template>
  <n-select
    :multiple="multiple"
    :filterable="true"
    :tag="tag"
    :placeholder="placeholder"
    :on-update:value="onChangeValue"
    v-model:value="selectValue"
    :clearable="clearable"
    :remote="true"
    :clear-filter-after-select="false"
    :size="size"
    :label-field="labelField"
    :value-field="valueField"
    :loading="menusLoading"
    :options="filteredMenus"
    @search="filterMenus"
  />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useMenus } from '@/hooks/menu/useMenus';

  export default defineComponent({
    props: {
      modelValue: {
        type: [String, Array, Object, Number, Boolean],
      },
      prePopulateMenu: {
        type: Object,
        default: null,
      },
      labelField: {
        type: String,
        default: 'name',
      },
      size: {
        type: String,
        default: 'small',
      },
      placeholder: {
        type: String,
        default: 'Search Menus',
      },
      clearable: {
        type: Boolean,
        default: true,
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      tag: {
        type: Boolean,
        default: false,
      },
      valueField: {
        type: String,
        default: 'id',
      },
    },
    emits: ['update:modelValue'],
    setup(props) {
      const { filterMenus, filteredMenus, menusLoading } = useMenus(props.tag);
      if (props.prePopulateMenu) {
        if (!filteredMenus.value.some((menu) => menu.id === props.prePopulateMenu.id)) {
          filteredMenus.value.unshift(props.prePopulateMenu);
        }
      }
      const selectValue = ref(null);
      return {
        filterMenus,
        filteredMenus,
        menusLoading,
        selectValue,
      };
    },
    watch: {
      modelValue: function (value) {
        this.selectValue = value;
      },

      prePopulateMenu: function (value) {
        if (value) {
          if (!this.filteredMenus.some((menu) => menu.id === value.id)) {
            setTimeout(() => {
              this.filteredMenus.unshift(value);
            }, 700);
          }
        }
      },
    },
    methods: {
      onChangeValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  });
</script>
