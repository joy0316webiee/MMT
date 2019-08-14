import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as fuse from '@fuse';

import * as Actions from './store/actions/index';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';

const { FuseScrollbars }: any = fuse;

const useStyles = makeStyles(theme => ({
  root: {
    width: 280
  }
}));

const QuickPanel: FC = () => {
  const dispatch = useDispatch();
  const state = useSelector(({ quickPanel }: any) => quickPanel.state);

  const classes = useStyles();

  return (
    <Drawer
      classes={{ paper: classes.root }}
      open={state}
      anchor="right"
      onClose={ev => dispatch(Actions.toggleQuickPanel())}
    >
      <FuseScrollbars>
        <Typography>Quick Panel</Typography>
      </FuseScrollbars>
    </Drawer>
  );
};

export default withReducer('quickPanel', reducer)(QuickPanel);
