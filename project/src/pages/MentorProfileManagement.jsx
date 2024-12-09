
import React, { useState } from 'react';
import { Button, Paper } from '@mui/material';
import PersonalInformationSection from '../components/EditMentor/PersonalInformationSection';
import AchievementsSection from '../components/EditMentor/AcheivementsSection';
import ResourcesSection from '../components/EditMentor/ResourcesSection';
import ScheduledEventsSection from '../components/EditMentor/ScheduledEventsSection';

const sections = [
  { name: 'Personal Info', key: 'personal' },
  { name: 'Achievements', key: 'achievements' },
  { name: 'Resources', key: 'resources' },
  { name: 'Scheduled Events', key: 'events' },
];

export default function EditProfileForm() {
  const [activeSection, setActiveSection] = useState('personal');

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInformationSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'resources':
        return <ResourcesSection />;
      case 'events':
        return <ScheduledEventsSection />;
      default:
        return <PersonalInformationSection />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
      {renderSection()}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
  <div className='flex gap-20'>
  <Button
  variant="contained"
  color="primary"
  disabled={activeSection === 'personal'}
  onClick={() => {
    const currentIndex = sections.findIndex(section => section.key === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].key); 
    }
  }}
>
  Back
</Button>

        <Button
          variant="contained"
          color="secondary"
          disabled={activeSection === 'events'}
          onClick={() => {
            const nextIndex = sections.findIndex(section => section.key === activeSection) + 1;
            if (nextIndex < sections.length) setActiveSection(sections[nextIndex].key);
          }}
        >
          Next
        </Button>
  </div>
      
      </div>
    </div>
    
  );
}
