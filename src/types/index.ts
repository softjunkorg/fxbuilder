export interface IParsedObject {
  [x: string]: any;
}

export type GameTypes = "gta4" | "common" | "gta5" | "rdr3";

export type ManifestVersions = "cerulean" | "adamant" | "bodacious";

export interface IManifestObject {
  fx_version?: ManifestVersions;
  game?: GameTypes;
  games?: Array<GameTypes>;
  client_script?: string;
  client_scripts?: string[];
  server_script?: string;
  server_scripts?: string[];
  shared_script?: string;
  shared_scripts?: string[];
  export?: string;
  exports?: string[];
  server_export?: string;
  server_exports?: string[];
  ui_page?: string;
  before_level_meta?: string;
  after_level_meta?: string;
  replace_level_meta?: string;
  data_file?: { [x: string]: any };
  file?: string;
  files?: string[];
  this_is_a_map?: "yes";
  server_only?: "yes";
  dependency?: string;
  loadscreen?: string;
  dependencies?: string[];
  lua54?: "yes";
  provide?: string;
  clr_disable_task_scheduler?: "yes";
  [x: string]: any;
}

export interface AnyObject {
  [x: string]: any;
}
