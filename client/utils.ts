import { ExternalToast, toast } from 'sonner';

export function notify(toastOptions: { message: React.ReactNode; data?: ExternalToast; playSound?: boolean }) {
  if (toastOptions.playSound) {
    const audio = new Audio('/notification.wav');
    audio.volume = 0.1;

    audio.play().then(() => audio.remove());
  }

  toast(toastOptions.message, toastOptions.data);
}
