use std::process::Command;
use tauri::command;

#[command]
pub async fn which(path: String) -> String {
    let output = Command::new("command")
        .args(["-v", &path])
        .output()
        .expect("Failed to run command");

    if output.status.success() {
        return String::from_utf8(output.stdout).unwrap().trim().to_string();
    } else {
        return String::from_utf8(output.stderr).unwrap().trim().to_string();
    }
}
