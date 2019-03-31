import React from 'react'
import {SwipeableDrawer, List, ListItem, ListItemText} from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InfoIcon from '@material-ui/icons/Info'
import HomeIcon from '@material-ui/icons/Home'
import BarChartIcon from '@material-ui/icons/BarChart'
import BuildIcon from '@material-ui/icons/Build'
import NavigationList from './NavigationList'

class MobileDrawer extends React.Component {
    state = {
        left: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        })
    }

    render() {
        const {setView} = this.props
        const sideListSwipeable = (
            <div>
                <NavigationList setView = {setView}/>
            </div>
        )
        return (
            <div>
                {/*
				<div>
					<Grid container
						spacing={24}
						direction="column"
						alignItems="left"
						justify="space-evenly">
						<Hidden ndUp>
							<Grid item xs={12} md={12}>
								<Button onClick={this.toggleDrawer('left', true)}>OPEN SWIPE</Button>
							</Grid>
						</Hidden>
					</Grid>
				</div>
				*/}
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideListSwipeable}
                    </div>
                </SwipeableDrawer>
            </div>

        )
    }
}

export default MobileDrawer