import React from 'react';
import Banner from './HomeComponents/Banner';
import FoodDonation from './HomeComponents/FoodDonation ';

import PublicCharityRequests from './HomeComponents/CharityRequest ';
import ImpactStats from './HomeComponents/ImpactStats';
import CommunityStories from './HomeComponents/CommunityStories';
import Footer from './Footer/Footer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FoodDonation></FoodDonation>
            <PublicCharityRequests></PublicCharityRequests>
            <ImpactStats></ImpactStats>
            <CommunityStories></CommunityStories>
            <Footer></Footer>
        </div>
    );
};

export default Home;