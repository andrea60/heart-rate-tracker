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
