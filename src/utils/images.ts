export function fixImageSize(image: HTMLImageElement | null) {
  if (image) {
    // parent bounds
    const bounds = image.parentElement!.getClientRects()[0];
    // image size
    let size = image.getClientRects()[0];
    // expand image
    if (size.width > size.height) {
      image.style.width = "100%";
    } else {
      image.style.height = "100%";
    }
    // fix possible overflow
    size = image.getClientRects()[0];
    if (size.height > bounds.height) {
      image.style.width = "";
      image.style.height = (bounds.height - 8) + "px";
    }else if(size.width > bounds.width){
      image.style.height = "";
      image.style.width = (bounds.width - 8) + "px";
    }
  }
}
