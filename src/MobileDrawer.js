

class MobileDrawer extends React.Component {
    state = {
      open: false,
    };

    render(){
        const sideListSwipeable = (
			<div>
				<List>
					<ListItem button key={'Home'}>
						<ListItemIcon><HomeIcon /></ListItemIcon>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItem>
					<ListItem button key={'Statistics'}>
						<ListItemIcon><BarChartIcon /></ListItemIcon>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={'Statistics'} />
					</ListItem>
					<ListItem button key={'Settings'}>
						<ListItemIcon><BuildIcon /></ListItemIcon>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={'Settings'} />
					</ListItem>
					<ListItem button key={'About'}>
						<ListItemIcon><InfoIcon /></ListItemIcon>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={'About'} />
					</ListItem>
				</List>
			</div>
		)
        return(

        )
    }
}