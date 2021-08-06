import theme from './theme';

export const bgColor = color => ({ theme }) => theme.colors.background[color];
export const accent = color => ({ theme }) => theme.colors.accent[color];
export const text = color => ({ theme }) => theme.colors.text[color];
export const border = color => ({ theme }) => theme.colors.border[color];

export const breakpoint = breakpointIndex => theme.breakpoints[breakpointIndex];
