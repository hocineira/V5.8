#!/usr/bin/env python3
"""
Test individual RSS sources to see which ones are working
"""

import requests
import time

def test_rss_source(name, url):
    try:
        print(f"Testing {name}: {url}")
        response = requests.get(url, timeout=15, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        print(f"  Status: {response.status_code}")
        print(f"  Content-Type: {response.headers.get('content-type', 'N/A')}")
        print(f"  Content Length: {len(response.text)} chars")
        
        if response.status_code == 200:
            content = response.text.lower()
            if 'rss' in content or 'xml' in content or '<item>' in content:
                print(f"  ✅ Valid RSS/XML content detected")
            else:
                print(f"  ❌ No RSS/XML content detected")
        else:
            print(f"  ❌ HTTP Error")
            
        print()
        
    except Exception as e:
        print(f"  ❌ Error: {str(e)}")
        print()

# Test all RSS sources from the fetcher
sources = {
    "Windows Server Blog": "https://cloudblogs.microsoft.com/windowsserver/feed/",
    "Microsoft Security Response Center": "https://msrc.microsoft.com/blog/rss",
    "System Center Blog": "https://cloudblogs.microsoft.com/systemcenter/feed/",
    "Exchange Server": "https://techcommunity.microsoft.com/plugins/custom/microsoft/o365/custom-blog-rss?tid=-5804064304129947060",
    "SQL Server Blog": "https://cloudblogs.microsoft.com/sqlserver/feed/",
    "Azure Updates": "https://azure.microsoft.com/en-us/updates/feed/",
    "Windows IT Pro Blog": "https://techcommunity.microsoft.com/plugins/custom/microsoft/o365/custom-blog-rss?tid=-8648868647972695810"
}

print("🔍 Testing Individual RSS Sources")
print("=" * 50)

for name, url in sources.items():
    test_rss_source(name, url)
    time.sleep(1)  # Be respectful to servers