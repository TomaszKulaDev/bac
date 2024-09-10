declare module "../utils/projectAnalyzer.js" {
  export function generateProjectStructureReport(
    sortBy?: "size" | "lines" | "type"
  ): string;
}
