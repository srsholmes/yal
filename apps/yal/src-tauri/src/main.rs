#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::env;

use cocoa::appkit::{NSWindow, NSWindowCollectionBehavior};
use serde::{Deserialize, Serialize};

use tauri::{
    CustomMenuItem, Manager, Menu, MenuItem, Submenu, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};
use tauri::{GlobalShortcutManager, State};

// use crate::accessibility::AppRequestAccessibilityState;
use crate::hide_show_app::AppHiddenState;
use crate::hide_show_app::DevModeState;
// use tauri_plugin_log::{LogTarget};

mod accessibility;
mod app_icons;
mod config;
mod dotfiles;
mod hide_show_app;
mod utils;
mod which;

use fix_path_env::fix;

#[derive(Debug, Serialize, Deserialize)]
struct Message {
    message: String,
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

#[tauri::command]
fn is_dev_mode(state: tauri::State<DevModeState>) -> bool {
    let result = state.0 == true;
    result
}

fn main() {
    // Fix the path env, which is used to return the path to executable binaries for plugins.
    fix_path_env::fix();
    let home_dir_str = tauri::api::path::home_dir()
        .unwrap()
        .into_os_string()
        .into_string()
        .unwrap();
    let config_path = format!("{}{}", home_dir_str, "/.yal/config.json");

    // check if config file exists
    if !std::path::Path::new(&config_path).exists() {
        // create config file
        let config = config::Config {
            dev_mode: config::DevConfig {
                enabled: false,
                open_console_at_start: false,
                window_title: "yal - dev mode".to_string(),
                window_decorations: true,
                window_open_on_current_screen: false,
                console: true,
                window_maximize: true,
            },
            theme: "yal-default".to_string(),
        };
        let config_json = serde_json::to_string_pretty(&config).unwrap();
        std::fs::write(&config_path, config_json).unwrap();
    }

    let config_file = std::fs::File::open(config_path).unwrap();

    let config: config::Config = serde_json::from_reader(config_file).unwrap();
    println!("dev_mode {}", config.dev_mode.enabled);
    // info!("******* RUST *********");
    // info!("dev_mode {}", config.dev_mode.enabled);
    // info!("****************");

    let mut app = tauri::Builder::default()
        .manage(AppHiddenState(true.into()))
        // .manage(accessibility::query_accessibility_permissions())
        .setup(move |app| {
            #[cfg(debug_assertions)]
            if config.dev_mode.enabled == true {
                if config.dev_mode.open_console_at_start == true {
                    app.get_window("main").unwrap().open_devtools();
                }
                if config.dev_mode.window_title != "" {
                    app.get_window("main")
                        .unwrap()
                        .set_title(&config.dev_mode.window_title)
                        .expect("Couldn't set title");
                }
                if config.dev_mode.window_decorations == true {
                    app.get_window("main")
                        .unwrap()
                        .set_decorations(true)
                        .expect("Couldn't set decorations");
                }
                if config.dev_mode.window_maximize == true {
                    app.get_window("main")
                        .unwrap()
                        .maximize()
                        .expect("Couldn't maximize the window");
                }
            }
            Ok(())
        })
        .menu(
            Menu::new()
                .add_submenu(Submenu::new(
                    // on macOS first menu is always app name
                    "yal",
                    Menu::new().add_native_item(MenuItem::Quit),
                ))
                .add_submenu(Submenu::new("Edit", {
                    let menu = Menu::new()
                        .add_native_item(MenuItem::Undo)
                        .add_native_item(MenuItem::Redo)
                        .add_native_item(MenuItem::Separator)
                        .add_native_item(MenuItem::Cut)
                        .add_native_item(MenuItem::Copy)
                        .add_native_item(MenuItem::Paste)
                        .add_native_item(MenuItem::SelectAll);
                    menu
                })),
        )
        .system_tray(
            SystemTray::new().with_menu(
                SystemTrayMenu::new()
                    .add_item(CustomMenuItem::new("quit".to_string(), "Quit"))
                    .add_native_item(SystemTrayMenuItem::Separator)
                    .add_item(CustomMenuItem::new("hide".to_string(), "Hide"))
                    .add_item(CustomMenuItem::new("show".to_string(), "Show")),
            ),
        )
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                "show" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                    window.set_focus().expect("Couldn't focus the window");
                }
                _ => {}
            },
            _ => {}
        })
        .manage(DevModeState(config.dev_mode.enabled))
        .invoke_handler(tauri::generate_handler![
            dotfiles::dotfiles_server,
            app_icons::get_app_icons,
            hide_show_app::app_hide_show,
            which::which,
            is_dev_mode
        ])
        // .plugin(
        //     LoggerBuilder::new()
        //         .targets([
        //             // write to the OS logs folder
        //             LogTarget::LogDir,
        //             // // write to stdout
        //             // LogTarget::Stdout,
        //             // // forward logs to the webview
        //             // LogTarget::Webview,
        //         ])
        //         .build(),
        // )
        .plugin(tauri_plugin_fs_watch::init())
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    app.set_activation_policy(tauri::ActivationPolicy::Accessory);

    app.run(move |app_handle, e| match e {
        tauri::RunEvent::Ready => {
            let app_handle = app_handle.clone();
            let app_handle_copy = app_handle.clone();

            app_handle_copy
                .global_shortcut_manager()
                .register("Cmd+Space", move || {
                    // TODO: get the shortcut key from the config file
                    let app_hidden_state: State<AppHiddenState> = app_handle_copy.state();
                    let dev_mode_state: State<DevModeState> = app_handle_copy.state();
                    hide_show_app::app_hide_show(
                        app_handle_copy.clone(),
                        app_hidden_state,
                        dev_mode_state,
                        false,
                    );
                })
                .unwrap();

            if config.dev_mode.enabled == false {
                let window =
                    app_handle.get_window("main").unwrap().ns_window().unwrap() as cocoa::base::id;
                // Allow windows to be created on current screen / space. Very important, do not delete.
                unsafe {
                    window.hidesOnDeactivate();
                    window.setCollectionBehavior_(
                        NSWindowCollectionBehavior::NSWindowCollectionBehaviorCanJoinAllSpaces,
                    );
                    window.setCollectionBehavior_(
                        NSWindowCollectionBehavior::NSWindowCollectionBehaviorMoveToActiveSpace,
                    );
                    window.setLevel_(10000);
                }
            }
        }

        // Keep the event loop running even if all windows are closed
        // This allow us to catch system tray events when there is no window
        tauri::RunEvent::ExitRequested { api, .. } => {
            println!("got app event-name ExitRequested");
            api.prevent_exit();
        }
        _ => {}
    });
}
