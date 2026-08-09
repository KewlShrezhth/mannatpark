import urllib.request
import re
import json

url = "https://www.99acres.com/the-mannat-park-dharampura-jagdalpur-npxid-r430321"
req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8', errors='ignore')
        
        # Find image URLs
        image_urls = re.findall(r'https://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', html, re.IGNORECASE)
        print("Found Images:")
        unique_imgs = sorted(list(set(image_urls)))
        for img in unique_imgs:
            if '99acres' in img and ('projects' in img or 'imagecdn' in img):
                print(img)

        # Find youtube / video embeds
        videos = re.findall(r'https://[^\s"\'<>]*youtube[^\s"\'<>]*', html, re.IGNORECASE)
        print("\nFound Videos:")
        for v in set(videos):
            print(v)
except Exception as e:
    print("Error:", e)
