import * as React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    debug: state.debug.components
});

const DebugComponent = (props) => {
    const { debug, ...data} = props;

    return (
        <>
            {debug && (
                <pre>
                    {JSON.stringify(data, null, 4)}
                </pre>
            )};
        </>
    );
};

export const DebugContainer = connect(mapStateToProps)(DebugComponent);