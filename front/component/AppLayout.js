import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => (
    <h1>AppLayout</h1>
);

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AppLayout;