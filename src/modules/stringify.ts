import { formatText } from "lua-fmt";
import { IManifestObject } from "../types";
import encoder from "./encoder";

function stringify(parse: IManifestObject): string {
  const resultBlocks: string[] = [];
  const customData = parse["__customData"];

  /* Deleting custom data */
  delete parse["__customData"];

  /* Mapping parse */
  Object.entries(parse).map((e) => {
    const name = e[0];
    const data = e[1];

    /* String */
    if (typeof data === "string") {
      return resultBlocks.push(`${name} "${data}"`);
    }

    /* Array */
    if (Array.isArray(data)) {
      return resultBlocks.push(`${name} ${encoder.array.encode(data)}`);
    }

    /* Object */
    Object.entries(data).map((e2) => {
      resultBlocks.push(
        `${name} ${encoder.text.encode(e2[0])} ${<string>(
          ((<string>e2[1])[0] !== "{"
            ? encoder.text.encode(<string>e2[1])
            : e2[1])
        )}`,
      );
    });
  });

  /* Mapping custom data */
  if (customData && Object.entries(customData).length > 0) {
    const result = stringify(customData);
    resultBlocks.push(result);
  }

  return formatText(resultBlocks.join("\n"));
}

export default stringify;
