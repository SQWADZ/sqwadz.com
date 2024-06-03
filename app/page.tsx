import React from 'react';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';

const HeroPage: React.FC = async () => {
  const session = await getServerAuthSession();

  return (
    <Container className="flex flex-1 flex-col-reverse items-center justify-center gap-12 md:flex-row">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-[0.3] md:items-start">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-center text-4xl md:text-left">
            Finding groups has <span className="font-bold text-primary">never</span> been easier
          </p>
          <p className="text-sm text-muted-foreground">Browse games, select a room, join the group.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/games">
            <Button variant="secondary">Browse games</Button>
          </Link>
          <Link href={session?.user ? '/games' : '/sign-in'}>{session?.user ? null : <Button>Sign in</Button>}</Link>
        </div>
      </div>
      <div className="flex items-center md:flex-[0.7] md:justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="400"
          height="400"
          viewBox="0.00 0.00 800.00 800.00"
        >
          <path
            className="fill-secondary-foreground"
            d="
              M 522.01 355.43
              Q 521.80 355.49 521.60 355.45
              Q 521.25 355.37 521.29 355.02
              Q 522.41 344.17 521.05 331.86
              C 518.16 305.68 505.59 284.76 484.03 270.95
              C 471.97 263.23 457.95 257.31 443.93 257.21
              Q 419.67 257.05 406.68 275.72
              C 395.11 292.35 407.97 313.92 417.65 327.75
              C 429.98 345.38 444.00 362.17 458.29 378.46
              A 0.32 0.32 0.0 0 1 458.05 379.00
              L 318.79 379.00
              Q 318.33 379.00 318.06 378.62
              C 304.46 359.66 293.44 339.85 286.02 317.76
              Q 282.46 307.19 281.48 298.30
              C 277.29 260.41 296.13 228.39 320.80 200.98
              Q 336.73 183.26 356.44 170.87
              Q 387.42 151.40 425.80 149.76
              Q 474.77 147.68 520.96 168.78
              C 555.42 184.53 587.26 208.14 608.25 239.60
              Q 643.83 292.90 632.53 358.87
              Q 632.44 359.41 631.90 359.45
              Q 630.32 359.58 628.75 359.52
              Q 577.05 357.59 522.75 355.42
              Q 522.59 355.41 522.43 355.40
              Q 522.22 355.38 522.01 355.43
              Z"
          />
          <path
            className="fill-secondary-foreground"
            d="
              M 392.31 650.35
              C 364.19 650.46 335.83 643.62 309.61 632.63
              Q 272.29 616.99 240.52 592.87
              C 210.42 570.02 184.73 540.09 172.92 504.01
              Q 159.73 463.71 171.30 420.79
              Q 171.87 418.68 172.66 416.73
              Q 172.85 416.24 173.36 416.37
              C 173.67 416.44 173.86 416.54 174.21 416.56
              Q 231.47 419.42 286.81 422.09
              A 0.68 0.67 8.9 0 1 287.43 422.94
              Q 283.05 439.09 284.11 454.55
              C 285.87 480.26 300.37 501.33 320.88 516.29
              Q 341.81 531.54 363.15 538.50
              C 375.62 542.56 390.35 543.91 402.16 538.77
              Q 416.65 532.47 424.10 518.42
              C 431.39 504.67 422.85 488.16 414.24 475.70
              C 400.34 455.57 383.89 437.38 367.80 418.47
              Q 362.86 412.67 355.79 402.43
              Q 355.50 402.00 356.02 402.00
              L 494.57 402.00
              A 2.40 2.39 70.6 0 1 496.44 402.90
              Q 506.61 415.66 517.51 430.84
              Q 528.98 446.83 535.25 460.23
              C 549.64 490.98 552.37 524.84 538.24 555.50
              C 528.79 576.01 513.82 595.15 497.23 610.10
              Q 452.87 650.11 392.31 650.35
              Z"
          />
        </svg>
      </div>
    </Container>
  );
};

export default HeroPage;
