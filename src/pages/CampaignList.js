import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ListDropdown from '../components/ListDropdown';
import WishlistCampagin from '../components/WishlistCampigns';
import { getToken } from '../utils/TokenUtils';
import apiClient from '../utils/apiService';

const CampaignList = () => {
  const { listName } = useParams();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiClient.get(`Campaign/get-campaign-list`, {
          params: { listName },
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        console.log('Raw response:', response.data);
        setCampaigns(response.data);
      } catch (error) {
        setError('Failed to fetch campaigns');
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserDetails();
  }, [listName]);

  const handleDeleteCampaign = async (campaignId) => {
    try {
        await apiClient.post('/Campaign/update-wishlist', null, {
            params: {
                campaignId: campaignId,
                isDelete: true
            },
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });

        console.log('Wishlist toggle successful');

        setCampaigns((prevCampaigns) => 
            prevCampaigns.filter(campaign => campaign.campaignId !== campaignId)
        );
    } catch (error) {
        console.error('Error updating wishlist status:', error.response ? error.response.data : error.message);
    }
  };

  const reset = () => {
    setError(null);
    setCampaigns([]);
     // Reset the error state
  };

  const handleCardClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
    // todo delete from wishlist
    
  };

  if (loading) {
    return(
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
    ); 
  }

  return (
    <div>
      <ListDropdown onChange={reset} />
      {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
      {campaigns.length === 0 ? (
        <div>No campaigns in your list.</div>
      ) : (
        campaigns.map((campaign) => (
          <div key={campaign.campaignId} onClick={() => handleCardClick(campaign.campaignId)}>
            <WishlistCampagin 
              campaign={campaign} 
              onDelete={handleDeleteCampaign}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CampaignList;
