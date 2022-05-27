var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var categories = ['讲授言语切换', '交互片段', '板书片段'];
var type2color = {
    'A': '#2F4F4F',
    'B': '#FF1493',
    'C': '#00C5CD',
};
var tyep2name = {
    'A': '讲授言语切换',
    'B': '交互片段',
    'C': '板书片段'
};
var dataSource = [
    {name: 'A', startTime: 146, endTime: 159},
    {name: 'A', startTime: 204, endTime: 219},
{name: 'A', startTime: 355, endTime: 371},
{name: 'A', startTime: 521, endTime: 534},
{name: 'A', startTime: 1040, endTime: 1048},
{name: 'A', startTime: 840, endTime: 848},
{name: 'A', startTime: 849, endTime: 866},
{name: 'A', startTime: 1444, endTime: 1451},
{name: 'A', startTime: 1631, endTime: 1643},
{name: 'A', startTime: 1976, endTime: 1995},
{name: 'A', startTime: 2252, endTime: 2265},
{name: 'A', startTime: 2342, endTime: 2349},
{name: 'A', startTime: 2472, endTime: 2485},

{name: 'B', startTime: 526.67, endTime: 549.73},
{name: 'B', startTime: 598.67, endTime: 629.73},
{name: 'B', startTime: 1694.21, endTime: 1737.33},
{name: 'B', startTime: 1302.57, endTime: 1354.56},
{name: 'B', startTime: 2226.67, endTime: 2238.73},

    // {name: 'C', startTime: 78, endTime: 91},
    // {name: 'C', startTime: 99, endTime: 133},
    {name: 'C', startTime: 311, endTime: 319},
    // {name: 'C', startTime: 288, endTime: 295},
    {name: 'C', startTime: 377, endTime: 402},
    {name: 'C', startTime: 421, endTime: 479},
    {name: 'C', startTime: 547, endTime: 760},
    {name: 'C', startTime: 790, endTime: 824},
    {name: 'C', startTime: 937, endTime: 950},
    {name: 'C', startTime: 1096, endTime: 1104},
    {name: 'C', startTime: 1140, endTime: 1280},
    {name: 'C', startTime: 1554, endTime: 1572},
    {name: 'C', startTime: 1745, endTime: 1760},
    {name: 'C', startTime: 1802, endTime: 1816},
    {name: 'C', startTime: 1915, endTime: 1928},
    {name: 'C', startTime: 2164, endTime: 2206},
    {name: 'C', startTime: 2304, endTime: 2319},
    {name: 'C', startTime: 2325, endTime: 2381},
    {name: 'C', startTime: 2408, endTime: 2450},

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
            value: [1, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'C') {
      board = board + dataSource[i].endTime - dataSource[i].startTime;
        data3.push({
            name: tyep2name[dataSource[i].name],
            value: [2, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'D') {
        data4.push({
            name: tyep2name[dataSource[i].name],
            value: [0, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
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
            top: 300,
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
        min: 0,
        scale: true,
        max: 2570,
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 33,
        nameTextStyle: {fontSize: 18},
        interval: 368,
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
        data: [{value: '讲授情境切换时段', textStyle: {fontSize: 17, color: '#000000'}},
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
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data4,
                  markPoint: {
        data : [
          {name: 'A', coord: [464, 2], label: {show: true}},
          {name: 'B', coord: [600, 2], label: {show: true}},
          {name: 'C', coord: [1248, 2], label: {show: true}},
          {name: 'D', coord: [1755, 2], label: {show: true}},
          {name: 'E', coord: [2334, 2], label: {show: true}},
          {name: 'F', coord: [2434, 2], label: {show: true}},
        ],
        symbol: 'circle',
        symbolSize: 5,
        // symbolRotate: 180,
        // symbolOffset: [0, '-70%'],
        itemStyle: {color: '#FF0000'},
        label: {show: true, formatter: '{b}', fontSize: 16, color: '#FFFFFF',
        textBorderColor: '#FF0000', textBorderWidth: 4,
                fontWeight: 'bold', offset: [5, 15]},
       },
        }
    ]
};