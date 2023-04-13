import fuzzysort from 'fuzzysort';
import type { ResultLineItem } from '@yal-app/types';
import { RESULTS_LIST_SIZE } from './constants';

export const filterResults = <T = ResultLineItem>({
  items,
  searchTerm,
  filter,
  type,
  maxResults = RESULTS_LIST_SIZE,
}: {
  items: T[];
  searchTerm: string;
  filter: boolean;
  type: 'plugin' | 'keyword';
  maxResults?: number;
}): T[] => {
  // if (!searchTerm || !filter) return items;
  if (type === 'keyword' && !searchTerm) return items;
  if (!filter) return items;
  if (!searchTerm) return [];
  if (searchTerm) {
    const results = fuzzysort.go(searchTerm, items, {
      keys: ['name', 'description', 'metadata'],
    });
    return results
      .map((result) => result.obj)
      .slice(0, maxResults)
      .filter(Boolean);
  }
  return [];
};
