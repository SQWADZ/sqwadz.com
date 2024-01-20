import Container from '@/components/container';
import React from 'react';

const SupportUsPage: React.FC = () => {
  return (
    <Container className="flex flex-col gap-8">
      <div className="flex flex-col gap-0">
        <p className="text-xl">Support us</p>
        <p className="sm text-muted-foreground">Enjoy what we made? Consider supporting us!</p>
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <iframe 
          id='kofiframe' 
          src='https://ko-fi.com/sqwadz/?hidefeed=true&widget=true&embed=true&preview=true'
          style={{ width: '21vw', height: '66vh', backgroundColor: 'transparent' }}
          title='sqwadz'
        />
      </div>
    </Container>
  );
};

export default SupportUsPage;