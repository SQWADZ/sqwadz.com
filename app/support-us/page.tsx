import Container from '@/components/container';
import React from 'react';

const SupportUsPage: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-full">
        <a href="https://www.buymeacoffee.com/sqwadz">
          <img src="https://img.buymeacoffee.com/button-api/?text=Buy us a coffee&emoji=&slug=sqwadz&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
        </a>
      </div>
    </Container>
  );
};

export default SupportUsPage;
