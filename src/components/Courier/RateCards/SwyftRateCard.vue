<template>
  <n-table
    :single-line="true"
    :bordered="true"
    style="width: 100%; word-wrap: break-word; table-layout: fixed"
  >
    <thead>
      <tr>
        <th class="table_row_style" style="font-weight: bold">Flat</th>
        <td class="table_row_style">Rs.140</td>
      </tr>
    </thead>
  </n-table>
</template>

<style scoped>
  .table_row_style {
    width: 200px;
    border-width: 1px;
    text-align: center;
  }
</style>
