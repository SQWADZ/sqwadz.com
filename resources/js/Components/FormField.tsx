import React, { ChangeEvent } from 'react';
import { Label } from '@/Components/ui/label';
import { Input, InputProps } from '@/Components/ui/input';

interface Props {
  id: string;
  label: string;
  description?: string;
  error?: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: InputProps['type'];
}

const FormField: React.FC<Props> = ({ id, label, description, error, value, onChange, required, type }) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      <Input id={id} value={value} onChange={e => onChange(e)} type={type} />
      {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
    </div>
  );
};

export default FormField;
