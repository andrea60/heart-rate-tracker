import { text } from "@fortawesome/fontawesome-svg-core";

export const lineColor = '#54546A';
export const textColor = '#cccccc';

const theme:Highcharts.Options = {
    chart:{
        backgroundColor:'transparent',
        style:{
            fontFamily:'Inter',
            color:textColor
        }
    },
    plotOptions:{
        series:{
            dataLabels: {
                
                shadow: {
                    color:'red',
                    width:2,
                    opacity:1
                },
                style: {
                    textOutline:undefined,
                    textShadow:'0px 0px 2px #222'
                }
            }
        }
    },
    yAxis:{
        gridLineColor: lineColor,
        lineColor: lineColor,
        labels: {
            style:{
                color:textColor
            }
        },
        title: {
            style:{ color: textColor }
        }
    },
    tooltip:{
        backgroundColor: '#393948',
        style: {
            color: textColor
        }
    },
    xAxis:{
        gridLineColor: lineColor,
        tickColor: lineColor,
        minorTickColor: lineColor,
        lineColor: lineColor,
        labels:{
            style:{
                color: textColor
            }
        },
        title: {
            style:{ color: textColor }
        }
    }
};
export default theme;
