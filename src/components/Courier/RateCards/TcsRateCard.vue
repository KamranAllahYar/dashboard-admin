<template>
  <n-table
    :single-line="true"
    :bordered="true"
    style="width: 100%; word-wrap: break-word; table-layout: fixed"
  >
    <thead>
      <tr>
        <th class="table_row_style" style="font-weight: bold">Zones</th>
        <th class="table_row_style" style="font-weight: bold">0.5KG (Rs.)</th>
        <th class="table_row_style" style="font-weight: bold">1KG (Rs.)</th>
        <th class="table_row_style" style="font-weight: bold">2KG (Rs.)</th>
        <th class="table_row_style" style="font-weight: bold">Each Additional KG (Rs.)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table_row_style">Within City</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">86</td>
      </tr>
      <tr>
        <td class="table_row_style">Same Zone</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">86</td>
      </tr>
      <tr>
        <td class="table_row_style">Different Zone</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">107</td>
        <td class="table_row_style">86</td>
      </tr>
    </tbody>
  </n-table>
</template>

<style scoped>
  .table_row_style {
    width: 200px;
    border-width: 1px;
    text-align: center;
  }
</style>
