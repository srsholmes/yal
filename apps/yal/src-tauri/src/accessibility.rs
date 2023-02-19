use std::sync::Mutex;
use tauri::api::process::Command;
use tauri::{Manager, State};
// mutable variable asked
pub struct AppRequestAccessibilityState(pub Mutex<bool>);

#[cfg(target_os = "macos")]
pub fn query_accessibility_permissions() -> bool {
    let is_trusted = macos_accessibility_client::accessibility::application_is_trusted();
    println!("is_trusted {}", is_trusted);
    if !is_trusted {
        println!("not trusted");
        let trusted_prompt =
            macos_accessibility_client::accessibility::application_is_trusted_with_prompt();
        println!("trusted_prompt {}", trusted_prompt);
        if trusted_prompt {
            println!("Application is totally trusted!");
            return true;
        } else {
            println!("Application isn't trusted :(");
            return false;
        }
    } else {
        return true;
    }
}
