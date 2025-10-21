
import React from 'react';
import { RecommendedCampaign } from '../types';
import Button from './Button';

interface CampaignCardProps {
  campaign: RecommendedCampaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const fundingPercentage = campaign.fundingStatus ? (campaign.fundingStatus.current / campaign.fundingStatus.goal) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <img className="h-48 w-full object-cover" src={campaign.imageUrl} alt={campaign.name} />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-indigo-600">{campaign.causeArea}</p>
        <h3 className="mt-1 text-xl font-bold text-gray-900">{campaign.name}</h3>
        <p className="mt-2 text-sm text-gray-600 flex-grow">{campaign.description}</p>

        {/* Match Rationale */}
        <div className="mt-4 bg-indigo-50 p-3 rounded-lg">
            <h4 className="text-sm font-bold text-indigo-800">Why it's a match for you:</h4>
            <p className="text-sm text-indigo-700 mt-1">{campaign.matchRationale}</p>
        </div>

        {/* Funding Progress */}
        {campaign.fundingStatus && (
          <div className="mt-4">
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>S${campaign.fundingStatus.current.toLocaleString()}</span>
              <span>S${campaign.fundingStatus.goal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${fundingPercentage}%` }}></div>
            </div>
          </div>
        )}
        
        <div className="mt-6">
            <Button className="w-full">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
