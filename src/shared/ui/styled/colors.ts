// export enum EColors {
//   white = '#ffffff',
//   black = '#000000',
//   transparent = 'transparent',
//   background = '#F6F7F8',

//   red_100 = '#FBECEB',
//   red_300 = '#F11B5B',
//   red_400 = '#E41E1E',

//   green_100 = '#E9F1E4',
//   green_200 = '#1D9D3A',
//   green_300 = '#699F4C',

//   orange_100 = '#FEF6E1',
//   orange_300 = '#FC9305',

//   primary_100 = '#E8F0FF',
//   primary_200 = '#AFC8FF',
//   primary_300 = '#6F8BF2',

//   neutral_100 = '#FFFFFF',
//   neutral_200 = '#F5F6F6',
//   neutral_300 = '#A4A4B7',
//   neutral_400 = '#A3A4A4',
//   neutral_500 = '#6C6C6C',
//   neutral_600 = '#585B7B',
//   neutral_700 = '#000E1C',

//   neutral_E6E6F7 = '#E6E6F7',

//   font_dark_blue = '#0B0C22',
//   light_blue = '#C6D6F5',

//   bottom_tab = '#0B0C22B2',
//   input = '#2F3347',
//   placeholder = '#444444',
//   placeholder_light = '#767676',
//   light_opacity = '#E6E6F7E6',
//   blue_opacity = '#0B0C22E6',
//   placeholder_dark = '#555558',
//   secondary_blue = '#232438',
//   // light_opacity = '#E6E6F74D',
//   last_time = '#3872E4',
//   other_message = '#E9E9E9',
//   ruby_chat_button = '#22E8D5',
//   red_15 = '#F45C4D26',
// }

export enum EColors {
  // Base Colors
  white = '#FFFFFF',
  black = '#000000',
  transparent = 'transparent',

  // Primary Blues (Main Brand Colors)
  primary_50 = '#E8F3FF',
  primary_100 = '#C7E2FF',
  primary_200 = '#96C8FF',
  primary_300 = '#5DA9FF',
  primary_400 = '#2A86F5', // Main primary color
  primary_500 = '#0A66D9',
  primary_600 = '#0850B3',
  primary_700 = '#063D8C',

  // Neutral Greys (Text & Backgrounds)
  neutral_50 = '#F9FAFB',
  neutral_100 = '#F3F4F6',
  neutral_200 = '#E5E7EB',
  neutral_300 = '#D1D5DB',
  neutral_400 = '#9CA3AF',
  neutral_500 = '#6B7280', // Secondary text
  neutral_600 = '#4B5563', // Main text
  neutral_700 = '#374151', // Headings
  neutral_800 = '#1F2937',
  neutral_900 = '#111827',

  // Success Greens (Learning Progress, Correct Answers)
  green_50 = '#F0FDF4',
  green_100 = '#DCFCE7',
  green_200 = '#BBF7D0',
  green_300 = '#86EFAC',
  green_400 = '#4ADE80', // Success main
  green_500 = '#22C55E',
  green_600 = '#16A34A',
  green_700 = '#15803D',

  // Error Reds (Mistakes, Warnings)
  red_50 = '#FEF2F2',
  red_100 = '#FEE2E2',
  red_200 = '#FECACA',
  red_300 = '#FCA5A5',
  red_400 = '#F87171', // Error main
  red_500 = '#EF4444',
  red_600 = '#DC2626',
  red_700 = '#B91C1C',

  // Warning Oranges (Reminders, Less Critical)
  orange_50 = '#FFF7ED',
  orange_100 = '#FFEDD5',
  orange_200 = '#FED7AA',
  orange_300 = '#FDBA74',
  orange_400 = '#FB923C', // Warning main
  orange_500 = '#F97316',
  orange_600 = '#EA580C',
  orange_700 = '#C2410C',

  // Semantic Colors
  background = neutral_50,
  input_bg = neutral_100,
  input_border = neutral_300,
  placeholder = neutral_400,
  card_bg = white,
  tab_inactive = neutral_400,
  tab_active = primary_400,

  // Special Purpose
  success_light = green_50,
  error_light = red_50,
  warning_light = orange_50,
}
