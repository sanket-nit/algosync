import { atom } from 'recoil'

export const swappedIndicesAtom = atom<number[]>({
  key: 'swappedIndices',
  default: [-1, -1],
})

export const sortedTillIndexAtom = atom<number>({
  key: 'sortedTillIndex',
  default: 101,
})
