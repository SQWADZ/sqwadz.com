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
        <a href="https://www.buymeacoffee.com/sqwadz">
          <img src="https://img.buymeacoffee.com/button-api/?text=Buy us a coffee&emoji=&slug=sqwadz&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
        </a>
      </div>
    </Container>
  );
};

export default SupportUsPage;
