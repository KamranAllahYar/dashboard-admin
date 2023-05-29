<template>
  <n-table
    :single-line="true"
    :bordered="true"
    style="width: 100%; word-wrap: break-word; table-layout: fixed"
  >
    <thead>
      <tr>
        <th class="table_row_style" colspan="2" style="font-weight: bold">LHR / ISB / RWP</th>
        <th colspan="2" class="table_row_style" style="font-weight: bold">KHI</th>
      </tr>
      <tr>
        <th class="table_row_style" style="font-weight: bold">Slabs</th>
        <th class="table_row_style" style="font-weight: bold">Rate (Rs.)</th>
        <th class="table_row_style" style="font-weight: bold">Slabs</th>
        <th class="table_row_style" style="font-weight: bold">Rate (Rs.)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table_row_style">0 to 3000</td>
        <td class="table_row_style">90</td>
        <td class="table_row_style">0 to 4000</td>
        <td class="table_row_style">120</td>
      </tr>
      <tr>
        <td class="table_row_style">3001 to 5000</td>
        <td class="table_row_style">2.0%</td>
        <td class="table_row_style">4001 to 6000</td>
        <td class="table_row_style">2.5%</td>
      </tr>
      <tr>
        <td class="table_row_style">5001 to 10000</td>
        <td class="table_row_style">1.5%</td>
        <td class="table_row_style">6001 to 10000</td>
        <td class="table_row_style">2.0%</td>
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
