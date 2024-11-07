# Kitglobal boilerplate

## Опис проекта

Даний пак створений для швишкої інінціалізації проекта React-Native на архітектурі FSD. Даний пак включає:

- react-native - v 0.74.5
- [FSD](https://feature-sliced.design/docs/get-started/overview)
- [Eslint](https://github.com/KITGLOBAL/companyEslint/blob/main/.eslintrc_front-end.js)
- [Prettier](https://github.com/KITGLOBAL/companyEslint/blob/main/%20.prettierrc_front-end.js)
- React Navigation V6
- [pnpm](https://pnpm.io/installation)

### Використовувати PNPM

Також проект включає налаштований `react-native-svg` та `react-native-svg-transformer`. Налаштований абсолютний імпорт "@" (за потреби змініть його у `tsconfig.ts` та `babel.config.js`), та читання `.env`(Змініть його під вимоги вашого проекту)

## Ініціалізація

1. Склоньте цей проект та перенесіть його у ваш робочій гіт

2. Встановіть модулі

   ```bash
   npm i
   cd ios && pod install

   ```

3. Після встановлення переіменуйте його

   ```bash
   npx react-native-rename "YourName" -b "com.kitglobal.{bundleProject}"

   ```

4. За необхідністю перевірте чи правильно всі імена змінилися

5. Змініть налаштування Sentry, `.env` та інших допоміжних бібліотек
