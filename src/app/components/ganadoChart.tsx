import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

export function GanadoChart(chartDomId: string) {
  const chartDom = document.getElementById(chartDomId)!;
  const myChart = echarts.init(chartDom);
  const option: EChartsOption = {
    title: {
      text: 'Gráfico de áreas apiladas',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['Ganadero #1', 'Ganadero #2', 'Ganadero #3', 'Ganadero #4', 'Ganadero #5'],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Ganadero #1',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [118, 130, 100, 136, 92, 228, 208],
      },
      {
        name: 'Ganadero #2',
        type: 'line',
        color:'#898121',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [121, 133, 103, 132, 88, 231, 212],
      },
      {
        name: 'Ganadero #3',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [119, 131, 102, 135, 91, 229, 211],
      },
      {
        name: 'Ganadero #4',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [122, 134, 104, 133, 89, 232, 209],
      },
      {
        name: 'Ganadero #5',
        type: 'line',
        stack: 'Total',
        color:'#4C4B16',
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  option && myChart.setOption(option);
}
