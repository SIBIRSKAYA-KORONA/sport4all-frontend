import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfilePageRender from './render.tsx';
import { loginUser } from 'Store/User/UserActions';

class ProfilePage extends React.Component {
    render = () => (
        <ProfilePageRender
            {...this.state}
            {...this.props}
        />
    );
}

ProfilePage.propTypes = {
    history: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(ProfilePage);
