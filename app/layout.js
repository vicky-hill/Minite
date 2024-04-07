import Protect from '@/components/layout/Protect';
import { EventContextProvider } from '@/context/EventContext';
import { ImageContextProvider } from '@/context/ImageContext';
import { UserContextProvider } from '@/context/UserContext';
import '@/sass/main.scss'

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          <EventContextProvider>
            <ImageContextProvider>
              <Protect>
                {children}
              </Protect>
            </ImageContextProvider>
          </EventContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
