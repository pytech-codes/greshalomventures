# Product Image Requirements

## Exact File Path
**C:\Baba_water\public\images\products\**

## Current Files (Already Uploaded)
✅ cresta-pack.png (744KB) - Cresta Table Water (Pack)
✅ imperial-pack.png (679KB) - Imperial Table Water (Pack)
✅ cresta-single.png (562KB) - Cresta Table Water (Single Bottle)
✅ imperial-single.png (525KB) - Imperial Table Water (Single Bottle)
✅ sachet-water.png (598KB) - Greshalom Pure Water (Sachet)

## Directory Structure
```
public/images/products/
├── cresta-pack.png          # Cresta Table Water (Pack) ✅
├── imperial-pack.png        # Imperial Table Water (Pack) ✅
├── cresta-single.png        # Cresta Table Water (Single Bottle) ✅
├── imperial-single.png      # Imperial Table Water (Single Bottle) ✅
└── sachet-water.png         # Greshalom Pure Water (Sachet) ✅
```

## Image Specifications

### Technical Requirements
- **Format**: PNG (preferred for transparency) or JPG
- **Dimensions**: 400x400px (standard) or 800x800px (retina/2x)
- **File Size**: Under 500KB per image for optimal loading
- **Background**: White or transparent
- **Color Profile**: sRGB
- **Sizing**: Images will fill the entire card width (object-cover)

### Visual Guidelines
- **Style**: Clean, professional product photography
- **Lighting**: Consistent across all products
- **Angles**: Front-facing or slight 3/4 view
- **Background**: Pure white or transparent
- **Shadows**: Subtle, natural drop shadows
- **Watermark**: No watermarks or text overlays

### Product-Specific Guidelines

#### 1. Cresta Table Water (Pack) - `cresta-pack.jpg`
- Show full pack of 12 bottles
- Clear branding visible
- Professional packaging photography

#### 2. Imperial Table Water (Pack) - `imperial-pack.jpg`
- Show full pack of 12 bottles
- Clear branding visible
- Professional packaging photography

#### 3. Cresta Table Water (Single) - `cresta-single.jpg`
- Single 75cl bottle
- Clear label and branding
- Clean white/transparent background

#### 4. Imperial Table Water (Single) - `imperial-single.jpg`
- Single 75cl bottle
- Clear label and branding
- Clean white/transparent background

#### 5. Greshalom Pure Water (Sachet) - `sachet-water.jpg`
- 50cl sachet/bag display
- Show sachet packaging clearly
- Can be flat lay or product shot

## Fallback Behavior
- If product images are missing, the system will automatically fall back to `/bottle.png`
- Images will display with glassmorphism backgrounds
- Drop shadows are applied via CSS

## How to Add Images
1. Generate or source your product images
2. Name them according to the specifications above
3. Place them in: `public/images/products/`
4. The website will automatically pick them up
5. No code changes required

## Current Status
- ✅ Directory structure created: `public/images/products/`
- ✅ Fallback system implemented
- ✅ Image error handling in place
- ⏳ Awaiting product images from user