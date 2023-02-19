use enigo::Enigo;
use tauri::{LogicalPosition, Position, Window, Wry};

pub fn position_window(main_window: &Window<Wry>, window_clone: &Window<Wry>) {
    let mouse_position = get_mouse_position();
    let monitors = main_window.available_monitors().unwrap();
    // set main window position to be on the active monitor
    let monitor = monitors.iter().find(|m| {
        let pos = m.position();
        let size = m.size();

        let size_x = size.width as i32;
        let size_y = size.height as i32;

        let res = pos.x <= mouse_position.0
            && pos.x + size_x >= mouse_position.0
            && pos.y <= mouse_position.1
            && pos.y + size_y >= mouse_position.1;
        res
    });

    println!("monitor {:?}", monitor);
    let scale_factor = monitor.unwrap().scale_factor();
    let copy_scale_factor = scale_factor.clone() as i32;
    let monitor_size = monitor.unwrap().size();
    let width = monitor_size.width as i32;
    let monitor_width = width / copy_scale_factor;
    // get Monitor position
    let pos = monitor.unwrap().position();
    let pos_x = pos.x as i32;
    let pos_y = pos.y as i32;

    let window_scale_factor = window_clone.scale_factor().unwrap();
    let main_window_width = window_clone.inner_size().unwrap().width / window_scale_factor as u32;
    // position window to be in the middle of the screen on x axis, taking into account the monitor position
    let x_pos = (monitor_width - main_window_width as i32) / 2 + pos_x;
    let y_offset = pos_y + (300 / scale_factor as i32);
    main_window
        .set_position(Position::Logical(LogicalPosition {
            x: x_pos as f64,
            y: y_offset as f64,
        }))
        .unwrap();
}

//get mouse position on screen NSEvent
pub fn get_mouse_position() -> (i32, i32) {
    let cursor_location: (i32, i32) = Enigo::mouse_location();
    cursor_location
}
