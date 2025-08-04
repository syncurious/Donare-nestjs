import { Transform } from 'class-transformer';

export const Trim = () => Transform(({ value }) => value?.trim());

export const ToLowerCase = () => Transform(({ value }) => value?.toLowerCase());

export const ToUpperCase = () => Transform(({ value }) => value?.toUpperCase()); 