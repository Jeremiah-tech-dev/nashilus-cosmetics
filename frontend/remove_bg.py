from PIL import Image
import numpy as np

# Load the image
img = Image.open('src/Cosmetic Splash.png').convert('RGBA')
data = np.array(img)

# Remove white/light backgrounds
rgb = data[:,:,:3]
alpha = data[:,:,3]

# Create mask for white/light pixels
white_mask = np.all(rgb > [240, 240, 240], axis=2)
data[white_mask] = [0, 0, 0, 0]  # Make transparent

# Save the result
result = Image.fromarray(data, 'RGBA')
result.save('src/Cosmetic Splash.png')
print("Background removed successfully!")