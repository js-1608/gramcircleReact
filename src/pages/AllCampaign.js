import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from "react-tinder-card";
import Card from '../components/Card';
import { getToken } from '../utils/TokenUtils';
import apiClient from '../utils/apiService';

const AllCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [campaignId, setCampaignId] = useState();
  const [isApplied, setIsApplied] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await apiClient.get('/Campaign/get-campaigns', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        console.log(response.data.map(item => item.campaign));
        setCampaigns(response.data.map(item => item.campaign));
        
      } catch (error) {
        setError('Failed to fetch campaigns');
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);
  const navigate = useNavigate();

  const handleParticipate = async () => {
    if(campaignId){
      try {
        await apiClient.post('/Campaign/update-status', null, {
          params: {
            campaignId: campaignId,
            status: "Applied"
        },
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
      });
      setIsApplied(!isApplied);
      console.log("Applied");
      // Optionally, you can show a success message or update the UI
    } catch (error) {
      console.error("Error applying to the campaign:", error);
      // Optionally, handle the error (e.g., show a notification)
    }
  }
  };
  
  const handleDetail = () => {
    if (campaignId) {
      navigate(`/campaign/${campaignId}`);
    }
  }

  const handleWishlistToggle = async () => {
    if(campaignId){
      try {
        console.log(isInWishlist);
        await apiClient.post('/Campaign/update-wishlist', null, {
            params: {
                campaignId: campaignId,
                isDelete: isInWishlist
            },
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });

        console.log('Wishlist toggle successful');
        setIsInWishlist(!isInWishlist);
      } catch (error) {
          console.error('Error updating wishlist status:', error.response ? error.response.data : error.message);
      }
    }
  }



  const swiped = (direction, card) => {
    console.log("removing: " + card.brandName);
    setCampaignId(card.campaignId);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {/* Header */}
      <div className="text-left mt-4 mb-4 w-full max-w-md">
        <h1 className="text-xl font-semibold">Hi, {username}</h1>
        <p className="text-gray-500">Start Collaborating with local brands</p>
      </div>

      {/* Campaign Card */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[290px] overflow-y-auto" ref={containerRef} style={{ maxHeight: '450px' }}>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          <div className="relative flex justify-center items-center h-96 m-auto overflow-hidden">
            <div className="absolute top-0 left-0 w-full ">
              {campaigns.map((card) => (
                <TinderCard
                  className="swipe absolute"
                  key={card.campaignId}
                  onSwipe={(dir) => {
                    swiped(dir, card);
                    setCampaignId(card.campaignId);
                  }}
                  onCardLeftScreen={() => outOfFrame(card.brandName)}
                >
                  <Card card={card} />
                </TinderCard>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="bottom-0 flex items-center justify-evenly w-full max-w-md p-4 bg-white border-t border-gray-300">
        <button className="flex items-center justify-around w-10 h-10 bg-purple-700 text-white rounded-full hover:bg-purple-100" onClick={handleDetail} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18M3 8h18M3 13h18M3 18h18"
            />
          </svg>
        </button>
        <button className="flex bg-purple-900 items-center justify-center text-white bg-gray-100 rounded-full px-8 py-2" onClick={handleParticipate}>
          Participate
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-pink-700 text-center rounded-full hover:bg-purple-100" onClick={handleWishlistToggle}>
          <img src="../header_icons/heart.png" className="material-icons " />
        </button>
      </div>

    </div>
  );
};

export default AllCampaign;
