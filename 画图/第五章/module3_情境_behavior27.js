var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var categories = ['讲授言语切换', '交互片段', '板书片段'];
var type2color = {
    'A': '#2F4F4F',
    'B': '#FF1493',
    'C': '#00C5CD',
    'D': '#BDB76B',
    'E': '#FF8C69'
};
var tyep2name = {
    'A': '讲授言语切换',
    'B': '交互片段',
    'C': '板书片段'
};
var dataSource = [

// {name: 'B', startTime: 1709.21, endTime: 1736},

{name: 'B', startTime: 729.79, endTime: 809.12},
{name: 'B', startTime: 536.67, endTime: 555.46},
{name: 'B', startTime: 1207.75, endTime: 1279.12},
{name: 'B', startTime: 1621.49, endTime: 1728.59},
{name: 'B', startTime: 1897.09, endTime: 1923.82},
{name: 'B', startTime: 2324.66, endTime: 2421.54},
{name: 'B', startTime: 2434.93, endTime: 2508.89},
{name: 'B', startTime: 2525.92, endTime: 2583.22},
{name: 'B', startTime: 2593.08, endTime: 2664.06},



    {name: 'C', startTime: 365, endTime: 373},
    {name: 'C', startTime: 1398, endTime: 1410},


{name: 'D', startTime: 122.75, endTime: 137.6},
{name: 'D', startTime: 536.67, endTime: 546.82},
{name: 'D', startTime: 734.54, endTime: 747.41},
{name: 'D', startTime: 752.85, endTime: 756.12},
{name: 'D', startTime: 772.0, endTime: 778.75},
{name: 'D', startTime: 792.65, endTime: 799.52},



{name: 'D', startTime: 911.28, endTime: 918.94},


{name: 'D', startTime: 1219.34, endTime: 1248.86},
{name: 'D', startTime: 1248.87, endTime: 1269.75},


{name: 'D', startTime: 1626.44, endTime: 1635.58},
{name: 'D', startTime: 1651.41, endTime: 1662.21},
{name: 'D', startTime: 1673.42, endTime: 1694.81},
{name: 'D', startTime: 1694.82, endTime: 1697.09},
{name: 'D', startTime: 1697.23, endTime: 1702.9},
{name: 'D', startTime: 1708.51, endTime: 1719.4},

{name: 'D', startTime: 1897.09, endTime: 1903.48},
{name: 'D', startTime: 1907.68, endTime: 1911.4},
{name: 'D', startTime: 1914.28, endTime: 1918.59},


{name: 'D', startTime: 2324.66, endTime: 2350.77},
{name: 'D', startTime: 2351.39, endTime: 2355.08},
{name: 'D', startTime: 2355.09, endTime: 2358.56},
{name: 'D', startTime: 2358.87, endTime: 2360.91},
{name: 'D', startTime: 2360.92, endTime: 2373.68},
{name: 'D', startTime: 2373.69, endTime: 2377.85},
{name: 'D', startTime: 2377.86, endTime: 2386.82},
{name: 'D', startTime: 2388.67, endTime: 2395.58},
{name: 'D', startTime: 2395.59, endTime: 2406.84},
{name: 'D', startTime: 2406.92, endTime: 2421.54},

{name: 'D', startTime: 2434.93, endTime: 2450.54},
{name: 'D', startTime: 2450.75, endTime: 2474.38},
{name: 'D', startTime: 2474.39, endTime: 2476.78},
{name: 'D', startTime: 2476.79, endTime: 2481.02},
{name: 'D', startTime: 2481.03, endTime: 2492.19},
{name: 'D', startTime: 2492.2, endTime: 2508.89},

{name: 'D', startTime: 2525.92, endTime: 2530.91},
{name: 'D', startTime: 2530.92, endTime: 2537.27},
{name: 'D', startTime: 2537.28, endTime: 2547.04},
{name: 'D', startTime: 2547.05, endTime: 2551.16},
{name: 'D', startTime: 2551.17, endTime: 2557.44},
{name: 'D', startTime: 2557.98, endTime: 2561.49},
{name: 'D', startTime: 2561.69, endTime: 2564.36},
{name: 'D', startTime: 2564.37, endTime: 2583.22},

{name: 'D', startTime: 2593.08, endTime: 2597.68},
{name: 'D', startTime: 2598.21, endTime: 2601.0},
{name: 'D', startTime: 2601.54, endTime: 2610.89},
{name: 'D', startTime: 2610.9, endTime: 2628.72},
{name: 'D', startTime: 2629.57, endTime: 2633.4},
{name: 'D', startTime: 2633.41, endTime: 2636.24},
{name: 'D', startTime: 2639.7, endTime: 2644.4},
{name: 'D', startTime: 2644.41, endTime: 2650.15},
{name: 'D', startTime: 2651.09, endTime: 2664.06},


{name: 'E', startTime: 31.05, endTime: 40.55},
{name: 'E', startTime: 41.64, endTime: 47.81},

{name: 'E', startTime: 83.1, endTime: 91.41},




{name: 'E', startTime: 208.44, endTime: 231.32},
{name: 'E', startTime: 256.41, endTime: 259.12},
{name: 'E', startTime: 290.79, endTime: 301.99},
{name: 'E', startTime: 334.7, endTime: 356.78},
{name: 'E', startTime: 422.29, endTime: 424.82},
{name: 'E', startTime: 441.27, endTime: 456.41},
{name: 'E', startTime: 506.89, endTime: 514.27},
{name: 'E', startTime: 546.98, endTime: 555.46},
{name: 'E', startTime: 574.56, endTime: 581.28},
{name: 'E', startTime: 581.29, endTime: 586.97},
{name: 'E', startTime: 631.77, endTime: 638.67},
{name: 'E', startTime: 638.68, endTime: 642.95},
{name: 'E', startTime: 682.91, endTime: 691.49},
{name: 'E', startTime: 720.75, endTime: 729.78},

{name: 'E', startTime: 729.79, endTime: 734.53},
{name: 'E', startTime: 748.89, endTime: 752.84},
{name: 'E', startTime: 757.93, endTime: 767.91},
{name: 'E', startTime: 769.09, endTime: 771.68},
{name: 'E', startTime: 778.76, endTime: 792.57},
{name: 'E', startTime: 801.19, endTime: 809.12},


{name: 'E', startTime: 850.19, endTime: 854.86},
{name: 'E', startTime: 855.05, endTime: 860.44},

{name: 'E', startTime: 885.6, endTime: 896.51},

{name: 'E', startTime: 924.11, endTime: 933.23},
{name: 'E', startTime: 956.9, endTime: 969.36},
{name: 'E', startTime: 969.37, endTime: 976.46},


{name: 'E', startTime: 1048.98, endTime: 1051.53},
{name: 'E', startTime: 1051.54, endTime: 1059.17},


{name: 'E', startTime: 1104.34, endTime: 1109.24},
{name: 'E', startTime: 1155.78, endTime: 1161.34},
{name: 'E', startTime: 1162.18, endTime: 1168.83},


{name: 'E', startTime: 1194.42, endTime: 1200.78},

{name: 'E', startTime: 1207.75, endTime: 1216.36},
{name: 'E', startTime: 1216.5, endTime: 1218.61},
{name: 'E', startTime: 1269.89, endTime: 1279.12},


{name: 'E', startTime: 1279.13, endTime: 1297.55},
{name: 'E', startTime: 1318.65, endTime: 1335.1},
{name: 'E', startTime: 1374.19, endTime: 1388.15},
{name: 'E', startTime: 1485.01, endTime: 1491.52},
{name: 'E', startTime: 1494.3, endTime: 1511.25},
{name: 'E', startTime: 1534.24, endTime: 1548.11},
{name: 'E', startTime: 1575.64, endTime: 1590.38},

{name: 'E', startTime: 1621.49, endTime: 1626.31},
{name: 'E', startTime: 1635.59, endTime: 1648.32},
{name: 'E', startTime: 1648.33, endTime: 1651.4},
{name: 'E', startTime: 1663.32, endTime: 1667.78},
{name: 'E', startTime: 1670.52, endTime: 1673.41},
{name: 'E', startTime: 1703.04, endTime: 1708.25},
{name: 'E', startTime: 1719.41, endTime: 1721.44},


{name: 'E', startTime: 1721.48, endTime: 1728.59},



{name: 'E', startTime: 1748.48, endTime: 1754.23},

{name: 'E', startTime: 1785.85, endTime: 1817.63},

{name: 'E', startTime: 1833.21, endTime: 1841.47},

{name: 'E', startTime: 1858.04, endTime: 1875.5},

{name: 'E', startTime: 1886.46, endTime: 1891.47},

{name: 'E', startTime: 1897.09, endTime: 1903.48},
{name: 'E', startTime: 1903.49, endTime: 1907.55},
{name: 'E', startTime: 1907.68, endTime: 1911.4},
{name: 'E', startTime: 1914.28, endTime: 1918.59},
{name: 'E', startTime: 1918.73, endTime: 1923.82},



{name: 'E', startTime: 1966.58, endTime: 1981.56},

{name: 'E', startTime: 2054.92, endTime: 2066.22},

{name: 'E', startTime: 2125.92, endTime: 2128.27},

{name: 'E', startTime: 2158.54, endTime: 2162.81},

{name: 'E', startTime: 2181.24, endTime: 2204.31},

{name: 'E', startTime: 2236.1, endTime: 2246.92},
{name: 'E', startTime: 2246.93, endTime: 2254.65},

{name: 'E', startTime: 2287.16, endTime: 2308.37},

{name: 'E', startTime: 2324.66, endTime: 2350.77},
{name: 'E', startTime: 2351.39, endTime: 2355.08},
{name: 'E', startTime: 2355.09, endTime: 2358.56},
{name: 'E', startTime: 2358.87, endTime: 2360.91},
{name: 'E', startTime: 2360.92, endTime: 2373.68},
{name: 'E', startTime: 2373.69, endTime: 2377.85},
{name: 'E', startTime: 2377.86, endTime: 2386.82},
{name: 'E', startTime: 2388.67, endTime: 2395.58},
{name: 'E', startTime: 2395.59, endTime: 2406.84},
{name: 'E', startTime: 2406.92, endTime: 2421.54},

{name: 'E', startTime: 2434.93, endTime: 2450.54},
{name: 'E', startTime: 2450.75, endTime: 2474.38},
{name: 'E', startTime: 2474.39, endTime: 2476.78},
{name: 'E', startTime: 2476.79, endTime: 2481.02},
{name: 'E', startTime: 2481.03, endTime: 2492.19},
{name: 'E', startTime: 2492.2, endTime: 2508.89},

{name: 'E', startTime: 2525.92, endTime: 2530.91},
{name: 'E', startTime: 2530.92, endTime: 2537.27},
{name: 'E', startTime: 2537.28, endTime: 2547.04},
{name: 'E', startTime: 2547.05, endTime: 2551.16},
{name: 'E', startTime: 2551.17, endTime: 2557.44},
{name: 'E', startTime: 2557.98, endTime: 2561.49},
{name: 'E', startTime: 2561.69, endTime: 2564.36},
{name: 'E', startTime: 2564.37, endTime: 2583.22},

{name: 'E', startTime: 2593.08, endTime: 2597.68},
{name: 'E', startTime: 2598.21, endTime: 2601.0},
{name: 'E', startTime: 2601.54, endTime: 2610.89},
{name: 'E', startTime: 2610.9, endTime: 2628.72},
{name: 'E', startTime: 2629.57, endTime: 2633.4},
{name: 'E', startTime: 2633.41, endTime: 2636.24},
{name: 'E', startTime: 2639.7, endTime: 2644.4},
{name: 'E', startTime: 2644.41, endTime: 2650.15},
{name: 'E', startTime: 2651.09, endTime: 2664.06},
{name: 'E', startTime: 2664.07, endTime: 2669.34},

{name: 'E', startTime: 2683.95, endTime: 2704.43},

{name: 'E', startTime: 2717.32, endTime: 2718.39},


    {name: 'A', startTime: 136, endTime: 149},
    {name: 'A', startTime: 150, endTime: 171},
{name: 'A', startTime: 172, endTime: 179},
{name: 'A', startTime: 546, endTime: 564},
{name: 'A', startTime: 709, endTime: 717},
{name: 'A', startTime: 1036, endTime: 1052},
{name: 'A', startTime: 1053, endTime: 1061},
{name: 'A', startTime: 1461, endTime: 1472},
{name: 'A', startTime: 1701, endTime: 1717},
{name: 'A', startTime: 2203, endTime: 2219},
];

var board = 0;
var talk = 0;

for (var i = 0; i < dataSource.length; i++) {
    if (dataSource[i].name == 'A') {
        data1.push({
            name: tyep2name[dataSource[i].name],
            value: [0, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'B') {
      talk = talk + dataSource[i].endTime - dataSource[i].startTime;
        data2.push({
            name: tyep2name[dataSource[i].name],
            value: [3, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'C') {
      board = board + dataSource[i].endTime - dataSource[i].startTime;
        data3.push({
            name: tyep2name[dataSource[i].name],
            value: [4, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'D') {
        data4.push({
            name: tyep2name[dataSource[i].name],
            value: [1, dataSource[i].startTime+2, dataSource[i].endTime-2, dataSource[i].endTime - dataSource[i].startTime-4],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'E') {
        data4.push({
            name: tyep2name[dataSource[i].name],
            value: [2, dataSource[i].startTime+2, dataSource[i].endTime-2, dataSource[i].endTime - dataSource[i].startTime-4],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    }
}

function changeTime(value) {
    let theTime = value;//秒
    let middle = 0;//分
    let hour = 0;//小时
    if (theTime > 59) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
    }
    if (middle > 59) {
        hour = parseInt(middle / 60);
        middle = parseInt(middle % 60);
    }
    theTime < 10 ? theTime = '0' + theTime : theTime = theTime
    middle < 10 ? middle = '0' + middle : middle = middle
    hour < 10 ? hour = '0' + hour : hour = hour
    return middle + ':' + theTime
}

function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.6;
    var rectShape = echarts.graphic.clipRectByRect(
        {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
        },
        {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        }
    );
    return (
        rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
        }
    );
}

option = {
    tooltip: {
        formatter: function (params) {
            return params.marker + params.name + ': ' + changeTime(params.value[1]) 
            + '-' + changeTime(params.value[2]);
        }
    },
    toolbox: {
       feature: {saveAsImage: {pixelRatio: 2}}
    },
    // title: {
    //     text: 'Profile',
    //     left: 'center'
    // },
    dataZoom: [
        {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            labelFormatter: ''
        },
        {
            type: 'inside',
            filterMode: 'weakFilter'
        }
    ],
    grid: {
      left: 145,
        height: 250
    },
    xAxis: {
        min: 0,
        scale: true,
        max: 2718,
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 33,
        nameTextStyle: {fontSize: 18},
        interval: 389,
        axisLabel: {
            formatter: function (val) {
                return changeTime(val);
            },
            fontSize: 17
        },
        axisLine: {
            show: true,
            lineStyle: {color: '#000000', width: 1}
        }
    },
    yAxis: {
      name: '教学情境',
        nameLocation: 'end',
        nameGap: 15,
        nameTextStyle: {fontSize: 19, align: 'right'},
        data: [
          {value: '讲授情境切换时段', textStyle: {fontSize: 17, color: '#000000'}},
          {value: '非教师言语', textStyle: {fontSize: 17, color: '#000000'}},
          {value: '交互类言语', textStyle: {fontSize: 17, color: '#000000'}},
              {value: '交互情境片段', textStyle: {fontSize: 17, color: '#000000'}},
              {value: '板书情境片段', textStyle: {fontSize: 17, color: '#000000'}},
              // {value: board},
              // {value: talk}
              ],
        axisLabel: {margin: 5},
        axisLine: {lineStyle: {color: '#000000', width: 1.5}}
    },
    color: ['#7b9ce1', '#e0bc78', '#bd6d6c', '#75d874'],
    series: [
        {
            type: 'custom',
            name: tyep2name['A'],
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data1
        },
        {
            type: 'custom',
            name: tyep2name['B'],
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data2
        },
        {
            type: 'custom',
            name: tyep2name['C'],
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data3
        },
        {
            type: 'custom',
            name: tyep2name['D'],
            renderItem: renderItem,
            itemStyle: {
                color: '#812990',
                opacity: 1
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data4,
      // markPoint: {
      //   data : [
      //     {name: 'A', coord: [464, 2], label: {show: true}},
      //     {name: 'B', coord: [600, 2], label: {show: true}},
      //     {name: 'C', coord: [1248, 2], label: {show: true}},
      //     {name: 'D', coord: [1755, 2], label: {show: true}},
      //     {name: 'E', coord: [2334, 2], label: {show: true}},
      //     {name: 'F', coord: [2434, 2], label: {show: true}},
      //   ],
      //   symbol: 'circle',
      //   symbolSize: 5,
      //   // symbolRotate: 180,
      //   // symbolOffset: [0, '-70%'],
      //   itemStyle: {color: '#FF0000'},
      //   label: {show: true, formatter: '{b}', fontSize: 16, color: '#FFFFFF',
      //   textBorderColor: '#FF0000', textBorderWidth: 4,
      //           fontWeight: 'bold', offset: [5, 15]},
      // },
        }
    ]
};