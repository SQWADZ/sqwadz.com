import React from 'react';
import SwitchBox from '@/components/SwitchBox';
import { faBell, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

const ChatSettingsModal: React.FC = () => {
  const [enableNotification, setEnableNotification] = React.useState(
    !(localStorage.getItem('sqwadz.enable-notifications') === 'false')
  );
  const [enableSound, setEnableSound] = React.useState(!(localStorage.getItem('sqwadz.enable-sound') === 'false'));

  return (
    <div className="flex flex-col gap-4">
      <SwitchBox
        title="Enable notifications"
        description="Send a notification when a user joins/leaves a room"
        icon={faBell}
        id="enable-notification"
        checked={enableNotification}
        onCheckedChange={(val) => {
          setEnableNotification(val);
          localStorage.setItem('sqwadz.enable-notifications', `${val}`);
        }}
      />
      <SwitchBox
        title="Enable sound"
        description="Play a sound when receiving a notification"
        icon={faVolumeHigh}
        id="enable-sound"
        checked={enableSound}
        onCheckedChange={(val) => {
          setEnableSound(val);
          localStorage.setItem('sqwadz.enable-sound', `${val}`);
        }}
      />
    </div>
  );
};

export default ChatSettingsModal;
