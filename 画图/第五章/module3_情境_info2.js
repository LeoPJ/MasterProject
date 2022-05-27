var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var categories = ['讲授言语切换', '交互片段', '板书片段'];
var type2color = {
    'A': '#2F4F4F',
    'B': '#FF1493',
    'C': '#00C5CD',
    'D': '#812990',
    'E': '#66CD00'
};
var tyep2name = {
    'A': '讲授言语切换',
    'B': '交互片段',
    'C': '板书片段'
};
var dataSource = [

{name: 'B', startTime: 1709.21, endTime: 1736},
// {name: 'B', startTime: 2226.67, endTime: 2238.73},

    {name: 'C', startTime: 1192, endTime: 1198},
    {name: 'C', startTime: 1212, endTime: 1244},
    {name: 'C', startTime: 1061, endTime: 1098},
    {name: 'C', startTime: 975, endTime: 1005},
    {name: 'C', startTime: 1385, endTime: 1393},
    {name: 'C', startTime: 1412, endTime: 1431},
    {name: 'C', startTime: 2062, endTime: 2066},

    {name: 'E', startTime: 162, endTime: 176},
    {name: 'E', startTime: 177, endTime: 198},
{name: 'E', startTime: 243, endTime: 259},
{name: 'E', startTime: 706, endTime: 721},
{name: 'E', startTime: 769, endTime: 775},
{name: 'E', startTime: 1736, endTime: 1741},
{name: 'E', startTime: 1742, endTime: 1752},
{name: 'E', startTime: 1698, endTime: 1708},
{name: 'E', startTime: 2122, endTime: 2139},
{name: 'E', startTime: 2387, endTime: 2399},
{name: 'E', startTime: 2400, endTime: 2419},
{name: 'E', startTime: 2420, endTime: 2430},
{name: 'E', startTime: 91, endTime: 98},
{name: 'E', startTime: 2297, endTime: 2309},
{name: 'E', startTime: 893, endTime: 912},
{name: 'E', startTime: 1516, endTime: 1542},
{name: 'E', startTime: 1902, endTime: 1918},


    {name: 'A', startTime: 162, endTime: 176},
    {name: 'A', startTime: 177, endTime: 198},
{name: 'A', startTime: 243, endTime: 259},
{name: 'A', startTime: 706, endTime: 721},
{name: 'A', startTime: 769, endTime: 775},
{name: 'A', startTime: 1736, endTime: 1741},
{name: 'A', startTime: 1742, endTime: 1752},
{name: 'A', startTime: 1698, endTime: 1708},
{name: 'A', startTime: 2122, endTime: 2139},
{name: 'A', startTime: 2387, endTime: 2399},
{name: 'A', startTime: 2400, endTime: 2419},
{name: 'A', startTime: 2420, endTime: 2430},
{name: 'A', startTime: 91, endTime: 98},
{name: 'A', startTime: 2297, endTime: 2309},

    {name: 'D', startTime: 1, endTime: 92},
    {name: 'D', startTime: 93, endTime: 181},
    {name: 'D', startTime: 182, endTime: 251},
    {name: 'D', startTime: 252, endTime: 692},
    {name: 'D', startTime: 710, endTime: 779},
    {name: 'D', startTime: 780, endTime: 1711},
    {name: 'D', startTime: 1770, endTime: 2154},
    {name: 'D', startTime: 2156, endTime: 2311},
    {name: 'D', startTime: 2312, endTime: 2411},
    {name: 'D', startTime: 2412, endTime: 2639},


];

var board = 0;
var talk = 0;

for (var i = 0; i < dataSource.length; i++) {
    if (dataSource[i].name == 'A') {
        data1.push({
            name: tyep2name[dataSource[i].name],
            value: [2, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
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
            value: [0, dataSource[i].startTime+2, dataSource[i].endTime-2, dataSource[i].endTime - dataSource[i].startTime-4],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        });
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
        height: 250
    },
    xAxis: {
        min: 0,
        scale: true,
        max: 2639,
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 33,
        nameTextStyle: {fontSize: 18},
        interval: 377,
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
        data: [{value: '投影内容教学主题', textStyle: {fontSize: 17, color: '#000000'}},
        {value: '过渡类言语', textStyle: {fontSize: 17, color: '#000000'}},
          {value: '讲授情境切换时段', textStyle: {fontSize: 17, color: '#000000'}},
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