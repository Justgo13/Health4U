import React from 'react';
import MuiBox from '../components/MaterialUI/mui-box';

const Category = ({category}) => {
    return (
        <MuiBox>
            <h2>Viewing category {category} </h2>
        </MuiBox>
    );
}

export default Category;
