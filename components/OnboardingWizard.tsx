
import React, { useState } from 'react';
import { DonorProfile, CauseArea, CommunicationChannel } from '../types';
import { CAUSE_AREAS } from '../constants';
import Button from './Button';

interface OnboardingWizardProps {
  onComplete: (profile: DonorProfile) => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<DonorProfile>>({
    name: '',
    language: 'English',
    location: 'Islandwide',
    interests: [],
    donationCapacity: { min: 10, max: 50 },
    preferredChannels: [],
    consent: false,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleInterestToggle = (interest: CauseArea) => {
    const currentInterests = profile.interests || [];
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    setProfile({ ...profile, interests: newInterests });
  };

  const handleChannelToggle = (channel: CommunicationChannel) => {
    const currentChannels = profile.preferredChannels || [];
    const newChannels = currentChannels.includes(channel)
      ? currentChannels.filter(c => c !== channel)
      : [...currentChannels, channel];
    setProfile({ ...profile, preferredChannels: newChannels });
  };
  
  const handleSubmit = () => {
      if (profile.name && profile.interests && profile.interests.length > 0 && profile.preferredChannels && profile.preferredChannels.length > 0 && profile.consent) {
        onComplete(profile as DonorProfile);
      } else {
          alert("Please fill out all required fields and give consent to proceed.");
      }
  };

  const ProgressIndicator = () => (
    <div className="flex justify-center mb-8">
        {[1, 2, 3, 4].map(num => (
            <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {num}
                </div>
                {num < 4 && <div className={`w-16 h-1 ${step > num ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>}
            </div>
        ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <ProgressIndicator />
      
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome! Let's get started.</h2>
          <p className="text-gray-600 mb-6">Tell us a bit about yourself to personalize your journey.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">What should we call you?</label>
              <input type="text" id="name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Alex"/>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Where are you based in Singapore?</label>
              <select id="location" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option>Islandwide</option>
                <option>Central Singapore</option>
                <option>North East</option>
                <option>North West</option>
                <option>South East</option>
                <option>South West</option>
              </select>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Button onClick={nextStep} disabled={!profile.name}>Next</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">What causes are you passionate about?</h2>
            <p className="text-gray-600 mb-6">Select one or more areas that resonate with you.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CAUSE_AREAS.map(interest => (
                    <button key={interest} onClick={() => handleInterestToggle(interest)} className={`p-4 rounded-lg text-center font-semibold border-2 transition-all ${profile.interests?.includes(interest) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400'}`}>
                        {interest}
                    </button>
                ))}
            </div>
            <div className="mt-8 flex justify-between">
                <Button onClick={prevStep} variant="secondary">Back</Button>
                <Button onClick={nextStep} disabled={!profile.interests || profile.interests.length === 0}>Next</Button>
            </div>
        </div>
      )}
      
      {step === 3 && (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Giving Preference</h2>
            <p className="text-gray-600 mb-6">What's a comfortable monthly donation range for you? This helps us suggest suitable giving levels.</p>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">I'm thinking of donating around S$ {profile.donationCapacity?.max} per month.</label>
                     <input type="range" min="10" max="500" step="10" value={profile.donationCapacity?.max} onChange={e => setProfile({...profile, donationCapacity: {min: 10, max: parseInt(e.target.value, 10)}})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>S$10</span>
                        <span>S$500</span>
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold text-gray-800">How would you like to hear from us?</h3>
                     <p className="text-gray-600 mb-4">Choose your preferred channels.</p>
                     <div className="flex flex-wrap gap-4">
                        {Object.values(CommunicationChannel).map(channel => (
                             <button key={channel} onClick={() => handleChannelToggle(channel)} className={`px-4 py-2 rounded-full font-medium border-2 transition-all ${profile.preferredChannels?.includes(channel) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400'}`}>
                                {channel}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
             <div className="mt-8 flex justify-between">
                <Button onClick={prevStep} variant="secondary">Back</Button>
                <Button onClick={nextStep} disabled={!profile.preferredChannels || profile.preferredChannels.length === 0}>Next</Button>
            </div>
        </div>
      )}
      
      {step === 4 && (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Privacy and Consent</h2>
            <p className="text-gray-600 mb-6">We respect your privacy. Please review and confirm to continue.</p>
            <div className="bg-gray-100 p-4 rounded-lg space-y-4 text-sm text-gray-700">
                <p>By checking the box below, you agree to the following:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>I consent to my profile data (name, interests, location, giving preferences) being processed to generate a personalized donor journey.</li>
                    <li>I agree to receive communications through my selected channels (Email, Push Notifications, SMS).</li>
                    <li>I understand that this is a prototype and my data will be used for demonstration purposes only, adhering to PDPA principles.</li>
                </ul>
            </div>
            <div className="mt-6 flex items-center">
                <input type="checkbox" id="consent" checked={profile.consent} onChange={e => setProfile({...profile, consent: e.target.checked})} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">I have read and agree to the terms.</label>
            </div>
             <div className="mt-8 flex justify-between">
                <Button onClick={prevStep} variant="secondary">Back</Button>
                <Button onClick={handleSubmit} disabled={!profile.consent}>Create My Journey</Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingWizard;
