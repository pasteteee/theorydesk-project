import { TBoardState } from '@/types';

export const INITIAL_DATA: TBoardState = {
  columns: {
    pro: {
      id: 'pro',
      title: 'Evidence For',
      facts: [
        { id: '1', content: 'Luffy is Joyboy reincarnation', score: 10, type: 'pro' },
        { id: '2', content: 'Gomu Gomu no Mi is actually Hito Hito no Mi, Model: Nika', score: 15, type: 'pro' },
      ],
    },
    con: {
      id: 'con',
      title: 'Evidence Against',
      facts: [
        { id: '3', content: 'Shanks is the final villain', score: 5, type: 'con' },
      ],
    },
  },
};
