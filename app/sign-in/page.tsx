'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBattleNet, faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/container';

const SignInPage: React.FC = () => {
  const params = useSearchParams();
  const [cookiesEnabled, setCookiesEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCookiesEnabled(navigator.cookieEnabled);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Container className="flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-1 flex-col gap-4 rounded-lg border-[1px] border-border p-4 shadow md:max-w-md">
        <div>
          <p className="text-xl">Sign in</p>
          <p className="text-sm text-muted-foreground">Create an account or use an existing one</p>
        </div>

        {!cookiesEnabled && (
          <div className="rounded-lg border border-destructive p-2">
            <p className="text-xs text-destructive">Cookies are disabled in your browser. Please enable to sign in.</p>
          </div>
        )}

        {params?.get('error') && (
          <div className="rounded-lg border border-destructive p-2">
            <p className="text-destructive">An unknown error occurred. Please try again.</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button
            className="flex items-center justify-start gap-2"
            onClick={() => signIn('discord', { callbackUrl: '/' })}
            variant="outline"
            disabled={!cookiesEnabled}
          >
            <div className="w-[20px]">
              <FontAwesomeIcon icon={faDiscord} size="lg" fixedWidth />
            </div>
            Discord
          </Button>
          <Button
            className="flex items-center justify-start gap-2"
            onClick={() => signIn('twitch', { callbackUrl: '/' })}
            variant="outline"
            disabled={!cookiesEnabled}
          >
            <div className="w-[20px]">
              <FontAwesomeIcon icon={faTwitch} size="lg" fixedWidth />
            </div>
            Twitch
          </Button>
          <Button
            className="flex items-center justify-start gap-2"
            onClick={() => signIn('battlenet', { callbackUrl: '/' })}
            variant="outline"
            disabled={!cookiesEnabled}
          >
            <div className="w-[20px]">
              <FontAwesomeIcon icon={faBattleNet} size="lg" fixedWidth />
            </div>
            Battle.net
          </Button>
          <Button
            className="flex items-center justify-start gap-2"
            onClick={() => signIn('epic', { callbackUrl: '/' })}
            variant="outline"
            disabled={!cookiesEnabled}
          >
            <div className="w-[20px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="21.88" height="17.5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3.537 0C2.165 0 1.66.506 1.66 1.879V18.44a4.262 4.262 0 0 0 .02.433c.031.3.037.59.316.92c.027.033.311.245.311.245c.153.075.258.13.43.2l8.335 3.491c.433.199.614.276.928.27h.002c.314.006.495-.071.928-.27l8.335-3.492c.172-.07.277-.124.43-.2c0 0 .284-.211.311-.243c.28-.33.285-.621.316-.92a4.261 4.261 0 0 0 .02-.434V1.879c0-1.373-.506-1.88-1.878-1.88zm13.366 3.11h.68c1.138 0 1.688.553 1.688 1.696v1.88h-1.374v-1.8c0-.369-.17-.54-.523-.54h-.235c-.367 0-.537.17-.537.539v5.81c0 .369.17.54.537.54h.262c.353 0 .523-.171.523-.54V8.619h1.373v2.143c0 1.144-.562 1.71-1.7 1.71h-.694c-1.138 0-1.7-.566-1.7-1.71V4.82c0-1.144.562-1.709 1.7-1.709zm-12.186.08h3.114v1.274H6.117v2.603h1.648v1.275H6.117v2.774h1.74v1.275h-3.14zm3.816 0h2.198c1.138 0 1.7.564 1.7 1.708v2.445c0 1.144-.562 1.71-1.7 1.71h-.799v3.338h-1.4zm4.53 0h1.4v9.201h-1.4zm-3.13 1.235v3.392h.575c.354 0 .523-.171.523-.54V4.965c0-.368-.17-.54-.523-.54zm-3.74 10.147a1.708 1.708 0 0 1 .591.108a1.745 1.745 0 0 1 .49.299l-.452.546a1.247 1.247 0 0 0-.308-.195a.91.91 0 0 0-.363-.068a.658.658 0 0 0-.28.06a.703.703 0 0 0-.224.163a.783.783 0 0 0-.151.243a.799.799 0 0 0-.056.299v.008a.852.852 0 0 0 .056.31a.7.7 0 0 0 .157.245a.736.736 0 0 0 .238.16a.774.774 0 0 0 .303.058a.79.79 0 0 0 .445-.116v-.339h-.548v-.565H7.37v1.255a2.019 2.019 0 0 1-.524.307a1.789 1.789 0 0 1-.683.123a1.642 1.642 0 0 1-.602-.107a1.46 1.46 0 0 1-.478-.3a1.371 1.371 0 0 1-.318-.455a1.438 1.438 0 0 1-.115-.58v-.008a1.426 1.426 0 0 1 .113-.57a1.449 1.449 0 0 1 .312-.46a1.418 1.418 0 0 1 .474-.309a1.58 1.58 0 0 1 .598-.111a1.708 1.708 0 0 1 .045 0zm11.963.008a2.006 2.006 0 0 1 .612.094a1.61 1.61 0 0 1 .507.277l-.386.546a1.562 1.562 0 0 0-.39-.205a1.178 1.178 0 0 0-.388-.07a.347.347 0 0 0-.208.052a.154.154 0 0 0-.07.127v.008a.158.158 0 0 0 .022.084a.198.198 0 0 0 .076.066a.831.831 0 0 0 .147.06c.062.02.14.04.236.061a3.389 3.389 0 0 1 .43.122a1.292 1.292 0 0 1 .328.17a.678.678 0 0 1 .207.24a.739.739 0 0 1 .071.337v.008a.865.865 0 0 1-.081.382a.82.82 0 0 1-.229.285a1.032 1.032 0 0 1-.353.18a1.606 1.606 0 0 1-.46.061a2.16 2.16 0 0 1-.71-.116a1.718 1.718 0 0 1-.593-.346l.43-.514c.277.223.578.335.9.335a.457.457 0 0 0 .236-.05a.157.157 0 0 0 .082-.142v-.008a.15.15 0 0 0-.02-.077a.204.204 0 0 0-.073-.066a.753.753 0 0 0-.143-.062a2.45 2.45 0 0 0-.233-.062a5.036 5.036 0 0 1-.413-.113a1.26 1.26 0 0 1-.331-.16a.72.72 0 0 1-.222-.243a.73.73 0 0 1-.082-.36v-.008a.863.863 0 0 1 .074-.359a.794.794 0 0 1 .214-.283a1.007 1.007 0 0 1 .34-.185a1.423 1.423 0 0 1 .448-.066a2.006 2.006 0 0 1 .025 0m-9.358.025h.742l1.183 2.81h-.825l-.203-.499H8.623l-.198.498h-.81zm2.197.02h.814l.663 1.08l.663-1.08h.814v2.79h-.766v-1.602l-.711 1.091h-.016l-.707-1.083v1.593h-.754zm3.469 0h2.235v.658h-1.473v.422h1.334v.61h-1.334v.442h1.493v.658h-2.255zm-5.3.897l-.315.793h.624zm-1.145 5.19h8.014l-4.09 1.348z"
                />
              </svg>
            </div>
            Epic Games
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;
