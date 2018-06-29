import * as React from 'react';
import { connect } from 'react-redux';
import { OutputComponent } from '../../components/output/output.component';

const mapStateToProps = (state, ownProps) => ({
    value: state.editors[ownProps.index].value,
    mode: state.editors[ownProps.index].mode
});

export const OutputContainer = connect(mapStateToProps)(OutputComponent);