import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

const Notification = ({ alerts }) => {
    useEffect(
        () =>
            alerts !== null &&
            alerts.length > 0 &&
            alerts.map(alert => toastr[alert.alertType](alert.msg))
    );

    return null;
};

Notification.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Notification);
