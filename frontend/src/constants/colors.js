/*
Purpose
Maps semantic status names to Tailwind color tokens so Badge and
StatisticCard components stay visually consistent everywhere.

Future Features
- None expected; extend cautiously to avoid inconsistent colors.
*/

export const STATUS_COLOR_CLASSES = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
}
