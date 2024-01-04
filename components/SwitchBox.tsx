import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Switch } from '@/components/ui/switch';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  title: string;
  description: string;
  icon: IconProp;
  id: string;
}

const SwitchBox: React.FC<Props> = ({ title, description, icon, id }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={icon} fixedWidth />
              <label htmlFor={id} className="text-base">
                {title}
              </label>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Switch id={id} checked />
        </div>
      </div>
    </div>
  );
};

export default SwitchBox;
