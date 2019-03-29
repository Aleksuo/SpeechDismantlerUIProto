import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InfoIcon from '@material-ui/icons/Info'
import HomeIcon from '@material-ui/icons/Home'
import BarChartIcon from '@material-ui/icons/BarChart'
import BuildIcon from '@material-ui/icons/Build'
    
const NavigationList = ({ setView }) => {
        return (
          <List>
                <ListItem button key={'Home'} onClick={() => {return setView(0)}}>
                  <ListItemIcon><HomeIcon onClick={() => {return setView(0)}}/></ListItemIcon>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={'Home'}/>
                </ListItem>
                <ListItem button key={'Statistics'} onClick={() => {return setView(1)}}>
                  <ListItemIcon><BarChartIcon onClick={() => {return setView(1)}}/></ListItemIcon>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={'Statistics'}/>
                </ListItem>
                <ListItem button key={'Settings'} onClick={() => {return setView(2)}}>
                  <ListItemIcon><BuildIcon onClick={() => {return setView(2)}}/></ListItemIcon>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={'Settings'}/>
                </ListItem>
                <ListItem button key={'About'} onClick={() => {return setView(3)}}>
                  <ListItemIcon><InfoIcon onClick={() => {return setView(3)}}/></ListItemIcon>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={'About'}/>
                </ListItem>
              </List>

          )
}

NavigationList.propTypes = {
	setView: PropTypes.func
}

export default NavigationList