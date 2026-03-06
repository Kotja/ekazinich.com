#!/usr/bin/env python3
"""Remove white/light backgrounds from images and make them transparent."""

from PIL import Image
import sys
import os

def remove_white_background(input_path, output_path, threshold=240):
    """
    Remove white/light background from an image.
    
    Args:
        input_path: Path to input image
        output_path: Path to save output image
        threshold: RGB values above this will be made transparent (default: 240)
    """
    # Open the image
    img = Image.open(input_path).convert('RGBA')
    
    # Get image data
    data = img.getdata()
    
    # Create new data with transparency
    new_data = []
    for item in data:
        # If pixel is close to white/light gray, make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0))  # Transparent
        else:
            new_data.append(item)
    
    # Update image data
    img.putdata(new_data)
    
    # Save with transparency
    img.save(output_path, 'PNG')
    print(f"Processed: {input_path} -> {output_path}")

def main():
    # List of images to process
    images = [
        'Spread_sheet_doom_process_1.webp',
        'Spread_sheet_doom_process_2.webp',
        'Spread_sheet_doom_process_3.webp',
        'Spread_sheet_doom_process_4.webp',
        'Spread_sheet_doom_process_5.webp'
    ]
    
    assets_dir = 'src/assets'
    
    for img_name in images:
        input_path = os.path.join(assets_dir, img_name)
        # Create output filename (PNG for better transparency support)
        output_name = img_name.replace('.webp', '_nobg.png')
        output_path = os.path.join(assets_dir, output_name)
        
        if os.path.exists(input_path):
            try:
                remove_white_background(input_path, output_path)
            except Exception as e:
                print(f"Error processing {img_name}: {e}")
        else:
            print(f"File not found: {input_path}")

if __name__ == '__main__':
    main()
