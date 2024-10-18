import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Message, User } from '@/types';

const messagesAtom = atom<Message[]>([]);
const membersAtom = atom<User[]>([]);

export const useMembers = () => useAtomValue(membersAtom);
export const useSetMembers = () => useSetAtom(membersAtom);

export const useMessages = () => useAtomValue(messagesAtom);
export const useSetMessages = () => useSetAtom(messagesAtom);
