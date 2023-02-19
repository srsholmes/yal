use serde_json::{json, Map, Value};
use std::thread;
use tauri::api::process::Command;

fn get_icon(app_path: String) -> String {
    let file_icon_args = format!("[{{\"appOrPID\":\"{}\",\"size\":64}}]", app_path);
    println!("{}", file_icon_args);
    let output = Command::new_sidecar("file-icon")
        .unwrap()
        .args(vec![file_icon_args])
        .output()
        .expect("Failed to use file-icon");

    output.stdout.to_string()
}

fn get_installed_apps() -> String {
    let home_dir_str = tauri::api::path::home_dir()
        .unwrap()
        .into_os_string()
        .into_string()
        .unwrap();
    let app_dir = format!("{}{}", home_dir_str, "/Applications/");

    let output = Command::new_sidecar("fd")
        .unwrap()
        .args(vec![
            ".",
            "-e",
            "app",
            "/Applications",
            &app_dir,
            "/System/Applications/Utilities",
            "--prune",
        ])
        .output()
        .expect("Failed to use fd");

    let preferences_panes = Command::new_sidecar("fd")
        .unwrap()
        .args(vec![
            ".",
            "-e",
            "prefPane",
            "/System/Library/PreferencePanes",
            "--prune",
        ])
        .output()
        .expect("Failed to use fd");

    let owned_string: String = output.stdout.to_owned();
    let borrowed_string: String = preferences_panes.stdout.to_owned();
    let new_string = owned_string + &*borrowed_string;
    println!("{}", new_string);
    new_string.to_string()
}

fn get_app_icon_json() -> Value {
    let handle = thread::spawn(move || {
        let mut map = Map::new();
        let apps = get_installed_apps();
        let split = apps.lines();
        let vec: Vec<&str> = split.collect();

        for app in vec.iter() {
            let app_path = app.parse().unwrap();
            // TODO: use a ref here rather than the convert to string
            let icon = get_icon(String::from(&app_path));
            &map.insert(app_path, Value::from(icon));
        }
        let obj = Value::Object(map);
        obj
    });
    handle.join().unwrap()
}

#[tauri::command]
pub async fn get_app_icons() -> String {
    let icons = get_app_icon_json();
    let json = json!(icons);
    json.to_string().into()
}
