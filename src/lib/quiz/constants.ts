export const QUIZ_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const QUIZ_STATUS_LABELS = {
  [QUIZ_STATUS.DRAFT]: 'Draft',
  [QUIZ_STATUS.PUBLISHED]: 'Published',
  [QUIZ_STATUS.ARCHIVED]: 'Archived',
} as const;

export const QUIZ_STATUS_STYLES = {
  [QUIZ_STATUS.DRAFT]: 'bg-gray-100 text-gray-800',
  [QUIZ_STATUS.PUBLISHED]: 'bg-green-100 text-green-800',
  [QUIZ_STATUS.ARCHIVED]: 'bg-yellow-100 text-yellow-800',
} as const;