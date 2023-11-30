export interface SortingAlgorithm {
  id: string
  name: string
  description: string
}

export const sortingAlgorithms: SortingAlgorithm[] = [
  {
    id: '1',
    name: 'Selection Sort',
    description: 'Iteratively selects the smallest element and swaps it with the current position.',
  },
  {
    id: '2',
    name: 'Insertion Sort',
    description:
      'Builds the final sorted array one item at a time by inserting each element into its correct position.',
  },
  {
    id: '3',
    name: 'Bubble Sort',
    description: 'Repeatedly swaps adjacent elements if they are in the wrong order.',
  },
  {
    id: '4',
    name: 'Merge Sort',
    description:
      'Divides the array into two halves, recursively sorts them, and then merges the two sorted halves.',
  },
  {
    id: '5',
    name: 'Quick Sort',
    description: 'Picks an element as a pivot and partitions the array around the pivot.',
  },
]
