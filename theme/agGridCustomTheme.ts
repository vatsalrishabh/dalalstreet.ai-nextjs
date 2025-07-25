// theme/agGridCustomTheme.ts
import { themeQuartz, iconSetQuartzLight } from 'ag-grid-community';

export const agGridCustomTheme = themeQuartz
  .withPart(iconSetQuartzLight)
  .withParams({
    accentColor: "#7F1D1D", // Match your custom maroon or primary accent
    backgroundColor: "#0f0f0f", // Match your `bg-base-100` or dark base
    foregroundColor: "#F3F4F6", // Light text, like `text-base-content`
    borderColor: "#3F3F46", // Matches `border-base-300` in Tailwind
    browserColorScheme: "dark",
    chromeBackgroundColor: {
      ref: "foregroundColor",
      mix: 0.07,
      onto: "backgroundColor",
    },
    columnBorder: true,
    fontSize: 15,
    headerFontSize: 14,
  });
