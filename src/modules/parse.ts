import { formatText } from "lua-fmt";
import { minify } from "luamin";
import defaultKeys from "../config/defaultKeys";
import { AnyObject, ManifestObject } from "../types";
import encoder from "./encoder";

function handleResult(object: AnyObject, data: any) {
  let isObject = false;

  /* Checking object */
  if (typeof data === "string" && data.split(" ").length >= 2) {
    if (
      (data.split(" ").length === 2 && data.split(" ")[1][0] === '"') ||
      (data.split(" ").length >= 2 && data.split(" ")[1][0] === "{")
    ) {
      const fieldName = encoder.text.decode(data.split(" ")[0]);
      const fieldValue = data.replace(`"${fieldName}" `, "");
      data = { [fieldName]: encoder.text.decode(fieldValue) };
      isObject = true;
    }
  }

  /* Stringifiying */
  if (typeof data === "string") {
    data = encoder.text.decode(data);
  }

  if (!object) {
    object = data;
  } else if (isObject) {
    if (typeof object === "object" && data !== null) {
      object = { ...object, ...data };
    } else if (data !== null) {
      object = data;
    }
  } else {
    object = [...(Array.isArray(object) ? object : [object]), data];
  }

  return object;
}

function parse(content: string): ManifestObject {
  const format = formatText(minify(content));
  const blocks = format.split("\n").filter((n) => !!n);
  const result: ManifestObject = { runtime: {} };

  /* Mapping the blocks */
  if (blocks) {
    blocks.map((row) => {
      const name = row.split(" ")[0];
      let data: any = row.replace(`${name} `, "");
      const isNative = defaultKeys.includes(name);

      /* Object */
      if (
        (<any[]>data)[0] === "{" &&
        (<any[]>data)[(<any[]>data).length - 1] === "}"
      ) {
        data = encoder.array.decode(<string>data);
      }

      // TODO: Function methods not supported
      if (name.match(/\(|\)/g)) {
        return;
      }

      /* Cache */
      if (isNative) {
        result[name] = handleResult(result[name], data);
      } else {
        (<AnyObject>result["runtime"])[name] = handleResult(
          (<AnyObject>result["runtime"])[name],
          data,
        );
      }
    });
  }

  return result;
}

export default parse;
