use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct PluginsServer {
    #[serde(default = "default_false")]
    pub dev_server: bool,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct DevConfig {
    #[serde(default = "default_false")]
    pub enabled: bool,
    #[serde(default = "default_false")]
    pub console: bool,
    #[serde(default = "default_false")]
    pub open_console_at_start: bool,
    #[serde(default = "default_false")]
    pub window_maximize: bool,
    #[serde(default = "default_false")]
    pub window_decorations: bool,
    #[serde(default = "default_false")]
    pub window_open_on_current_screen: bool,
    #[serde(default = "default_window_title")]
    pub window_title: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Config {
    #[serde(default = "default_theme")]
    pub theme: String,
    #[serde(default = "dev_config_default")]
    pub dev_mode: DevConfig,
}

fn default_theme() -> String {
    "yal-default".to_string()
}

fn default_window_title() -> String {
    "yal - dev mode".to_string()
}

const fn default_false() -> bool {
    false
}

fn dev_config_default() -> DevConfig {
    DevConfig {
        enabled: false,
        console: false,
        open_console_at_start: false,
        window_maximize: false,
        window_decorations: false,
        window_title: "yal - dev mode".to_string(),
        window_open_on_current_screen: false,
    }
}
