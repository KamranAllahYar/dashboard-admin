<template>
  <n-table
    :single-line="true"
    :bordered="true"
    style="width: 100%; word-wrap: break-word; table-layout: fixed"
  >
    <thead>
      <tr>
        <th class="table_row_style"></th>
        <th class="table_row_style" style="font-weight: bold">Same City (Rs.)</th>
        <th class="table_row_style" style="font-weight: bold">Zone A (Rs.)</th>
        <th class="table_row_style" style="font-weight: bold">Zone B (Rs.)</th>
        <th class="table_row_style" style="font-weight: bold">Zone C (Rs.)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table_row_style">0.01 KG to 1.0 KG</td>
        <td class="table_row_style">80 </td>
        <td class="table_row_style">100</td>
        <td class="table_row_style">130 </td>
        <td class="table_row_style">130 </td>
      </tr>
      <tr>
        <td class="table_row_style">0.01 KG to 2.0 KG </td>
        <td class="table_row_style">110</td>
        <td class="table_row_style">110</td>
        <td class="table_row_style">145</td>
        <td class="table_row_style">145</td>
      </tr>
      <tr>
        <td class="table_row_style">0.01 KG to 3.0KG</td>
        <td class="table_row_style">125</td>
        <td class="table_row_style">130</td>
        <td class="table_row_style">155</td>
        <td class="table_row_style">155</td>
      </tr>
      <tr>
        <td class="table_row_style">Each Additional 1 KG</td>
        <td class="table_row_style">60</td>
        <td class="table_row_style">80</td>
        <td class="table_row_style">80</td>
        <td class="table_row_style">80</td>
      </tr>
      <tr>
        <td class="table_row_style" colspan="2">Fuel Surcharge 5% / GST as per LAW</td>
        <td class="table_row_style" colspan="3">YES</td>
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
