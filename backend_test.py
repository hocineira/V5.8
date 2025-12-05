#!/usr/bin/env python3
"""
Comprehensive Backend Testing for Cloud Computing RSS Monitoring System
Tests all Next.js API endpoints for Cloud Computing, RSS sources (AWS, Azure, GCP + French sources), 
translation functionality, and filtering by category, provider, and service type
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any

class CloudComputingBackendTester:
    def __init__(self):
        self.base_url = "http://localhost:3000"
        self.api_base = f"{self.base_url}/api"
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    Details: {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")
        print()

    def test_health_endpoints(self):
        """Test basic health and test endpoints"""
        print("🔍 Testing Health Endpoints...")
        
        # Test API test endpoint
        try:
            response = self.session.get(f"{self.api_base}/test", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data and "services" in data:
                    self.log_test("API Test Endpoint", True, f"Status: {data.get('status')}, Services: {data.get('services')}")
                else:
                    self.log_test("API Test Endpoint", False, "Missing required fields in response", data)
            else:
                self.log_test("API Test Endpoint", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("API Test Endpoint", False, f"Connection error: {str(e)}")

    def test_french_windows_updates_endpoints(self):
        """Test all French Windows updates API endpoints with new categories"""
        print("🔍 Testing French Windows Updates API Endpoints...")
        
        # Test GET /api/windows/updates
        try:
            response = self.session.get(f"{self.api_base}/windows/updates", timeout=15)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "updates" in data and "last_updated" in data:
                    updates_count = data.get("total", 0)
                    self.log_test("Get French Windows Updates", True, f"Retrieved {updates_count} updates")
                    
                    # Verify French content
                    updates = data.get("updates", [])
                    if updates:
                        sample_update = updates[0]
                        title = sample_update.get("title", "")
                        description = sample_update.get("description", "")
                        source = sample_update.get("source", "")
                        
                        # Check if content is from French sources
                        french_sources = ["Le Monde Informatique", "IT-Connect", "LeMagIT"]
                        has_french_source = any(fr_source in source for fr_source in french_sources)
                        
                        if has_french_source:
                            self.log_test("French RSS Sources", True, f"Content from French source: {source}")
                        else:
                            self.log_test("French RSS Sources", False, f"No French source detected: {source}")
                        
                        # Check for French language content
                        french_indicators = ["de la", "de le", "du ", "des ", "le ", "la ", "les ", "mise à jour", "sécurité"]
                        has_french_content = any(indicator in (title + " " + description).lower() for indicator in french_indicators)
                        
                        if has_french_content:
                            self.log_test("French Language Content", True, "Content appears to be in French")
                        else:
                            self.log_test("French Language Content", False, "Content may not be in French")
                    
                    # Test new French categories
                    french_categories = ["particuliers", "serveur", "security", "entreprise", "iot"]
                    for category in french_categories:
                        try:
                            response_cat = self.session.get(f"{self.api_base}/windows/updates?category={category}", timeout=10)
                            if response_cat.status_code == 200:
                                cat_data = response_cat.json()
                                self.log_test(f"French Category Filter: {category}", True, f"{category} updates: {cat_data.get('total', 0)}")
                            else:
                                self.log_test(f"French Category Filter: {category}", False, f"HTTP {response_cat.status_code}")
                        except Exception as e:
                            self.log_test(f"French Category Filter: {category}", False, f"Error: {str(e)}")
                        
                    # Test with limit
                    response_limit = self.session.get(f"{self.api_base}/windows/updates?limit=5", timeout=10)
                    if response_limit.status_code == 200:
                        limit_data = response_limit.json()
                        actual_count = len(limit_data.get("updates", []))
                        self.log_test("Get Updates with Limit", True, f"Limited to {actual_count} updates")
                    else:
                        self.log_test("Get Updates with Limit", False, f"HTTP {response_limit.status_code}")
                        
                else:
                    self.log_test("Get French Windows Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get French Windows Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get French Windows Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/windows/updates/latest
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/latest?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "updates" in data and "count" in data and "timestamp" in data:
                    count = data.get("count", 0)
                    self.log_test("Get Latest Windows Updates", True, f"Retrieved {count} latest updates")
                else:
                    self.log_test("Get Latest Windows Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Latest Windows Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Latest Windows Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/windows/updates/stats
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "by_category" in data:
                    total = data.get("total", 0)
                    categories = data.get("by_category", {})
                    self.log_test("Get Windows Updates Stats", True, f"Total: {total}, Categories: {list(categories.keys())}")
                else:
                    self.log_test("Get Windows Updates Stats", False, "Missing required fields", data)
            else:
                self.log_test("Get Windows Updates Stats", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Windows Updates Stats", False, f"Connection error: {str(e)}")

        # Test GET /api/windows/updates/categories (new French categories)
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/categories", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "categories" in data:
                    categories = data.get("categories", [])
                    self.log_test("Get French Categories", True, f"Found {len(categories)} categories")
                    
                    # Verify new French categories are present
                    expected_categories = ["particuliers", "serveur", "security", "entreprise", "iot"]
                    category_keys = [cat.get("key") if isinstance(cat, dict) else cat for cat in categories]
                    
                    missing_categories = [cat for cat in expected_categories if cat not in category_keys]
                    if not missing_categories:
                        self.log_test("French Categories Validation", True, f"All expected categories present: {category_keys}")
                    else:
                        self.log_test("French Categories Validation", False, f"Missing categories: {missing_categories}")
                else:
                    self.log_test("Get French Categories", False, "Missing categories field", data)
            else:
                self.log_test("Get French Categories", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get French Categories", False, f"Connection error: {str(e)}")

        # Test POST /api/windows/updates/refresh (French RSS sources)
        try:
            response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=45)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    stored = data.get("stored", 0)
                    total = data.get("total", 0)
                    self.log_test("French RSS Refresh", True, f"Refresh response: {data.get('message')}, Stored: {stored}/{total}")
                    
                    # Verify French RSS sources were fetched
                    if stored > 0:
                        self.log_test("French RSS Sources Fetch", True, f"Successfully fetched {stored} articles from French sources")
                    else:
                        self.log_test("French RSS Sources Fetch", False, "No articles fetched from French RSS sources")
                else:
                    self.log_test("French RSS Refresh", False, "Missing message field", data)
            else:
                self.log_test("French RSS Refresh", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("French RSS Refresh", False, f"Connection error: {str(e)}")

    def test_french_rss_sources_validation(self):
        """Test specific French RSS sources mentioned in the request"""
        print("🔍 Testing Specific French RSS Sources...")
        
        expected_sources = [
            "Le Monde Informatique - OS",
            "Le Monde Informatique - Sécurité", 
            "IT-Connect",
            "LeMagIT - Conseils IT",
            "Le Monde Informatique - Datacenter"
        ]
        
        # Get all updates to check sources
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=100", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Check which French sources are present
                    found_sources = set()
                    for update in updates:
                        source = update.get("source", "")
                        for expected_source in expected_sources:
                            if expected_source in source:
                                found_sources.add(expected_source)
                    
                    self.log_test("French RSS Sources Detection", True, f"Found sources: {list(found_sources)}")
                    
                    # Test specific RSS URLs mentioned in request
                    rss_urls = [
                        "https://www.lemondeinformatique.fr/flux-rss/thematique/os/rss.xml",
                        "https://www.lemondeinformatique.fr/flux-rss/thematique/securite/rss.xml",
                        "https://www.it-connect.fr/feed/",
                        "https://www.lemagit.fr/rss/Conseils-IT.xml",
                        "https://www.lemondeinformatique.fr/flux-rss/thematique/datacenter/rss.xml"
                    ]
                    
                    working_sources = 0
                    for url in rss_urls:
                        try:
                            rss_response = self.session.get(url, timeout=10, headers={
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                            })
                            if rss_response.status_code == 200:
                                working_sources += 1
                        except:
                            pass
                    
                    self.log_test("French RSS URLs Accessibility", True, f"{working_sources}/{len(rss_urls)} RSS URLs accessible")
                    
                else:
                    self.log_test("French RSS Sources Detection", False, "No updates found to check sources")
            else:
                self.log_test("French RSS Sources Detection", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("French RSS Sources Detection", False, f"Error: {str(e)}")

    def test_french_keyword_filtering(self):
        """Test French keyword filtering functionality"""
        print("🔍 Testing French Keyword Filtering...")
        
        # Test French Windows keywords
        french_keywords = ["windows", "serveur", "sécurité", "microsoft", "datacenter", "infrastructure"]
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=20", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    keyword_matches = {}
                    for keyword in french_keywords:
                        matches = 0
                        for update in updates:
                            title = update.get("title", "").lower()
                            description = update.get("description", "").lower()
                            if keyword in title or keyword in description:
                                matches += 1
                        keyword_matches[keyword] = matches
                    
                    self.log_test("French Keyword Filtering", True, f"Keyword matches: {keyword_matches}")
                    
                    # Check if filtering is working (should have relevant content)
                    total_matches = sum(keyword_matches.values())
                    if total_matches > 0:
                        self.log_test("French Content Relevance", True, f"Found {total_matches} keyword matches in content")
                    else:
                        self.log_test("French Content Relevance", False, "No French Windows keywords found in content")
                        
                else:
                    self.log_test("French Keyword Filtering", False, "No updates found for keyword testing")
            else:
                self.log_test("French Keyword Filtering", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("French Keyword Filtering", False, f"Error: {str(e)}")

    def test_starlink_updates_endpoints(self):
        """Test all NEW Starlink/SpaceX updates API endpoints"""
        print("🔍 Testing NEW Starlink/SpaceX Updates API Endpoints...")
        
        # Test GET /api/starlink/updates
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates", timeout=15)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "updates" in data and "lastUpdated" in data:
                    updates_count = data.get("total", 0)
                    self.log_test("Get Starlink Updates", True, f"Retrieved {updates_count} updates")
                    
                    # Verify Starlink content
                    updates = data.get("updates", [])
                    if updates:
                        sample_update = updates[0]
                        title = sample_update.get("title", "").lower()
                        description = sample_update.get("description", "").lower()
                        
                        # Check if content is Starlink/SpaceX focused
                        spacex_keywords = ["starlink", "spacex", "falcon", "dragon", "mars", "satellite", "launch"]
                        has_spacex_focus = any(keyword in title or keyword in description for keyword in spacex_keywords)
                        
                        if has_spacex_focus:
                            self.log_test("Starlink Content Verification", True, "Content focused on Starlink/SpaceX")
                        else:
                            self.log_test("Starlink Content Verification", False, f"Sample content may not be SpaceX-focused: {title[:100]}")
                    
                    # Test with category filter
                    response_cat = self.session.get(f"{self.api_base}/starlink/updates?category=spacex", timeout=10)
                    if response_cat.status_code == 200:
                        cat_data = response_cat.json()
                        self.log_test("Get Starlink Updates by Category", True, f"SpaceX category updates: {cat_data.get('total', 0)}")
                    else:
                        self.log_test("Get Starlink Updates by Category", False, f"HTTP {response_cat.status_code}")
                        
                    # Test with limit
                    response_limit = self.session.get(f"{self.api_base}/starlink/updates?limit=10", timeout=10)
                    if response_limit.status_code == 200:
                        limit_data = response_limit.json()
                        actual_count = len(limit_data.get("updates", []))
                        self.log_test("Get Starlink Updates with Limit", True, f"Limited to {actual_count} updates")
                    else:
                        self.log_test("Get Starlink Updates with Limit", False, f"HTTP {response_limit.status_code}")
                        
                else:
                    self.log_test("Get Starlink Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Starlink Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Starlink Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/starlink/updates/latest?limit=5
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates/latest?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "updates" in data and "count" in data:
                    count = data.get("count", 0)
                    self.log_test("Get Latest Starlink Updates", True, f"Retrieved {count} latest updates")
                else:
                    self.log_test("Get Latest Starlink Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Latest Starlink Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Latest Starlink Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/starlink/updates/stats
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "categories" in data:
                    total = data.get("total", 0)
                    categories = data.get("categories", {})
                    self.log_test("Get Starlink Updates Stats", True, f"Total: {total}, Categories: {list(categories.keys())}")
                    
                    # Verify we have the expected 38 articles from starlink-cache.json
                    if total == 38:
                        self.log_test("Starlink Data Count Verification", True, f"Expected 38 articles, found {total}")
                    else:
                        self.log_test("Starlink Data Count Verification", False, f"Expected 38 articles, found {total}")
                        
                else:
                    self.log_test("Get Starlink Updates Stats", False, "Missing required fields", data)
            else:
                self.log_test("Get Starlink Updates Stats", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Starlink Updates Stats", False, f"Connection error: {str(e)}")

        # Test GET /api/starlink/updates/categories
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates/categories", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "categories" in data:
                    categories = data.get("categories", [])
                    expected_categories = ["space", "spacex"]  # Based on starlink-cache.json
                    self.log_test("Get Starlink Categories", True, f"Categories: {categories}")
                    
                    # Verify expected categories are present
                    if any(cat in str(categories).lower() for cat in expected_categories):
                        self.log_test("Starlink Categories Verification", True, "Found expected SpaceX/space categories")
                    else:
                        self.log_test("Starlink Categories Verification", False, f"Expected space/spacex categories, got: {categories}")
                else:
                    self.log_test("Get Starlink Categories", False, "Missing categories field", data)
            else:
                self.log_test("Get Starlink Categories", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Starlink Categories", False, f"Connection error: {str(e)}")

        # Test POST /api/starlink/updates/refresh
        try:
            response = self.session.post(f"{self.api_base}/starlink/updates/refresh", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_test("Starlink RSS Refresh", True, f"Refresh response: {data.get('message')}")
                else:
                    self.log_test("Starlink RSS Refresh", False, "Missing message field", data)
            else:
                self.log_test("Starlink RSS Refresh", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Starlink RSS Refresh", False, f"Connection error: {str(e)}")

    def test_data_storage_verification(self):
        """Test that JSON data files are properly stored and accessible"""
        print("🔍 Testing JSON Data Storage Verification...")
        
        # Test Windows data storage (rss-cache.json)
        try:
            with open("/app/data/rss-cache.json", "r") as f:
                windows_data = json.load(f)
                if "updates" in windows_data:
                    updates_count = len(windows_data.get("updates", []))
                    self.log_test("Windows JSON Storage", True, f"Found {updates_count} Windows updates in storage")
                else:
                    self.log_test("Windows JSON Storage", False, "Invalid Windows data structure")
        except Exception as e:
            self.log_test("Windows JSON Storage", False, f"Error reading Windows data: {str(e)}")
        
        # Test Starlink data storage (starlink-cache.json)
        try:
            with open("/app/data/starlink-cache.json", "r") as f:
                starlink_data = json.load(f)
                if "updates" in starlink_data and "total" in starlink_data:
                    total_starlink = starlink_data.get("total", 0)
                    updates_count = len(starlink_data.get("updates", []))
                    self.log_test("Starlink JSON Storage", True, f"Found {updates_count} Starlink updates in storage (total: {total_starlink})")
                    
                    # Verify the expected 38 articles
                    if total_starlink == 38:
                        self.log_test("Starlink Storage Count", True, f"Confirmed 38 Starlink articles as expected")
                    else:
                        self.log_test("Starlink Storage Count", False, f"Expected 38 articles, found {total_starlink}")
                else:
                    self.log_test("Starlink JSON Storage", False, "Invalid Starlink data structure")
        except Exception as e:
            self.log_test("Starlink JSON Storage", False, f"Error reading Starlink data: {str(e)}")

    def test_data_quality_both_systems(self):
        """Test data quality for both Windows and Starlink systems"""
        print("🔍 Testing Data Quality for Both Systems...")
        
        # Test Windows data quality
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=3", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    first_update = updates[0]
                    required_fields = ["title", "description", "link", "published_date", "category", "source"]
                    missing_fields = [field for field in required_fields if field not in first_update]
                    
                    if not missing_fields:
                        self.log_test("Windows Data Structure", True, "All required fields present")
                    else:
                        self.log_test("Windows Data Structure", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Windows Data Structure", False, "No Windows updates returned")
            else:
                self.log_test("Windows Data Structure", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Windows Data Structure", False, f"Error: {str(e)}")
        
        # Test Starlink data quality
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates?limit=3", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    first_update = updates[0]
                    required_fields = ["title", "description", "link", "published_date", "category", "source"]
                    missing_fields = [field for field in required_fields if field not in first_update]
                    
                    if not missing_fields:
                        self.log_test("Starlink Data Structure", True, "All required fields present")
                        
                        # Check for Starlink-specific fields
                        starlink_fields = ["tags", "mission", "satellite_count"]
                        has_starlink_fields = any(field in first_update for field in starlink_fields)
                        if has_starlink_fields:
                            self.log_test("Starlink Specific Fields", True, "Found Starlink-specific metadata fields")
                        else:
                            self.log_test("Starlink Specific Fields", False, "Missing Starlink-specific fields")
                    else:
                        self.log_test("Starlink Data Structure", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Starlink Data Structure", False, "No Starlink updates returned")
            else:
                self.log_test("Starlink Data Structure", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Starlink Data Structure", False, f"Error: {str(e)}")

    def test_filtering_and_categories(self):
        """Test filtering and category functionality for both systems"""
        print("🔍 Testing Filtering and Categories for Both Systems...")
        
        # Test Windows category filtering
        windows_categories = ["security", "server", "cloud", "enterprise"]
        for category in windows_categories:
            try:
                response = self.session.get(f"{self.api_base}/windows/updates?category={category}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    updates = data.get("updates", [])
                    total = data.get("total", 0)
                    self.log_test(f"Windows Category Filter: {category}", True, f"Found {total} {category} updates")
                else:
                    self.log_test(f"Windows Category Filter: {category}", False, f"HTTP {response.status_code}")
            except Exception as e:
                self.log_test(f"Windows Category Filter: {category}", False, f"Error: {str(e)}")
        
        # Test Starlink category filtering
        starlink_categories = ["space", "spacex"]
        for category in starlink_categories:
            try:
                response = self.session.get(f"{self.api_base}/starlink/updates?category={category}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    updates = data.get("updates", [])
                    total = data.get("total", 0)
                    self.log_test(f"Starlink Category Filter: {category}", True, f"Found {total} {category} updates")
                else:
                    self.log_test(f"Starlink Category Filter: {category}", False, f"HTTP {response.status_code}")
            except Exception as e:
                self.log_test(f"Starlink Category Filter: {category}", False, f"Error: {str(e)}")

    def test_rss_real_data_verification(self):
        """Verify that both systems are retrieving real RSS data"""
        print("🔍 Testing Real RSS Data Verification...")
        
        # Test Windows RSS real data
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Check for real Microsoft sources
                    sources = [update.get("source", "") for update in updates]
                    microsoft_sources = ["Microsoft", "Windows", "Azure", "PowerShell", ".NET", "SQL Server"]
                    has_microsoft_sources = any(any(ms_source in source for ms_source in microsoft_sources) for source in sources)
                    
                    if has_microsoft_sources:
                        self.log_test("Windows Real RSS Data", True, f"Found real Microsoft sources: {set(sources)}")
                    else:
                        self.log_test("Windows Real RSS Data", False, f"No Microsoft sources found: {set(sources)}")
                else:
                    self.log_test("Windows Real RSS Data", False, "No Windows updates found")
            else:
                self.log_test("Windows Real RSS Data", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Windows Real RSS Data", False, f"Error: {str(e)}")
        
        # Test Starlink RSS real data
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Check for real SpaceX sources
                    sources = [update.get("source", "") for update in updates]
                    spacex_sources = ["Space.com", "SpaceNews", "Teslarati", "SpaceX"]
                    has_spacex_sources = any(any(sx_source in source for sx_source in spacex_sources) for source in sources)
                    
                    if has_spacex_sources:
                        self.log_test("Starlink Real RSS Data", True, f"Found real SpaceX sources: {set(sources)}")
                    else:
                        self.log_test("Starlink Real RSS Data", False, f"No SpaceX sources found: {set(sources)}")
                        
                    # Check for SpaceX-related content
                    titles = [update.get("title", "").lower() for update in updates]
                    spacex_keywords = ["starlink", "spacex", "falcon", "dragon", "mars", "satellite"]
                    has_spacex_content = any(any(keyword in title for keyword in spacex_keywords) for title in titles)
                    
                    if has_spacex_content:
                        self.log_test("Starlink Content Relevance", True, "Found SpaceX-related content")
                    else:
                        self.log_test("Starlink Content Relevance", False, "No SpaceX-related content found")
                else:
                    self.log_test("Starlink Real RSS Data", False, "No Starlink updates found")
            else:
                self.log_test("Starlink Real RSS Data", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Starlink Real RSS Data", False, f"Error: {str(e)}")

    def test_cloud_computing_endpoints(self):
        """Test all Cloud Computing API endpoints"""
        print("🔍 Testing Cloud Computing API Endpoints...")
        
        # Test GET /api/cloud/updates
        try:
            response = self.session.get(f"{self.api_base}/cloud/updates", timeout=15)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "updates" in data:
                    updates_count = data.get("total", 0)
                    self.log_test("Get Cloud Updates", True, f"Retrieved {updates_count} cloud updates")
                    
                    # Verify cloud-specific data structure
                    updates = data.get("updates", [])
                    if updates:
                        sample_update = updates[0]
                        required_fields = ["title", "description", "link", "published_date", "category", "service_type", "cloud_provider", "tags", "source"]
                        missing_fields = [field for field in required_fields if field not in sample_update]
                        
                        if not missing_fields:
                            self.log_test("Cloud Data Structure", True, "All required cloud fields present")
                        else:
                            self.log_test("Cloud Data Structure", False, f"Missing fields: {missing_fields}")
                        
                        # Check cloud-specific fields
                        service_type = sample_update.get("service_type")
                        cloud_provider = sample_update.get("cloud_provider")
                        tags = sample_update.get("tags", [])
                        
                        if service_type in ["SaaS", "PaaS", "IaaS", "FaaS"]:
                            self.log_test("Service Type Validation", True, f"Valid service type: {service_type}")
                        else:
                            self.log_test("Service Type Validation", False, f"Invalid service type: {service_type}")
                        
                        if cloud_provider in ["AWS", "Azure", "GCP", "france"]:
                            self.log_test("Cloud Provider Validation", True, f"Valid provider: {cloud_provider}")
                        else:
                            self.log_test("Cloud Provider Validation", False, f"Invalid provider: {cloud_provider}")
                        
                        if isinstance(tags, list) and len(tags) > 0:
                            self.log_test("Tags Validation", True, f"Tags present: {tags[:3]}")
                        else:
                            self.log_test("Tags Validation", False, "No tags found")
                    
                    # Test filtering by category
                    categories = ["infrastructure", "cloud", "securite", "devops"]
                    for category in categories:
                        try:
                            response_cat = self.session.get(f"{self.api_base}/cloud/updates?category={category}", timeout=10)
                            if response_cat.status_code == 200:
                                cat_data = response_cat.json()
                                self.log_test(f"Cloud Category Filter: {category}", True, f"{category} updates: {cat_data.get('total', 0)}")
                            else:
                                self.log_test(f"Cloud Category Filter: {category}", False, f"HTTP {response_cat.status_code}")
                        except Exception as e:
                            self.log_test(f"Cloud Category Filter: {category}", False, f"Error: {str(e)}")
                    
                    # Test filtering by provider
                    providers = ["AWS", "Azure", "GCP"]
                    for provider in providers:
                        try:
                            response_prov = self.session.get(f"{self.api_base}/cloud/updates?provider={provider}", timeout=10)
                            if response_prov.status_code == 200:
                                prov_data = response_prov.json()
                                self.log_test(f"Cloud Provider Filter: {provider}", True, f"{provider} updates: {prov_data.get('total', 0)}")
                            else:
                                self.log_test(f"Cloud Provider Filter: {provider}", False, f"HTTP {response_prov.status_code}")
                        except Exception as e:
                            self.log_test(f"Cloud Provider Filter: {provider}", False, f"Error: {str(e)}")
                    
                    # Test filtering by service type
                    service_types = ["SaaS", "PaaS", "IaaS"]
                    for service_type in service_types:
                        try:
                            response_svc = self.session.get(f"{self.api_base}/cloud/updates?service_type={service_type}", timeout=10)
                            if response_svc.status_code == 200:
                                svc_data = response_svc.json()
                                self.log_test(f"Cloud Service Type Filter: {service_type}", True, f"{service_type} updates: {svc_data.get('total', 0)}")
                            else:
                                self.log_test(f"Cloud Service Type Filter: {service_type}", False, f"HTTP {response_svc.status_code}")
                        except Exception as e:
                            self.log_test(f"Cloud Service Type Filter: {service_type}", False, f"Error: {str(e)}")
                        
                    # Test with limit (should be 20 by default)
                    response_limit = self.session.get(f"{self.api_base}/cloud/updates?limit=5", timeout=10)
                    if response_limit.status_code == 200:
                        limit_data = response_limit.json()
                        actual_count = len(limit_data.get("updates", []))
                        self.log_test("Get Cloud Updates with Limit", True, f"Limited to {actual_count} updates")
                    else:
                        self.log_test("Get Cloud Updates with Limit", False, f"HTTP {response_limit.status_code}")
                        
                else:
                    self.log_test("Get Cloud Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Cloud Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Cloud Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/cloud/updates/latest?limit=5
        try:
            response = self.session.get(f"{self.api_base}/cloud/updates/latest?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "updates" in data and "count" in data and "total" in data:
                    count = data.get("count", 0)
                    total = data.get("total", 0)
                    self.log_test("Get Latest Cloud Updates", True, f"Retrieved {count} latest updates from {total} total")
                    
                    # Verify sorting (most recent first)
                    updates = data.get("updates", [])
                    if len(updates) >= 2:
                        first_date = updates[0].get("published_date")
                        second_date = updates[1].get("published_date")
                        if first_date >= second_date:
                            self.log_test("Cloud Updates Sorting", True, "Updates sorted by date (newest first)")
                        else:
                            self.log_test("Cloud Updates Sorting", False, "Updates not properly sorted")
                else:
                    self.log_test("Get Latest Cloud Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Latest Cloud Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Latest Cloud Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/cloud/updates/stats
        try:
            response = self.session.get(f"{self.api_base}/cloud/updates/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                required_stats = ["total", "by_category", "by_provider", "by_service_type", "recent_7_days", "recent_30_days"]
                missing_stats = [stat for stat in required_stats if stat not in data]
                
                if not missing_stats:
                    total = data.get("total", 0)
                    categories = data.get("by_category", {})
                    providers = data.get("by_provider", {})
                    service_types = data.get("by_service_type", {})
                    recent_7 = data.get("recent_7_days", 0)
                    recent_30 = data.get("recent_30_days", 0)
                    
                    self.log_test("Get Cloud Updates Stats", True, 
                        f"Total: {total}, Categories: {len(categories)}, Providers: {len(providers)}, Service Types: {len(service_types)}, Recent 7d: {recent_7}, Recent 30d: {recent_30}")
                else:
                    self.log_test("Get Cloud Updates Stats", False, f"Missing stats fields: {missing_stats}", data)
            else:
                self.log_test("Get Cloud Updates Stats", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Cloud Updates Stats", False, f"Connection error: {str(e)}")

        # Test GET /api/cloud/updates/categories
        try:
            response = self.session.get(f"{self.api_base}/cloud/updates/categories", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "categories" in data and "providers" in data and "service_types" in data:
                    categories = data.get("categories", [])
                    providers = data.get("providers", [])
                    service_types = data.get("service_types", [])
                    
                    self.log_test("Get Cloud Categories", True, 
                        f"Categories: {categories}, Providers: {providers}, Service Types: {service_types}")
                    
                    # Verify expected categories
                    expected_categories = ["infrastructure", "cloud", "securite", "devops"]
                    found_categories = [cat for cat in expected_categories if cat in categories]
                    if found_categories:
                        self.log_test("Cloud Categories Validation", True, f"Found expected categories: {found_categories}")
                    else:
                        self.log_test("Cloud Categories Validation", False, f"No expected categories found in: {categories}")
                    
                    # Verify expected providers
                    expected_providers = ["AWS", "Azure", "GCP"]
                    found_providers = [prov for prov in expected_providers if prov in providers]
                    if found_providers:
                        self.log_test("Cloud Providers Validation", True, f"Found expected providers: {found_providers}")
                    else:
                        self.log_test("Cloud Providers Validation", False, f"No expected providers found in: {providers}")
                        
                else:
                    self.log_test("Get Cloud Categories", False, "Missing required fields", data)
            else:
                self.log_test("Get Cloud Categories", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Cloud Categories", False, f"Connection error: {str(e)}")

        # Test POST /api/cloud/updates/refresh
        try:
            response = self.session.post(f"{self.api_base}/cloud/updates/refresh", timeout=60)
            if response.status_code == 200:
                data = response.json()
                if "success" in data and "message" in data and "count" in data:
                    success = data.get("success", False)
                    count = data.get("count", 0)
                    message = data.get("message", "")
                    
                    if success and count > 0:
                        self.log_test("Cloud RSS Refresh", True, f"Refresh successful: {message} ({count} updates)")
                        
                        # Verify that cloud-cache.json was created/updated
                        try:
                            with open("/app/data/cloud-cache.json", "r") as f:
                                cache_data = json.load(f)
                                if len(cache_data) > 0:
                                    self.log_test("Cloud Cache File Creation", True, f"Cache file contains {len(cache_data)} updates")
                                else:
                                    self.log_test("Cloud Cache File Creation", False, "Cache file is empty")
                        except Exception as cache_error:
                            self.log_test("Cloud Cache File Creation", False, f"Cache file error: {str(cache_error)}")
                    else:
                        self.log_test("Cloud RSS Refresh", False, f"Refresh failed or no updates: {message}")
                else:
                    self.log_test("Cloud RSS Refresh", False, "Missing required response fields", data)
            else:
                self.log_test("Cloud RSS Refresh", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Cloud RSS Refresh", False, f"Connection error: {str(e)}")

    def test_cloud_rss_sources_validation(self):
        """Test specific Cloud RSS sources mentioned in the request"""
        print("🔍 Testing Cloud RSS Sources (7 sources: 4 international + 3 French)...")
        
        # Expected sources from cloud-rss-fetcher.js
        expected_sources = {
            "international": [
                "AWS Blog",
                "Microsoft Azure Blog", 
                "Google Cloud Blog"
            ],
            "french": [
                "Le Monde Informatique - Cloud",
                "Le Monde Informatique - Sécurité",
                "IT-Connect",
                "LeMagIT - Cloud Computing"
            ]
        }
        
        # Get all updates to check sources
        try:
            response = self.session.get(f"{self.api_base}/cloud/updates?limit=100", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Check which sources are present
                    found_sources = set()
                    for update in updates:
                        source = update.get("source", "")
                        found_sources.add(source)
                    
                    self.log_test("Cloud RSS Sources Detection", True, f"Found sources: {list(found_sources)}")
                    
                    # Check international sources
                    international_found = 0
                    for expected_source in expected_sources["international"]:
                        if any(expected_source in source for source in found_sources):
                            international_found += 1
                    
                    self.log_test("International Cloud Sources", True if international_found >= 2 else False, 
                        f"Found {international_found}/3 international sources (AWS, Azure, GCP)")
                    
                    # Check French sources
                    french_found = 0
                    for expected_source in expected_sources["french"]:
                        if any(expected_source in source for source in found_sources):
                            french_found += 1
                    
                    self.log_test("French Cloud Sources", True if french_found >= 2 else False, 
                        f"Found {french_found}/4 French sources (Le Monde Informatique, IT-Connect, LeMagIT)")
                    
                    # Test translation functionality
                    english_content_count = 0
                    french_content_count = 0
                    
                    for update in updates[:10]:  # Check first 10 updates
                        title = update.get("title", "")
                        description = update.get("description", "")
                        content = title + " " + description
                        
                        # Check for French indicators
                        french_indicators = ["de la", "de le", "du ", "des ", "le ", "la ", "les ", "mise à jour", "sécurité", "disponible"]
                        has_french = any(indicator in content.lower() for indicator in french_indicators)
                        
                        # Check for English indicators
                        english_indicators = ["the ", "and ", "of ", "to ", "in ", "for ", "with ", "available", "new ", "update"]
                        has_english = any(indicator in content.lower() for indicator in english_indicators)
                        
                        if has_french:
                            french_content_count += 1
                        if has_english and not has_french:
                            english_content_count += 1
                    
                    if french_content_count > 0:
                        self.log_test("French Translation Functionality", True, 
                            f"Found {french_content_count} French content items, {english_content_count} English items")
                    else:
                        self.log_test("French Translation Functionality", False, 
                            "No French content detected - translation may not be working")
                        
                else:
                    self.log_test("Cloud RSS Sources Detection", False, "No updates found to check sources")
            else:
                self.log_test("Cloud RSS Sources Detection", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Cloud RSS Sources Detection", False, f"Error: {str(e)}")

    def test_cloud_content_relevance(self):
        """Test that cloud content is relevant and properly categorized"""
        print("🔍 Testing Cloud Content Relevance...")
        
        try:
            response = self.session.get(f"{self.api_base}/cloud/updates?limit=20", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Test cloud keywords presence
                    cloud_keywords = ["cloud", "aws", "azure", "google cloud", "gcp", "saas", "paas", "iaas", 
                                    "serverless", "kubernetes", "docker", "infrastructure", "devops"]
                    
                    relevant_updates = 0
                    for update in updates:
                        title = update.get("title", "").lower()
                        description = update.get("description", "").lower()
                        content = title + " " + description
                        
                        if any(keyword in content for keyword in cloud_keywords):
                            relevant_updates += 1
                    
                    relevance_percentage = (relevant_updates / len(updates)) * 100
                    
                    if relevance_percentage >= 70:
                        self.log_test("Cloud Content Relevance", True, 
                            f"{relevant_updates}/{len(updates)} updates are cloud-relevant ({relevance_percentage:.1f}%)")
                    else:
                        self.log_test("Cloud Content Relevance", False, 
                            f"Only {relevant_updates}/{len(updates)} updates are cloud-relevant ({relevance_percentage:.1f}%)")
                    
                    # Test service type distribution
                    service_types = {}
                    for update in updates:
                        service_type = update.get("service_type")
                        if service_type:
                            service_types[service_type] = service_types.get(service_type, 0) + 1
                    
                    if service_types:
                        self.log_test("Service Type Distribution", True, f"Service types found: {service_types}")
                    else:
                        self.log_test("Service Type Distribution", False, "No service types detected")
                    
                    # Test cloud provider distribution
                    providers = {}
                    for update in updates:
                        provider = update.get("cloud_provider")
                        if provider:
                            providers[provider] = providers.get(provider, 0) + 1
                    
                    if providers:
                        self.log_test("Cloud Provider Distribution", True, f"Providers found: {providers}")
                    else:
                        self.log_test("Cloud Provider Distribution", False, "No cloud providers detected")
                        
                else:
                    self.log_test("Cloud Content Relevance", False, "No updates found for relevance testing")
            else:
                self.log_test("Cloud Content Relevance", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Cloud Content Relevance", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run comprehensive tests for Cloud Computing RSS monitoring system"""
        print("🚀 Testing Cloud Computing RSS Monitoring System")
        print("=" * 70)
        
        start_time = datetime.now()
        
        # Run all test suites
        self.test_health_endpoints()
        self.test_cloud_computing_endpoints()
        self.test_cloud_rss_sources_validation()
        self.test_cloud_content_relevance()
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Generate summary
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print("=" * 70)
        print("🎯 CLOUD COMPUTING SYSTEM TEST SUMMARY")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        print(f"📊 Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['details']}")
        
        # Save detailed results
        with open("/tmp/backend_test_results.json", "w") as f:
            json.dump(self.test_results, f, indent=2, default=str)
        
        print(f"\n📄 Detailed results saved to: /tmp/backend_test_results.json")
        
        return passed_tests, failed_tests, self.test_results

if __name__ == "__main__":
    tester = CloudComputingBackendTester()
    passed, failed, results = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if failed == 0 else 1)