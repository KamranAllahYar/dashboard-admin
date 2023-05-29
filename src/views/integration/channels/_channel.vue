<template>
  <component :is="isComponent" />
</template>
<script lang="ts" setup>
  import shopify from './components/shopify.vue';
  import clicky from './components/clicky.vue';
  import dukanify from './components/dukanify.vue';
  import { shallowRef } from 'vue';
  import { useRoute } from 'vue-router';

  const availableComponents = {
    shopify: shopify,
    clicky: clicky,
    dukanify: dukanify,
  };
  const route = useRoute();
  const channel: any = route.params.channel;

  const isComponent = shallowRef(availableComponents[channel]);
</script>
