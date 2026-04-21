import { readFileSync } from "fs";
import { join } from "path";

let _template: string | null = null;
function getTemplate(): string {
  if (!_template) {
    _template = readFileSync(
      join(process.cwd(), "public/storefront-template.html"),
      "utf-8"
    );
  }
  return _template;
}

export async function runStorefrontAgent(_transcript: string): Promise<string> {
  return getTemplate();
}
