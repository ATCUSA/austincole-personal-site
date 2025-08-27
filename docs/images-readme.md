# Images Directory

## Profile Pictures

To add your profile pictures:

1. **Profile Picture**: Save your main profile photo as `austin-cole-profile.jpg` in this directory
2. **Family Photos**: Save family photos with descriptive names:
   - `heather-cole.jpg` - Heather's photo
   - `aj-cole.jpg` - Austin Junior's photo
   - Add more as needed

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended minimum 300x300px for profile pictures
- **Quality**: High quality originals (they'll be sized down automatically)

## Enabling Images

### Profile Picture
Uncomment the profile picture section in `src/about.njk` around line 11-17:
```html
<div class="mb-6">
    <img src="/assets/images/austin-cole-profile.jpg" 
         alt="Austin Cole" 
         class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-200 dark:border-primary-700">
</div>
```

### Family Section
Uncomment the family section in `src/about.njk` around line 162-213:
- Remove the `<!--` at line 162
- Remove the `-->` at line 213
- Update image paths and names as needed

## Notes

- Images are automatically copied to `_site/assets/images/` during build
- The CSS classes handle responsive sizing and dark mode styling
- Profile pictures are displayed as rounded circles
- Family photos are displayed in a responsive grid