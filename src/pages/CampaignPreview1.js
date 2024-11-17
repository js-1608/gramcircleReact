import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '../components/Accordion';
import CampaignCard from '../components/CampaignCard';
import { getToken } from '../utils/TokenUtils';
import apiClient from '../utils/apiService';

const CampaignPreview = () => {
  const { id } = useParams(); // Get the campaign ID from the URL
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false); // State to track wishlist status

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await apiClient.get(`/Campaign/get-campaign/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
          });
        console.log(response.data);
        setCampaign(response.data);

        // Extract creator ID from the token
        const token = getToken();
        const decodedToken = jwtDecode(token);
        const creatorId = decodedToken.id; 

      } catch (error) {
        setError('Failed to fetch campaign details');
        console.error('Error fetching campaign details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id]);

  useEffect(() => {
    const fetchCampaignStatus = async () => {
      try {
        const response = await apiClient.get(`/Campaign/CheckStatus/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        setIsInWishlist(response.data === "Wishlist");
      } catch (error) {
        console.error('Error fetching campaign status:', error.response ? error.response.data : error.message);
      }
    };

    fetchCampaignStatus();
  }, [id]);

  const handleWishlistToggle = async () => {
    const campaignId = campaign.campaignId; 

    try {
        const newStatus = "Wishlist" ? "Wishlist" : "Viewed"; 
        console.log(newStatus);
        // Now, update the status
        await apiClient.post('/Campaign/Status-Update', null, {
            params: {
                campaignId,
                status: newStatus,
                isDelete: false, // Set to false since we're updating status
            },
            headers: {
                Authorization: `Bearer ${getToken()}`, 
            },
        });

        console.log('Wishlist toggle successful');
        setIsInWishlist(newStatus === "Wishlist"); // Update the state based on the new status
    } catch (error) {
        console.error('Error updating wishlist status:', error.response ? error.response.data : error.message);
    }
};

  const handleApply = () => {
    console.log('Applied to the campaign:', campaign.id);
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Error state
  }

  if (!campaign) {
    return <div>No campaign found.</div>; // No campaign found state
  }

  return (
    <div className="w-96 mx-auto mt-10 bg-white shadow-lg rounded-lg font-sans">
      <CampaignCard campaign={campaign} /> 

      {/* Body */}
      <div className="p-6">
        {/* Brand Name */}
        <div className="mb-4">
          <p className="text-sm font-bold brand-color">Brand Name</p>
          <p className="text-gray-700">{campaign.brandName}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {campaign.criteriaNiche.map((niche, index) => (
            <div key={index} className="border-yellow-500 border text-black px-3 py-1 rounded-md text-md bg-custom-pink">
              {niche}
            </div>
          ))}
        </div>

        <div className="border-gray-300 rounded-md">
          <h2 className="text-sm font-bold brand-color">Compensations</h2>
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-gray-300">
                <td className="font-light">Creator Benefit</td>
                <td className="font-bold">: {campaign.creatorBenefit}</td>
              </tr>
              <tr className="border-gray-300">
                <td className="font-light">Fulfillment Mode</td>
                <td className="font-bold">: {campaign.creatorFulfillment}</td>
              </tr>
              <tr className="border-gray-300">
                <td className="font-light">Creator Reward</td>
                <td className="font-bold">: {campaign.creatorReward}</td>
              </tr>
              <tr>
                <td className="font-light">Reward Details</td>
                <td className="font-bold">: {campaign.creatorRewardDetails}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border-gray-300 rounded-md">
          <h2 className="text-sm font-bold brand-color">Criteria</h2>
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-gray-300">
                <td className="font-light">Age</td>
                <td className="font-bold">: {campaign.criteriaAge}</td>
              </tr>
              <tr className="border-gray-300">
                <td className="font-light">Gender</td>
                <td className="font-bold">: {campaign.criteriaGender}</td>
              </tr>
              <tr className="border-gray-300">
                <td className="font-light">Follower</td>
                <td className="font-bold">: {campaign.criteriaFollowers}</td>
              </tr>
              <tr>
                <td className="font-light">Engagement</td>
                <td className="font-bold">: {campaign.criteriaEngagement}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Accordion campaign={campaign} />
        {/* Timelines Section */}
        <div className="mb-6">
          <p className="text-sm font-bold brand-color">Timelines</p>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Campaign Period</span>
              <span>{campaign.timelines?.Campaign?.start || 'N/A'} - {campaign.timelines?.Campaign?.end || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Sign-up</span>
              <span>{campaign.timelines?.Signup?.start || 'N/A'} - {campaign.timelines?.Signup?.end || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Product delivery</span>
              <span>{campaign.timelines?.ProductDelivery?.start || 'N/A'} - {campaign.timelines?.ProductDelivery?.end || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Posting</span>
              <span>{campaign.timelines?.Posting?.start || 'N/A'} - {campaign.timelines?.Posting?.end || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Deliverable Tasks */}
        <div className="mb-6">
          <p className="text-sm font-bold brand-color mb-2">Deliverable Tasks</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(campaign.deliverableList).map(([key, value]) => (
              <div key={key} className="bg-yellow-400 border text-black px-3 py-1 rounded-md text-md">
                {key.charAt(0).toUpperCase() + key.slice(1)} - {value?.total || "no content"}
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist and Apply Buttons */}
        <div className="flex justify-between mt-4">
          <button 
            onClick={handleWishlistToggle} 
            className={`px-4 py-2 rounded-md ${isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
          <button 
            onClick={handleApply} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
