<template>
  <n-table
    :single-line="true"
    :bordered="true"
    style="width: 100%; word-wrap: break-word; table-layout: fixed"
  >
    <thead>
      <tr>
        <th rowspan="2" colspan="2" class="table_header_style" style="font-weight: bold"
          >Services</th
        >
        <th rowspan="2" colspan="2" class="table_header_style" style="font-weight: bold"
          >Weight Breakup</th
        >
        <th colspan="6" class="table_header_style" style="font-weight: bold">Service Charges</th>
      </tr>
      <tr>
        <th class="table_header_style" colspan="2" style="font-weight: bold">Within City (Rs.)</th>
        <th class="table_header_style" colspan="2" style="font-weight: bold">Same Zone (Rs.)</th>
        <th class="table_header_style" colspan="2" style="font-weight: bold">Diff Zone (Rs.)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table_row_style" rowspan="2" colspan="2">Express Delivery</td>
        <td class="table_row_style" colspan="2">Up to 4 - Kg</td>
        <td class="table_row_style" colspan="2">118/135</td>
        <td class="table_row_style" colspan="2">118/135</td>
        <td class="table_row_style" colspan="2">118/135</td>
      </tr>
      <tr>
        <td class="table_row_style" colspan="2">Each Add 1 - KG</td>
        <td class="table_row_style" colspan="2">60</td>
        <td class="table_row_style" colspan="2">60</td>
        <td class="table_row_style" colspan="2">60</td>
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
  .table_header_style {
    width: 200px;
    border-width: 1px;
    text-align: center;
  }
</style>
