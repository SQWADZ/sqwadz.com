import { getServerAuthSession } from '@/server/auth';
import { NextResponse } from 'next/server';
import { BugReport, GameRequest, GeneralFeedback } from '@/types';

type Embed = {
  title: string;
  color: number;
  fields?: Array<{ name: string; value: string; inline?: string }>;
  author: {
    name: string;
    icon_url: string;
  };
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) return NextResponse.json({ status: 401 });

  const data = (await request.json()) as GeneralFeedback | GameRequest | BugReport;

  const title =
    data.type === 'general' ? 'General feedback' : data.type === 'game-request' ? 'Game request' : 'Bug report';
  const color = data.type === 'general' ? 7582704 : data.type === 'game-request' ? 7467132 : 15411240;

  const embed: Embed = {
    title,
    color,
    author: {
      name: session.user.name || '',
      icon_url: session.user.image || '',
    },
  };

  switch (data.type) {
    case 'general':
    case 'bug-report':
      if (!data.title) return NextResponse.json({ error: 'title_missing' });
      if (!data.comment) return NextResponse.json({ error: 'comment_missing' });

      embed.fields = [
        {
          name: data.title,
          value: data.comment,
        },
      ];
      break;
    case 'game-request':
      if (!data.game) return NextResponse.json({ error: 'game_missing' });

      embed.fields = [
        {
          value: data.game,
          name: '',
        },
      ];
  }

  try {
    await fetch(
      'https://discord.com/api/webhooks/1216751862175236128/at-R1Q9_xNvPdZdVKGLy2yJHMl5t7OJQXlAt--QeM1ldFXzAuYaVee1WhZlp70z0c0wT',
      {
        body: JSON.stringify({
          avatar_url:
            'https://cdn.discordapp.com/icons/1133247806518329484/ad2235445a047f3ab454570eeee6982a.webp?size=96',
          embeds: [embed],
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
      }
    );
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({ status: 200 });
}
