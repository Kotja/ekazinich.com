#!/usr/bin/env python3
import base64
from PIL import Image
import sys

def png_to_svg(png_path, svg_path):
    """Convert PNG to SVG by embedding the PNG as base64 data"""
    # Open the image to get dimensions
    with Image.open(png_path) as img:
        width, height = img.size
    
    # Read and encode the PNG file
    with open(png_path, 'rb') as f:
        png_data = base64.b64encode(f.read()).decode('utf-8')
    
    # Create SVG with embedded PNG
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  <image width="{width}" height="{height}" 
         xlink:href="data:image/png;base64,{png_data}"/>
</svg>'''
    
    # Write SVG file
    with open(svg_path, 'w') as f:
        f.write(svg_content)
    
    print(f"✓ Converted {png_path} to {svg_path}")
    print(f"  Dimensions: {width}x{height}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_to_svg.py <input.png> <output.svg>")
        sys.exit(1)
    
    png_to_svg(sys.argv[1], sys.argv[2])
