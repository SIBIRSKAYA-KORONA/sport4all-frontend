import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import PersonTableItem from 'Components/PersonTableItem/logic';

function PersonTableRender(props) {
    return (
        <table className='person-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.loading
                    ? <tr>
                        <th>Loading...</th>
                        <th>Loading...</th>
                        <th>Loading...</th>
                    </tr>
                    : props.persons.map(item =>
                        <PersonTableItem
                            key={item.name + item.surname}
                            name={item.name}
                            surname={item.surname}/>)}
            </tbody>
        </table>
    )
}

PersonTableRender.propTypes = {
    loading : propTypes.bool,
    persons : propTypes.array.isRequired,
};

export default PersonTableRender;
