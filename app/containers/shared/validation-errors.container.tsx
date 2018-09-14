import { connect } from 'react-redux';
import { ValidationErrorsComponent } from '../../components/shared/validation-errors.component';

const mapStateToProps = (state, ownProps) => ({
    cssClasses: ownProps.cssClasses || '',
    validationErrors: state[ownProps.validate] &&
                      state[ownProps.validate][ownProps.index] &&
                      state[ownProps.validate][ownProps.index].errors &&
                     (state[ownProps.validate][ownProps.index].errors[ownProps.validateKey] || []),
    index: ownProps.index
});

export const ValidationErrorsContainer = connect(mapStateToProps)(ValidationErrorsComponent);