import { ExternalToast, toast } from 'sonner';

export async function notify(toastOptions: { message: React.ReactNode; data?: ExternalToast; playSound?: boolean }) {
  if (toastOptions.playSound) {
    const audio = new Audio('/notification.wav');
    audio.volume = 0.1;

    await audio.play();

    audio.remove();
  }

  toast(toastOptions.message, toastOptions.data);
}
