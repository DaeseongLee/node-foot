import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import wrapper from '../store/configureStore';

const NodeFoot = ({ Component }) => {
    return (
        <>
            <Head>
                <title>FootBall</title>
            </Head>
            <Component />
        </>
    )
};

NodeFoot.propTypes = {
    Component: PropTypes.elementType.isRequired
}
export default wrapper.withRedux(NodeFoot);
