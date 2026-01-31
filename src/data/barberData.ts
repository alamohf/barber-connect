import { HaircutStyle, BeardStyle } from '@/types/barber';
import teste from '@/images/teste.jpeg';
import teste2 from '@/images/teste2.jpeg';

export const haircutStyles: HaircutStyle[] = [
  {
    id: 'social',
    name: 'Social',
    icon: 'User',
    description: 'Corte clássico e elegante',
    defaultImage: '/images/haircuts/social.jpg',
  },
  {
    id: 'fade',
    name: 'Degradê',
    icon: 'TrendingDown',
    description: 'Corte com transição suave',
    defaultImage: '/images/haircuts/fade.jpg',
  },
];

export const beardStyles: BeardStyle[] = [
  {
    id: 'social',
    name: 'Barba Social',
    icon: 'User',
    description: 'Barba alinhada e clássica',
    defaultImage: '/images/beards/full.jpg',
  },
  {
    id: 'fade-beard',
    name: 'Degradê',
    icon: 'TrendingDown',
    description: 'Transição suave do cabelo',
    defaultImage: '/images/beards/fade-beard.jpg',
  },
  {
    id: 'clean',
    name: 'Limpa',
    icon: 'Sparkles',
    description: 'Rosto completamente liso',
    defaultImage: '/images/beards/clean.jpg',
  },
  {
    id: 'goatee',
    name: 'Cavanhaque',
    icon: 'Triangle',
    description: 'Apenas queixo e bigode',
    defaultImage: '/images/beards/goatee.jpg',
  },
];

export const cuttingMethods = [
  { id: 'scissors', label: 'Tesoura', icon: 'Scissors', backgroundImage: teste },
  { id: 'machine', label: 'Máquina', icon: 'Zap', backgroundImage: teste2 },
] as const;

export const machineHeights = [
  { id: '0.5', label: '0.5', icon: 'Ruler' },
  { id: '1.0', label: '1.0', icon: 'Ruler' },
  { id: '1.5', label: '1.5', icon: 'Ruler' },
  { id: '2', label: '2', icon: 'Ruler' },
  { id: '3', label: '3', icon: 'Ruler' },
  { id: '4', label: '4', icon: 'Ruler' },
] as const;

export const scissorHeights = [
  { id: 'high', label: 'Alto', icon: 'ArrowUp' },
  { id: 'medium', label: 'Médio', icon: 'Minus' },
  { id: 'low', label: 'Baixo', icon: 'ArrowDown' },
] as const;

export const sideStyles = [
  { id: 'zero', label: '0', icon: 'Circle' },
  { id: 'zero_half', label: '0.5', icon: 'Disc' },
  { id: 'razor', label: 'Navalhado', icon: 'Slash' },
] as const;

export const fadeTypes = [
  { id: 'high', label: 'High Fade', icon: 'ArrowUp', description: 'Degradê alto' },
  { id: 'mid', label: 'Mid Fade', icon: 'Minus', description: 'Degradê médio' },
  { id: 'low', label: 'Low Fade', icon: 'ArrowDown', description: 'Degradê baixo' },
] as const;

export const finishStyles = [
  { id: 'natural', label: 'Natural', icon: 'Leaf' },
  { id: 'defined', label: 'Marcado', icon: 'Target' },
] as const;

export const beardHeights = [
  { id: 'short', label: 'Curta', icon: 'Minus' },
  { id: 'medium', label: 'Média', icon: 'Equal' },
  { id: 'long', label: 'Longa', icon: 'Menu' },
] as const;

export const beardContours = [
  { id: 'natural', label: 'Natural', icon: 'Leaf' },
  { id: 'defined', label: 'Marcado', icon: 'Target' },
] as const;
