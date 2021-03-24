import * as React from 'react';
import {Typography} from 'antd'
import PropTypes from 'prop-types'

const {Title} = Typography;

function TournamentTableRender() {
    return (
        <Title level={2}>TOURNAMENT TABLE</Title>
    )
}

TournamentTableRender.propTypes = {
    tournamentData: PropTypes.object.isRequired
}

export default TournamentTableRender;

