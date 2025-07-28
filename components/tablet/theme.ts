//theme.ts

export type Theme = {
  name: string;
  bg: string;
  surface: string;
  surfaceHover: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  header: string;
};

const themes: Record<string, Theme> = {
  'matte-black': {
    name: 'Matte Black',
    bg: 'bg-neutral-950',
    surface: 'bg-neutral-900',
    surfaceHover: 'bg-neutral-800',
    border: 'border-neutral-800',
    text: 'text-neutral-50',
    textMuted: 'text-neutral-400',
    accent: 'bg-neutral-800',
    header: 'bg-neutral-800'
  },
  'nord': {
    name: 'Nord',
    bg: 'bg-slate-900',
    surface: 'bg-slate-800',
    surfaceHover: 'bg-slate-700',
    border: 'border-slate-700',
    text: 'text-slate-100',
    textMuted: 'text-slate-400',
    accent: 'bg-slate-600',
    header: 'bg-slate-700'
  },
  'dracula': {
    name: 'Dracula',
    bg: 'bg-purple-950',
    surface: 'bg-purple-900',
    surfaceHover: 'bg-purple-800',
    border: 'border-purple-800',
    text: 'text-purple-100',
    textMuted: 'text-purple-300',
    accent: 'bg-purple-700',
    header: 'bg-purple-800'
  }
};

export default themes;


// const themes = {
//     'matte-black': {
//       name: 'Matte Black',
//       bg: 'bg-neutral-950',
//       surface: 'bg-neutral-900',
//       surfaceHover: 'bg-neutral-800',
//       border: 'border-neutral-800',
//       text: 'text-neutral-50',
//       textMuted: 'text-neutral-400',
//       accent: 'bg-neutral-800',
//       header: 'bg-neutral-800'
//     },
//     'nord': {
//       name: 'Nord',
//       bg: 'bg-slate-900',
//       surface: 'bg-slate-800',
//       surfaceHover: 'bg-slate-700',
//       border: 'border-slate-700',
//       text: 'text-slate-100',
//       textMuted: 'text-slate-400',
//       accent: 'bg-slate-600',
//       header: 'bg-slate-700'
//     },
//     'dracula': {
//       name: 'Dracula',
//       bg: 'bg-purple-950',
//       surface: 'bg-purple-900',
//       surfaceHover: 'bg-purple-800',
//       border: 'border-purple-800',
//       text: 'text-purple-100',
//       textMuted: 'text-purple-300',
//       accent: 'bg-purple-700',
//       header: 'bg-purple-800'
//     }
//   };

// export default themes;