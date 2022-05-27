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



{name: 'E', startTime: 2644.41, endTime: 2650.15},

{name: 'E', startTime: 2564.37, endTime: 2583.22},

{name: 'E', startTime: 2324.66, endTime: 2350.77},
{name: 'E', startTime: 2351.39, endTime: 2355.08},

{name: 'E', startTime: 2360.92, endTime: 2373.68},

{name: 'E', startTime: 2388.67, endTime: 2395.58},

{name: 'E', startTime: 2406.92, endTime: 2421.54},

{name: 'E', startTime: 2434.93, endTime: 2450.54},

{name: 'E', startTime: 2476.79, endTime: 2481.02},
{name: 'E', startTime: 2481.03, endTime: 2492.19},


{name: 'E', startTime: 2525.92, endTime: 2530.91},

{name: 'E', startTime: 2551.17, endTime: 2557.44},
{name: 'E', startTime: 2557.98, endTime: 2561.49},


{name: 'E', startTime: 2593.08, endTime: 2597.68},
{name: 'E', startTime: 2598.21, endTime: 2601.0},


{name: 'E', startTime: 2633.41, endTime: 2636.24},
{name: 'E', startTime: 2639.7, endTime: 2644.4},

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
            value: [2, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
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
            value: [0, dataSource[i].startTime+2, dataSource[i].endTime-2, dataSource[i].endTime - dataSource[i].startTime-4],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'E') {
        data4.push({
            name: tyep2name[dataSource[i].name],
            value: [1, dataSource[i].startTime+2, dataSource[i].endTime-2, dataSource[i].endTime - dataSource[i].startTime-4],
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
        height: 150
    },
    xAxis: {
        min: 2324,
        scale: true,
        max: 2665,
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 33,
        nameTextStyle: {fontSize: 18},
        interval: 50,
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

          {value: '非教师言语', textStyle: {fontSize: 17, color: '#000000'}},
          {value: '交互类言语', textStyle: {fontSize: 17, color: '#000000'}},
              {value: '交互情境片段', textStyle: {fontSize: 17, color: '#000000'}},

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
        }
    ]
};