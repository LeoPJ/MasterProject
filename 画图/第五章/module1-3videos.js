var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var categories = ['镜头分类'];
var type2color = {
    'A': '#7b9ce1',
    'B': '#e0bc78',
    'C': '#bd6d6c',
    'D': '#75d874'
};
var tyep2name = {
    'A': '投影内容全屏镜头',
    'B': '讲台区域聚焦镜头',
    'C': '教室后方全景镜头',
    'D': '教室前方全景镜头'
};
var dataSource1 = [
    {name: 'C', startTime: 1, endTime: 10},
    {name: 'A', startTime: 11, endTime: 19},
    {name: 'C', startTime: 20, endTime: 59},
    {name: 'D', startTime: 60, endTime: 61},
    {name: 'B', startTime: 62, endTime: 167},
    {name: 'A', startTime: 168, endTime: 186},
    {name: 'B', startTime: 187, endTime: 422},
    {name: 'A', startTime: 423, endTime: 447},
    {name: 'B', startTime: 448, endTime: 724},
    {name: 'A', startTime: 725, endTime: 736},
    {name: 'B', startTime: 737, endTime: 784},
    {name: 'A', startTime: 785, endTime: 795},
    {name: 'B', startTime: 796, endTime: 900},
    {name: 'A', startTime: 901, endTime: 904},
    {name: 'B', startTime: 905, endTime: 954},
    {name: 'A', startTime: 955, endTime: 966},
    {name: 'B', startTime: 967, endTime: 973},
    {name: 'A', startTime: 974, endTime: 984},
    {name: 'B', startTime: 985, endTime: 1114},
    {name: 'A', startTime: 1115, endTime: 1131},
    {name: 'B', startTime: 1132, endTime: 1165},
    {name: 'A', startTime: 1166, endTime: 1172},
    {name: 'B', startTime: 1173, endTime: 1287},
    {name: 'A', startTime: 1288, endTime: 1294},
    {name: 'B', startTime: 1295, endTime: 1379},
    {name: 'D', startTime: 1380, endTime: 1383},
    {name: 'B', startTime: 1384, endTime: 1428},
    {name: 'D', startTime: 1429, endTime: 1434},
    {name: 'B', startTime: 1435, endTime: 1561},
    {name: 'A', startTime: 1562, endTime: 1586},
    {name: 'C', startTime: 1587, endTime: 1631},
    {name: 'D', startTime: 1632, endTime: 1634},
    {name: 'B', startTime: 1635, endTime: 1871},
    {name: 'A', startTime: 1872, endTime: 1917},
    {name: 'B', startTime: 1918, endTime: 1960},
    {name: 'A', startTime: 1961, endTime: 1978},
    {name: 'B', startTime: 1979, endTime: 2335},
    {name: 'A', startTime: 2336, endTime: 2381},
    {name: 'C', startTime: 2382, endTime: 2389},
    {name: 'B', startTime: 2390, endTime: 2394},
    {name: 'A', startTime: 2395, endTime: 2405},
    {name: 'B', startTime: 2406, endTime: 2440},
    {name: 'A', startTime: 2441, endTime: 2466},
    {name: 'B', startTime: 2467, endTime: 2538},
    {name: 'A', startTime: 2539, endTime: 2541}
];

for (var i = 0; i < dataSource1.length; i++) {
    if (dataSource1[i].name == 'A') {
        data1.push({
            name: tyep2name[dataSource1[i].name],
            value: [0, dataSource1[i].startTime, dataSource1[i].endTime, dataSource1[i].endTime - dataSource1[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource1[i].name]}}
        })
    } else if (dataSource1[i].name == 'B') {
        data2.push({
            name: tyep2name[dataSource1[i].name],
            value: [0, dataSource1[i].startTime, dataSource1[i].endTime, dataSource1[i].endTime - dataSource1[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource1[i].name]}}
        })
    } else if (dataSource1[i].name == 'C') {
        data3.push({
            name: tyep2name[dataSource1[i].name],
            value: [0, dataSource1[i].startTime, dataSource1[i].endTime, dataSource1[i].endTime - dataSource1[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource1[i].name]}}
        })
    } else if (dataSource1[i].name == 'D') {
        data4.push({
            name: tyep2name[dataSource1[i].name],
            value: [0, dataSource1[i].startTime, dataSource1[i].endTime, dataSource1[i].endTime - dataSource1[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource1[i].name]}}
        })
    }
}


var dataSource2 = [
{name: 'A', startTime: 1, endTime: 18},
{name: 'B', startTime: 19, endTime: 48},
{name: 'C', startTime: 49, endTime: 63},
{name: 'B', startTime: 64, endTime: 70},
{name: 'C', startTime: 71, endTime: 77},
{name: 'B', startTime: 78, endTime: 202},
{name: 'A', startTime: 203, endTime: 208},
{name: 'B', startTime: 209, endTime: 281},
{name: 'C', startTime: 282, endTime: 303},
{name: 'B', startTime: 304, endTime: 307},
{name: 'C', startTime: 308, endTime: 319},
{name: 'A', startTime: 320, endTime: 334},
{name: 'B', startTime: 335, endTime: 378},
{name: 'C', startTime: 379, endTime: 394},
{name: 'B', startTime: 395, endTime: 481},
{name: 'C', startTime: 482, endTime: 499},
{name: 'A', startTime: 500, endTime: 509},
{name: 'B', startTime: 510, endTime: 534},
{name: 'C', startTime: 535, endTime: 571},
{name: 'B', startTime: 572, endTime: 716},
{name: 'C', startTime: 717, endTime: 724},
{name: 'B', startTime: 725, endTime: 780},
{name: 'C', startTime: 781, endTime: 820},
{name: 'B', startTime: 821, endTime: 856},
{name: 'C', startTime: 857, endTime: 879},
{name: 'B', startTime: 880, endTime: 956},
{name: 'A', startTime: 957, endTime: 970},
{name: 'B', startTime: 971, endTime: 1060},
{name: 'D', startTime: 1061, endTime: 1071},
{name: 'B', startTime: 1072, endTime: 1093},
{name: 'C', startTime: 1094, endTime: 1352},
{name: 'D', startTime: 1353, endTime: 1395},
{name: 'B', startTime: 1396, endTime: 1455},
{name: 'C', startTime: 1456, endTime: 1463},
{name: 'B', startTime: 1464, endTime: 1551},
{name: 'C', startTime: 1552, endTime: 1583},
{name: 'D', startTime: 1584, endTime: 1610},
{name: 'C', startTime: 1611, endTime: 1631},
{name: 'D', startTime: 1632, endTime: 1737},
{name: 'B', startTime: 1738, endTime: 1823},
{name: 'C', startTime: 1824, endTime: 2149},
{name: 'B', startTime: 2150, endTime: 2291},
{name: 'C', startTime: 2292, endTime: 2307},
{name: 'B', startTime: 2308, endTime: 2490},
{name: 'C', startTime: 2491, endTime: 2560},
];

for (var i = 0; i < dataSource2.length; i++) {
    if (dataSource2[i].name == 'A') {
        data1.push({
            name: tyep2name[dataSource2[i].name],
            value: [1, dataSource2[i].startTime, dataSource2[i].endTime, dataSource2[i].endTime - dataSource2[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource2[i].name]}}
        })
    } else if (dataSource2[i].name == 'B') {
        data2.push({
            name: tyep2name[dataSource2[i].name],
            value: [1, dataSource2[i].startTime, dataSource2[i].endTime, dataSource2[i].endTime - dataSource2[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource2[i].name]}}
        })
    } else if (dataSource2[i].name == 'C') {
        data3.push({
            name: tyep2name[dataSource2[i].name],
            value: [1, dataSource2[i].startTime, dataSource2[i].endTime, dataSource2[i].endTime - dataSource2[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource2[i].name]}}
        })
    } else if (dataSource2[i].name == 'D') {
        data4.push({
            name: tyep2name[dataSource2[i].name],
            value: [1, dataSource2[i].startTime, dataSource2[i].endTime, dataSource2[i].endTime - dataSource2[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource2[i].name]}}
        })
    }
}

var dataSource3 = [
{name: 'C', startTime: 1, endTime: 2},
{name: 'B', startTime: 3, endTime: 24},
{name: 'A', startTime: 25, endTime: 70},
{name: 'B', startTime: 71, endTime: 164},
{name: 'A', startTime: 165, endTime: 174},
{name: 'B', startTime: 175, endTime: 196},
{name: 'A', startTime: 197, endTime: 205},
{name: 'B', startTime: 206, endTime: 326},
{name: 'A', startTime: 327, endTime: 346},
{name: 'B', startTime: 347, endTime: 396},
{name: 'A', startTime: 397, endTime: 417},
{name: 'B', startTime: 418, endTime: 670},
{name: 'A', startTime: 671, endTime: 709},
{name: 'B', startTime: 710, endTime: 773},
{name: 'D', startTime: 774, endTime: 787},
{name: 'B', startTime: 788, endTime: 968},
{name: 'A', startTime: 969, endTime: 991},
{name: 'B', startTime: 992, endTime: 1227},
{name: 'D', startTime: 1228, endTime: 1272},
{name: 'B', startTime: 1273, endTime: 1350},
{name: 'A', startTime: 1351, endTime: 1364},
{name: 'B', startTime: 1365, endTime: 1451},
{name: 'A', startTime: 1452, endTime: 1490},
{name: 'B', startTime: 1491, endTime: 1673},
{name: 'D', startTime: 1674, endTime: 1724},
{name: 'B', startTime: 1725, endTime: 1752},
{name: 'A', startTime: 1753, endTime: 1783},
{name: 'B', startTime: 1784, endTime: 1871},
{name: 'D', startTime: 1872, endTime: 1885},
{name: 'B', startTime: 1886, endTime: 1891},
{name: 'D', startTime: 1892, endTime: 1921},
{name: 'C', startTime: 1922, endTime: 2078},
{name: 'A', startTime: 2079, endTime: 2114},
{name: 'C', startTime: 2115, endTime: 2256},
{name: 'A', startTime: 2257, endTime: 2280},
{name: 'B', startTime: 2281, endTime: 2301},
{name: 'C', startTime: 2302, endTime: 2410},
{name: 'D', startTime: 2411, endTime: 2430},
{name: 'C', startTime: 2431, endTime: 2613},
{name: 'D', startTime: 2614, endTime: 2630},
{name: 'C', startTime: 2631, endTime: 2715},
]

for (var i = 0; i < dataSource3.length; i++) {
    if (dataSource3[i].name == 'A') {
        data1.push({
            name: tyep2name[dataSource3[i].name],
            value: [2, dataSource3[i].startTime, dataSource3[i].endTime, dataSource3[i].endTime - dataSource3[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource3[i].name]}}
        })
    } else if (dataSource3[i].name == 'B') {
        data2.push({
            name: tyep2name[dataSource3[i].name],
            value: [2, dataSource3[i].startTime, dataSource3[i].endTime, dataSource3[i].endTime - dataSource3[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource3[i].name]}}
        })
    } else if (dataSource3[i].name == 'C') {
        data3.push({
            name: tyep2name[dataSource3[i].name],
            value: [2, dataSource3[i].startTime, dataSource3[i].endTime, dataSource3[i].endTime - dataSource3[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource3[i].name]}}
        })
    } else if (dataSource3[i].name == 'D') {
        data4.push({
            name: tyep2name[dataSource3[i].name],
            value: [2, dataSource3[i].startTime, dataSource3[i].endTime, dataSource3[i].endTime - dataSource3[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource3[i].name]}}
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
            return params.marker + params.name + ': ' + params.value[3] + ' s';
        }
    },
    toolbox: {
       feature: {saveAsImage: {pixelRatio: 2}}
    },
    // title: {
    //     text: 'Profile',
    //     left: 'center'
    // },
    // dataZoom: [
    //     {
    //         type: 'slider',
    //         filterMode: 'weakFilter',
    //         showDataShadow: false,
    //         top: 400,
    //         labelFormatter: ''
    //     },
    //     {
    //         type: 'inside',
    //         filterMode: 'weakFilter'
    //     }
    // ],
    grid: {
        top: 120,
        height: 180,
        left: 120
    },
    xAxis: {
        scale: true,
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 39,
        min: 0,
        max: 'dataMax',
        nameTextStyle: {fontSize: 19},
        interval: 543,
        axisLabel: {
            formatter: function (val) {
                return changeTime(val);
            },
            fontSize: 18
        },
        axisLine: {
            show: true,
            lineStyle: {color: '#000000', width: 1}
        }
    },
    yAxis: {
        data: [{value: '录像1', textStyle: {fontSize: 18, color: '#000000'}},
        {value: '录像2', textStyle: {fontSize: 18, color: '#000000'}},
        {value: '录像3', textStyle: {fontSize: 18, color: '#000000'}}
        ],
        name: '测试课堂录像',
        nameLocation: 'end',
        nameGap: 11,
        nameTextStyle: {fontSize: 19, align: 'right'},
        axisLabel: {margin: 13},
        axisLine: {lineStyle: {color: '#000000', width: 1.5}}
    },
    color: ['#7b9ce1', '#e0bc78', '#bd6d6c', '#75d874'],
    legend: {
        data: ['投影内容全屏镜头', '讲台区域聚焦镜头', '教室后方全景镜头', '教室前方全景镜头'],
        textStyle: {fontSize: 17, color: '#000000'},
        itemGap: 15,
        top: 65
    },
    series: [
        {
            type: 'custom',
            name: tyep2name['A'],
            renderItem: renderItem,
            markPoint: {
              data : [{coord: [305, 0], label: {show: true}}],
              symbol: 'pin',
              symbolSize: 27,
              symbolOffset: [0, '-60%'],
              itemStyle: {color: '#FF0000'},
              label: {show: true, formatter: 'B', fontSize: 13, fontWeight: 'bold'},
            },
            itemStyle: {
                opacity: 1
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
            markPoint: {
              data : [{coord: [977, 2], label: {show: true}}],
              symbol: 'pin',
              symbolSize: 27,
              symbolOffset: [0, '-60%'],
              itemStyle: {color: '#FF0000'},
              label: {show: true, formatter: 'A', fontSize: 13, fontWeight: 'bold'},
            },
            itemStyle: {
                opacity: 1
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
            markPoint: {
              data : [{coord: [1297, 1], label: {show: true}}],
              symbol: 'pin',
              symbolSize: 27,
              symbolOffset: [0, '-60%'],
              itemStyle: {color: '#FF0000'},
              label: {show: true, formatter: 'C', fontSize: 13, fontWeight: 'bold'},
            },
            itemStyle: {
                opacity: 1
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
            markPoint: {
              data : [{coord: [1656, 1], label: {show: true}}],
              symbol: 'pin',
              symbolSize: 27,
              symbolOffset: [0, '-60%'],
              itemStyle: {color: '#FF0000'},
              label: {show: true, formatter: 'D', fontSize: 13, fontWeight: 'bold'},
            },
            itemStyle: {
                opacity: 1
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data4
        }
    ]
};