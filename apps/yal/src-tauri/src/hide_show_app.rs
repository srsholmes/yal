use crate::utils::position_window;
use std::sync::Mutex;
use tauri::{Manager, State};
pub struct AppHiddenState(pub Mutex<bool>);
pub struct DevModeState(pub bool);

#[tauri::command]
pub fn app_hide_show(
    app_handle: tauri::AppHandle,
    app_hidden_state: State<AppHiddenState>,
    app_dev_mode: State<DevModeState>,
    force_hide: bool,
) {
    let main_window = app_handle.get_window("main").unwrap();
    if main_window.is_devtools_open() == true {
        main_window
            .set_decorations(true)
            .expect("Couldn't set decorations");
        main_window
            .set_title("yal - dev mode")
            .expect("Couldn't set title");
        println!("Devtools are open, do not hide the app");
    } else {
        let mut state = app_hidden_state.0.lock().unwrap();
        if force_hide == true {
            if app_dev_mode.0 == true {
                println!("dev mode, don't hide");
            } else {
                app_handle.hide().expect("Couldn't hide app");
                main_window
                    .set_decorations(false)
                    .expect("Couldn't set decorations");
                *state = true;
            }
        } else {
            let window_clone = main_window.clone();
            position_window(&main_window, &window_clone);

            if *state == true {
                app_handle.show().expect("Couldn't show app");
                main_window.set_focus().expect("Couldn't focus the window");
                *state = false;
            } else {
                if app_dev_mode.0 == true {
                    println!("dev mode, don't hide");
                } else {
                    app_handle.hide().expect("Couldn't hide app");
                    *state = true;
                }
            }
        };
    }
}
