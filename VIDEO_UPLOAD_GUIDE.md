# 📹 Video Upload Guide - Events On Charles

## Adding Videos to Your Gallery

Your website now supports both photos and videos in the event gallery! Here's how to add your video content:

### 🎯 **Quick Setup**

1. **Prepare Your Videos**
   - Format: MP4, MOV, or AVI
   - Resolution: 1080p (1920x1080) recommended
   - File size: Keep under 100MB for fast loading
   - Duration: 30 seconds to 3 minutes works best for web

2. **Upload Videos**
   - Place video files in the `public/videos/` folder
   - Use descriptive names like `wedding-ceremony-2024.mp4`

3. **Update Gallery**
   - Edit `src/app/components/EventGallery.tsx`
   - Add video entries to the events array

### 📝 **Adding Videos to Events**

In the `EventGallery.tsx` file, update the events array like this:

```javascript
{
  id: '1',
  title: 'Sarah & Michael\'s Wedding',
  date: '2024-05-14',
  guestCount: 150,
  type: 'Wedding',
  media: [
    { type: 'image', url: 'https://picsum.photos/400/300?random=11' },
    { type: 'video', url: '/videos/your-video-name.mp4', thumbnail: '/images/video-thumbnail.jpg' },
    { type: 'image', url: 'https://picsum.photos/400/300?random=12' }
  ],
  description: 'Your event description here',
  featured: true
}
```

### 🎨 **Video Thumbnail Guidelines**

- Create thumbnail images for videos (JPG/PNG)
- Size: 400x300 pixels minimum
- Place in `public/images/thumbnails/`
- Use compelling frames that represent the video content

### 📋 **Best Practices**

#### **Video Quality**
- ✅ Good lighting and stable footage
- ✅ Clear audio (if applicable)
- ✅ Professional editing with smooth transitions
- ✅ Include variety: wide shots, close-ups, details

#### **Content Types**
- 🎥 Ceremony highlights
- 🎥 Reception moments
- 🎥 Venue tours
- 🎥 Setup/decoration timelapses
- 🎥 Guest testimonials
- 🎥 Behind-the-scenes content

#### **Technical Specs**
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (1080p)
- **Frame Rate**: 30fps or 60fps
- **Bitrate**: 5-10 Mbps for good quality/size balance
- **Audio**: AAC, 128-320 kbps

### 🚀 **Optimization Tips**

1. **Compress Videos**
   - Use tools like HandBrake or Adobe Media Encoder
   - Target 5-15MB for 1-minute videos
   - Maintain quality while reducing file size

2. **Mobile Optimization**
   - Videos automatically adapt to mobile screens
   - Ensure content is visible on smaller displays
   - Test on various devices

3. **Loading Performance**
   - Videos load on demand (not automatically)
   - Thumbnails display first for fast page loading
   - Consider using a CDN for large video files

### 📁 **File Organization**

```
public/
├── videos/
│   ├── weddings/
│   │   ├── sarah-michael-ceremony.mp4
│   │   └── sarah-michael-reception.mp4
│   ├── corporate/
│   │   └── techcorp-conference-2024.mp4
│   └── parties/
│       └── emma-sweet16-highlights.mp4
└── images/
    └── thumbnails/
        ├── sarah-michael-ceremony-thumb.jpg
        └── techcorp-conference-thumb.jpg
```

### 🎛️ **Gallery Features**

Your enhanced gallery includes:

- ✨ **Mixed Media**: Photos and videos in the same gallery
- 🎮 **Video Controls**: Play, pause, volume, fullscreen
- 📱 **Mobile Friendly**: Touch controls and responsive design
- 🎯 **Media Counter**: Shows count of photos vs videos
- 🔄 **Easy Navigation**: Smooth transitions between media
- 📊 **Media Summary**: Overview of gallery contents

### 📞 **Need Help?**

If you need assistance:
1. Check that video files are in the correct format
2. Ensure file sizes are reasonable (<100MB)
3. Verify file paths in the gallery code
4. Test on different devices and browsers

### 🎉 **Ready to Upload?**

1. Prepare your best event videos
2. Create attractive thumbnails
3. Upload to `public/videos/`
4. Update the gallery component
5. Test and enjoy your enhanced gallery!

Your Events On Charles website will showcase your events beautifully with this professional video gallery system! 