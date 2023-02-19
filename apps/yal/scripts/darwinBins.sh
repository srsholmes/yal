
# TODO: Copy bins for all sys architectures. 

# Copies the bin files and names them for darwin...
cd src-tauri/bin || exit

for file in *; do
  if [[ $file == *"-aarch64-apple-darwin"* ]]; then
    echo "${file%} already exists, skipping..."
  else
    cp -- "$file" "${file%}-aarch64-apple-darwin"
  fi
done
