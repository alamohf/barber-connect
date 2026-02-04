import { HaircutStyle, BeardStyle } from '@/types/barber';
import teste from '@/images/teste.jpeg';
import teste2 from '@/images/teste2.jpeg';

export const haircutStyles: HaircutStyle[] = [
  {
    id: 'social',
    name: 'Social',
    icon: 'User',
    description: 'Corte clássico e elegante',
    defaultImage: '/placeholder.svg',
  },
  {
    id: 'fade',
    name: 'Degradê',
    icon: 'TrendingDown',
    description: 'Corte com transição suave',
    defaultImage: '/placeholder.svg',
  },
];

export const beardStyles: BeardStyle[] = [
  {
    id: 'social',
    name: 'Barba Social',
    icon: 'User',
    description: 'Barba alinhada e clássica',
    defaultImage: '/placeholder.svg',
  },
  {
    id: 'fade-beard',
    name: 'Degradê',
    icon: 'TrendingDown',
    description: 'Transição suave do cabelo',
    defaultImage: '/placeholder.svg',
  },
  {
    id: 'clean',
    name: 'Limpa',
    icon: 'Sparkles',
    description: 'Rosto completamente liso',
    defaultImage: '/placeholder.svg',
  },
  {
    id: 'goatee',
    name: 'Cavanhaque',
    icon: 'Triangle',
    description: 'Apenas queixo e bigode',
    defaultImage: '/placeholder.svg',
  },
];

export const cuttingMethods = [
  { id: 'scissors', label: 'Tesoura', icon: 'Scissors', backgroundImage: teste },
  { id: 'machine', label: 'Máquina', icon: 'Zap', backgroundImage: teste2 },
] as const;

export const machineHeights = [
  { id: '0.5', label: '0.5', icon: 'Ruler', defaultImage: '/placeholder.svg' },
  { id: '1.0', label: '1.0', icon: 'Ruler', defaultImage: '/placeholder.svg' },
  { id: '1.5', label: '1.5', icon: 'Ruler', defaultImage: '/placeholder.svg' },
  { id: '2', label: '2', icon: 'Ruler', defaultImage: '/placeholder.svg' },
  { id: '3', label: '3', icon: 'Ruler', defaultImage: '/placeholder.svg' },
  { id: '4', label: '4', icon: 'Ruler', defaultImage: '/placeholder.svg' },
] as const;

export const scissorHeights = [
  { id: 'high', label: 'Alto', icon: 'ArrowUp', defaultImage: '/placeholder.svg' },
  { id: 'medium', label: 'Médio', icon: 'Minus', defaultImage: '/placeholder.svg' },
  { id: 'low', label: 'Baixo', icon: 'ArrowDown', defaultImage: '/placeholder.svg' },
] as const;

export const sideStyles = [
  { id: 'zero', label: '0', icon: 'Circle', defaultImage: '/placeholder.svg' },
  { id: 'zero_half', label: '0.5', icon: 'Disc', defaultImage: '/placeholder.svg' },
  { id: 'razor', label: 'Navalhado', icon: 'Slash', defaultImage: '/placeholder.svg' },
] as const;

export const fadeTypes = [
  { id: 'high', label: 'High Fade', icon: 'ArrowUp', description: 'Degradê alto', defaultImage: '/placeholder.svg' },
  { id: 'mid', label: 'Mid Fade', icon: 'Minus', description: 'Degradê médio', defaultImage: '/placeholder.svg' },
  { id: 'low', label: 'Low Fade', icon: 'ArrowDown', description: 'Degradê baixo', defaultImage: '/placeholder.svg' },
] as const;

export const finishStyles = [
  { id: 'natural', label: 'Natural', icon: 'Leaf', defaultImage: '/placeholder.svg' },
  { id: 'defined', label: 'Marcado', icon: 'Target', defaultImage: '/placeholder.svg' },
] as const;

export const beardHeights = [
  { id: 'short', label: 'Curta', icon: 'Minus', defaultImage: '/placeholder.svg' },
  { id: 'medium', label: 'Média', icon: 'Equal', defaultImage: '/placeholder.svg' },
  { id: 'long', label: 'Longa', icon: 'Menu', defaultImage: '/placeholder.svg' },
] as const;

export const beardContours = [
  { id: 'natural', label: 'Natural', icon: 'Leaf', defaultImage: '/placeholder.svg' },
  { id: 'defined', label: 'Marcado', icon: 'Target', defaultImage: '/placeholder.svg' },
] as const;

