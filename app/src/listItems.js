import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReceiptIcon from '@material-ui/icons/Receipt';
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from '@material-ui/core/Link';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Invoice Manager" />
    </ListItem>


    <ListItem button component={Link} to="/mailto:arturostabl@gmail.com">
      <ListItemIcon>
        <HelpOutlineSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Support" />
    </ListItem>
    
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
