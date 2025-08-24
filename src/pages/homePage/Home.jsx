import React from 'react';
import Banner from './HomeComponents/Banner';
import FoodDonation from './HomeComponents/FoodDonation ';
import CharityRequest from './HomeComponents/CharityRequest ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FoodDonation></FoodDonation>
            <CharityRequest></CharityRequest>
        </div>
    );
};

export default Home;