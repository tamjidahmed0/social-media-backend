import { ResponsiveBar } from '@nivo/bar'


const theme = {
    textColor: '#ffffff',
    crosshair:{
        line:{
            stroke: '#fff'
        }
    },
    tooltip: {
        container: {
          background: '#ffffff' // sets the background color of the tooltip to white
        },
        basic: {
          whiteSpace: 'pre',
          color: '#000' // sets the color of the X and Y values to white
        }
      }
}


const data = [
    { food: 'hot dog', quantity: 20, price: 4.99 },
    { food: 'burger', quantity: 30, price: 7.99 },
    { food: 'sandwich', quantity: 15, price: 5.99 },
    { food: 'kebab', quantity: 10, price: 9.99 },
    { food: 'fries', quantity: 25, price: 2.99 },
    { food: 'donut', quantity: 12, price: 1.99 }
  ];
const PieChart = () => {
  return (
    <div style={{ height: '350px' }}>
        <ResponsiveBar
        data={data}
        theme={theme}
        keys={['quantity', 'price']}
        indexBy="food"
        enableGridY = {true}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
    </div>
  )
}

export default PieChart