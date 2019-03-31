import React from 'react'
import { Button, Paper, Grid, Fab} from '@material-ui/core'
import PropTypes from 'prop-types'
import { VictoryTheme, VictoryPie, VictoryChart, VictoryBar, VictoryAxis, VictoryScatter } from 'victory'
import { WordCounter } from './../utils/wordFregs.js'

const otherSample = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
      ]

const AnalysePage = (props) =>{ 
    const {state} = props
    
    //const sampleData = WordCounter(this.state.transcript);

    return(
            <div>
					<Grid container
						spacing={24}
						direction="column"
						alignItems="center"
						justify="flex-end"
					>
                    <h1>Analytics</h1>
                        <Grid item xs={12}>
                            <VictoryPie
                                innerRadius={100}
                                colorScale={["tomato", "orange", "gold", "red"]}
                                //data={sampleData}
                                data={WordCounter(state.transcript)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                        <VictoryChart
                            domainPadding={20}
                            theme={VictoryTheme.material}
                        >
                        <VictoryAxis
                            tickValues={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`$${x / 1000}k`)}
                        />
                        <VictoryBar
                           colorScale={"warm"}
                            data={otherSample}
                            x={"quarter"}
                            y={"earnings"}
                        />
                        </VictoryChart>    
                        </Grid>

					</Grid>
				</div>)
}

AnalysePage.propTypes = {
    state: PropTypes.object
}

export default AnalysePage