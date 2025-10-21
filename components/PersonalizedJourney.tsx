
import React from 'react';
import { PersonalizedJourney, DonorProfile } from '../types';
import CampaignCard from './CampaignCard';
import Button from './Button';

interface PersonalizedJourneyProps {
  journey: PersonalizedJourney;
  donor: DonorProfile;
  onReset: () => void;
}

const DonationTierCard: React.FC<{ tier: PersonalizedJourney['suggestedDonationTiers'][0] }> = ({ tier }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
        <div className="flex justify-between items-start">
            <h4 className="text-xl font-bold text-indigo-700">{tier.level}</h4>
            <span className="text-2xl font-bold text-gray-800">S${tier.amount}</span>
        </div>
        <p className="text-gray-600 mt-2 text-sm">{tier.description}</p>
        <p className="text-gray-800 mt-4 font-semibold text-sm flex-grow">"{tier.impact}"</p>
        <Button className="mt-4 w-full">Donate Now</Button>
    </div>
);


const JourneyStepCard: React.FC<{ step: PersonalizedJourney['engagementPlan'][0] }> = ({ step }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 flex flex-col items-center">
            <span className="text-sm font-semibold text-gray-500">WEEK</span>
            <span className="text-3xl font-bold text-indigo-600">{step.week}</span>
        </div>
        <div className="flex-grow bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-1">
                <h5 className="font-bold text-gray-800">{step.topic}</h5>
                <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{step.channel}</span>
            </div>
            <p className="text-gray-600 text-sm">{step.contentSnippet}</p>
        </div>
    </div>
);


const PersonalizedJourneyComponent: React.FC<PersonalizedJourneyProps> = ({ journey, donor, onReset }) => {
  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">{journey.welcomeMessage}</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">We've crafted a unique journey for you based on your passion for <span className="font-semibold text-indigo-600">{donor.interests.join(', ')}</span>. Let's make a difference together.</p>
      </div>

      {/* Recommended Campaigns */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Campaigns We Think You'll Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journey.recommendedCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>

      {/* Suggested Donations */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Suggested Giving Levels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {journey.suggestedDonationTiers.map(tier => (
            <DonationTierCard key={tier.level} tier={tier} />
          ))}
        </div>
      </section>

      {/* Engagement Plan */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your 4-Week Engagement Plan</h2>
        <div className="space-y-6">
            {journey.engagementPlan.map(step => (
                <JourneyStepCard key={step.week} step={step} />
            ))}
        </div>
      </section>

       <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Want to start over or change your preferences?</p>
            <Button onClick={onReset} variant="secondary">Reset My Journey</Button>
      </div>
    </div>
  );
};

export default PersonalizedJourneyComponent;
