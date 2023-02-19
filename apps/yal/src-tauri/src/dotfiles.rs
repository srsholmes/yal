use std::thread;

use libc;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use tauri::api::{path::home_dir, process::Command};

pub fn kill_gracefully(id: i32) {
  unsafe {
    libc::kill(id, libc::SIGTERM);
  }
}

#[tauri::command]
pub async fn dotfiles_server(invoke_message: String) -> Value {
  #[derive(Debug, Serialize, Deserialize)]
  struct ProcessKill {
    pid: String,
    message: String,
  }
  let query: ProcessKill = serde_json::from_str(&invoke_message[..]).unwrap();

  if query.message == "start" {
    let home_dir_str = home_dir().unwrap().into_os_string().into_string().unwrap();
    let yal_dotfile_dir = format!("{}{}", home_dir_str, "/.yal/");
    println!("yal dotfiles dir..., {:#?}", yal_dotfile_dir);
    thread::spawn(move || {
      println!("Working...");
      let output = Command::new_sidecar("sfz")
        .unwrap()
        .args(vec![
          String::from(yal_dotfile_dir),
          "-a".to_string(),
          "-C".to_string(),
          "-p".to_string(),
          "7865".to_string(),
        ])
        .spawn()
        .expect("Failed to use sfz");

      let json = json!({ "success": true, "pid": output.1.pid() });
      json
    })
    .join()
    .expect("Thread panicked")
  } else {
    println!("Killing dotfiles server..., {:#?}", query);
    let my_int = query.pid.parse::<i32>().unwrap();
    kill_gracefully(my_int);
    let json = json!({ "success": true });
    json
  }
}
