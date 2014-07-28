function executeMonth(){
  /**
   * チャート
   **/ 
  $.ajax({
  url: "/api/day?start=month",
  type: "GET",
  dataType: 'json',
  success: function(json){
    var data = reOrder(json);
    var startDate = Date.parse(data['datetime'][0]) + (60*60*9);

    $(function (){
      Highcharts.setOptions({
        global: { useUTC: false }
      });

      /**
       * 気温と紫外線
       **/
      $('#container7').highcharts({
        chart: { zoomType: 'x' },
        title: { text: '気温・気圧・紫外線' },
        xAxis: {
          type: 'datetime',
          tickInterval: 5 * 24 * 3600 * 1000,
          tickWidth: 0,
          gridLineWidth: 1
        },
        yAxis: [{
          title: { text: '温度(°C)' },
          opposite: true,
          max: 40,
          min: -10,
          tickInterval: 10,
          startOnTick: false,
          maxPadding: 0,
          minPadding: 0,
          plotLines:[{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },{
          title: { text: null },
          startOnTick: false,
          maxPadding: 0,
          minPadding: 0,
          max: 20,
          min: 0,
          opposite: true,
          gridLineWidth: 0, 
          labels: {
            enabled: false
          },
          plotLines:[{
            value: 0,
            width: 0,
            color: '#808080'
          }]
        },{
          title: { text: "気圧(hPa)" },
          max: 1020,
          min: 900,
          tickInterval: 30,
          startOnTick: false,
          maxPadding: 0,
          minPadding: 0
        }],
        tooltip: {
          shared: true,
          crosshairs: true
        },
        plotOptions: { series: { marker: { enabled: false }}},
        series: [{
          type: 'spline',
          tooltip: { valueSuffix: '°C' },
          pointStart: startDate,
          pointInterval: 24 * 3600 * 1000,
          name: '屋外温度',
          color: "#ffd700",
          data: data['outtemp']
        },{
          type: 'spline',
          tooltip: { valueSuffix: '°C' },
          pointStart: startDate,
          pointInterval: 24 * 3600 * 1000,
          name: '室内温度',
          color: "#4169e1",
          data: data['intemp']
        },{
          type: 'spline',
          tooltip: { valueSuffix: '°C' },
          pointStart: startDate,
          pointInterval: 24 * 3600 * 1000,
          name: '結露温度',
          data: data['dewpoint']
        },{
          type: 'column',
          yAxis: 1,
          pointStart: startDate,
          pointInterval: 24 * 3600 * 1000,
          name: 'UV Index',
          color: "#ff0000",
          pointPadding: 0,
          data: data['UV']
        },{
          type: 'line',
          yAxis: 2,
          pointStart: startDate,
          tooltip: { valueSuffix: 'hPa' },
          pointInterval: 24 * 3600 * 1000,
          name: '気圧',
          data: data['altimeter']
        }]
      });

      /**
       * 湿度と降水量
       **/
      $('#container8').highcharts({
        chart: { zoomType: 'x' },
        title: { text: '湿度と降水量' },
        xAxis: {
          type: 'datetime',
          tickInterval: 5 * 24 * 3600 * 1000,
          tickWidth: 0,
          gridLineWidth: 1
        },
        yAxis: [{
          title: { text: '湿度(%)' },
          max: 100,
          min: 0,
          tickInterval: 20,
          startOnTick: false,
          maxPadding: 0,
          minPadding: 0,
          opposite: true,
          plotLines:[{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },{
          title: { text: '降水量(mm)' },
          tickInterval: 20,
          max: 100,
          min: 0
        }],
        tooltip: {
          shared: true,
          crosshairs: true
        },
        plotOptions: { series: { marker: { enabled: false }}},
        series: [{
          type: 'spline',
          tooltip: { valueSuffix: '%' },
          pointStart: startDate,
          pointInterval: 24 * 3600 * 1000,
          name: '屋外湿度',
          color: "#ffd700",
          data: data['outhumidity']
        },{
          type: 'spline',
          tooltip: { valueSuffix: '%' },
          pointStart: startDate,
          pointInterval: 24 * 3600 * 1000,
          name: '室内湿度',
          color: "#4169e1",
          data: data['inhumidity']
        },{
          type: 'column',
          yAxis: 1,
          tooltip: { valueSuffix: 'mm' },
          pointStart: startDate,
          pointInterval: 24 * 3600 * 1000,
          name: '降水量',
          data: data['dayrain']
        }]
      });

      /**
       * 風力・風速
       **/
      $('#container9').highcharts({
        chart: { zoomType: 'x' },
        title: { text: '風速・風向' },
        xAxis: {
          type: 'datetime',
          tickInterval: 5 * 24 * 3600 * 1000,
          tickWidth: 0,
          gridLineWidth: 1
        },
        yAxis:[{
          title: { text: '風速(m/s)' },
          opposite: true,
          max: 40,
          min: 0,
          tickInterval: 10,
          startOnTick: false,
          maxPadding: 0,
          minPadding: 0,
          plotLines:[{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },{
          title: { text: '風向(°)' },
          //startOnTick: false,
          maxPadding: 0,
          minPadding: 0,
          max: 360,
          min: 0
        }],
        tooltip: {
          shared: true,
          crosshairs: true
        },
        plotOptions: { series: { marker: { enabled: false }}},
        series: [{
          type: 'column',
          yAxis: 1,
          tooltip: { valueSuffix: '°' },
          pointStart: Date.parse(data['datetime'][0]),
          pointInterval: 24 * 3600 * 1000,
          name: '風向',
          pointPadding: 0.5,
          data: data['winddir']
        },{
          type: 'line',
          tooltip: { valueSuffix: 'm/s' },
          pointStart: Date.parse(data['datetime'][0]),
          pointInterval: 24 * 3600 * 1000,
          name: '平均風速',
          data: data['windspeed']
        },{
          type: 'line',
          tooltip: { valueSuffix: 'm/s' },
          pointStart: Date.parse(data['datetime'][0]),
          pointInterval: 24 * 3600 * 1000,
          name: '瞬間最大風速',
          data: data['windgust']
        }],
      });
    });
  }
  });
}

function reOrder(data){
  var newData = new Object();
  for(var i = 0;i < data.length; i++ ){
    for(var k in data[i]){
      if(newData[k] != undefined){
        newData[k].push(data[i][k]);
      }else{
        newData[k] = new Array();
        newData[k].push(data[i][k]);
      }
    }
  }
  return newData;
}
