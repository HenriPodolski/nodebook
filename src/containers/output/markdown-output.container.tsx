import * as React from 'react';
import { connect } from 'react-redux';
import { MarkdownOutputComponent } from '../../components/output/markdown-output.component';

const mapStateToProps = (state, ownProps) => ({
    value: state.editors[ownProps.index].value
});

export const MarkdownOutputContainer = connect(mapStateToProps)(MarkdownOutputComponent);