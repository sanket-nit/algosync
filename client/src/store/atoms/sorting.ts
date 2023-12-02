import { atom, RecoilState } from 'recoil'

export type SortingArray = number[]

export const sortingArrayAtom: RecoilState<SortingArray> = atom<SortingArray>({
  key: 'sortingArrayAtom',
  default: [],
})
