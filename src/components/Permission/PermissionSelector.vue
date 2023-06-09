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
    :loading="permissionsLoading"
    :options="filteredPermissions"
    @search="filterPermissions"
  />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { usePermissions } from '@/hooks/acl/usePermissions';

  export default defineComponent({
    props: {
      modelValue: {
        type: [String, Array, Object, Number, Boolean],
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
        default: 'Search Permissions',
      },
      clearable: {
        type: Boolean,
        default: true,
      },
      multiple: {
        type: Boolean,
        default: true,
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
      const { filterPermissions, filteredPermissions, permissionsLoading } = usePermissions(
        props.tag
      );
      const selectValue = ref(null);
      return {
        filterPermissions,
        filteredPermissions,
        permissionsLoading,
        selectValue,
      };
    },
    watch: {
      modelValue: function (value) {
        this.selectValue = value;
      },
    },
    methods: {
      onChangeValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  });
</script>
