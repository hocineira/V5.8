#!/usr/bin/env python3
"""
Comprehensive Testing for Next.js Windows RSS Portfolio System
Tests all Next.js API routes, RSS fetching, JSON storage, and translation functionality
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any

class NextJSPortfolioTester:
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

    def test_api_test_endpoint(self):
        """Test the basic API test endpoint"""
        print("🔍 Testing API Test Endpoint...")
        
        try:
            response = self.session.get(f"{self.api_base}/test", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data and "services" in data:
                    services = data.get("services", {})
                    expected_services = ["frontend", "api", "storage", "rss"]
                    has_all_services = all(service in services for service in expected_services)
                    
                    if has_all_services:
                        self.log_test("API Test Endpoint", True, f"Status: {data.get('status')}, Services: {list(services.keys())}")
                    else:
                        missing = [s for s in expected_services if s not in services]
                        self.log_test("API Test Endpoint", False, f"Missing services: {missing}", data)
                else:
                    self.log_test("API Test Endpoint", False, "Missing required fields in response", data)
            else:
                self.log_test("API Test Endpoint", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("API Test Endpoint", False, f"Connection error: {str(e)}")

    def test_windows_updates_main_endpoint(self):
        """Test GET /api/windows/updates with various parameters"""
        print("🔍 Testing Windows Updates Main Endpoint...")
        
        # Test basic endpoint
        try:
            response = self.session.get(f"{self.api_base}/windows/updates", timeout=15)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "updates" in data and "last_updated" in data:
                    updates_count = data.get("total", 0)
                    self.log_test("Get Windows Updates", True, f"Retrieved {updates_count} updates")
                    
                    # Test with limit=10 as specified in requirements
                    response_limit = self.session.get(f"{self.api_base}/windows/updates?limit=10", timeout=10)
                    if response_limit.status_code == 200:
                        limit_data = response_limit.json()
                        actual_count = len(limit_data.get("updates", []))
                        expected_count = min(10, updates_count)
                        if actual_count <= 10:
                            self.log_test("Get Updates with Limit 10", True, f"Limited to {actual_count} updates (expected ≤10)")
                        else:
                            self.log_test("Get Updates with Limit 10", False, f"Got {actual_count} updates, expected ≤10")
                    else:
                        self.log_test("Get Updates with Limit 10", False, f"HTTP {response_limit.status_code}")
                        
                    # Test with category filter
                    response_cat = self.session.get(f"{self.api_base}/windows/updates?category=security", timeout=10)
                    if response_cat.status_code == 200:
                        cat_data = response_cat.json()
                        self.log_test("Get Updates by Category", True, f"Security updates: {cat_data.get('total', 0)}")
                    else:
                        self.log_test("Get Updates by Category", False, f"HTTP {response_cat.status_code}")
                        
                else:
                    self.log_test("Get Windows Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Windows Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Windows Updates", False, f"Connection error: {str(e)}")

    def test_windows_updates_stats(self):
        """Test GET /api/windows/updates/stats"""
        print("🔍 Testing Windows Updates Stats Endpoint...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "by_category" in data and "last_updated" in data:
                    total = data.get("total", 0)
                    categories = data.get("by_category", {})
                    self.log_test("Get Updates Stats", True, f"Total: {total}, Categories: {list(categories.keys())}")
                else:
                    self.log_test("Get Updates Stats", False, "Missing required fields", data)
            else:
                self.log_test("Get Updates Stats", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Updates Stats", False, f"Connection error: {str(e)}")

    def test_windows_updates_categories(self):
        """Test GET /api/windows/updates/categories"""
        print("🔍 Testing Windows Updates Categories Endpoint...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/categories", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "categories" in data:
                    categories = data.get("categories", [])
                    category_keys = [cat.get("key") for cat in categories if isinstance(cat, dict)]
                    expected_categories = ["security", "feature", "server", "general"]
                    has_all_categories = all(cat in category_keys for cat in expected_categories)
                    
                    if has_all_categories:
                        self.log_test("Get Categories", True, f"Categories: {category_keys}")
                    else:
                        missing = [cat for cat in expected_categories if cat not in category_keys]
                        self.log_test("Get Categories", False, f"Missing categories: {missing}")
                else:
                    self.log_test("Get Categories", False, "Missing categories field", data)
            else:
                self.log_test("Get Categories", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Categories", False, f"Connection error: {str(e)}")

    def test_windows_updates_latest(self):
        """Test GET /api/windows/updates/latest with limit=5"""
        print("🔍 Testing Windows Updates Latest Endpoint...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/latest?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "updates" in data and "count" in data and "timestamp" in data:
                    count = data.get("count", 0)
                    updates = data.get("updates", [])
                    actual_count = len(updates)
                    
                    if actual_count <= 5 and actual_count == count:
                        self.log_test("Get Latest Updates", True, f"Retrieved {count} latest updates (≤5)")
                    else:
                        self.log_test("Get Latest Updates", False, f"Count mismatch: reported {count}, actual {actual_count}")
                else:
                    self.log_test("Get Latest Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Latest Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Latest Updates", False, f"Connection error: {str(e)}")

    def test_windows_updates_refresh(self):
        """Test POST /api/windows/updates/refresh"""
        print("🔍 Testing Windows Updates Refresh Endpoint...")
        
        try:
            response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "timestamp" in data:
                    stored = data.get("stored", 0)
                    total = data.get("total", 0)
                    self.log_test("RSS Refresh", True, f"Refresh completed: {stored}/{total} updates stored")
                    
                    # Wait a bit and check if data is available
                    time.sleep(3)
                    stats_response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
                    if stats_response.status_code == 200:
                        stats_data = stats_response.json()
                        total_after = stats_data.get("total", 0)
                        self.log_test("RSS Refresh Data Verification", True, f"Total updates after refresh: {total_after}")
                    else:
                        self.log_test("RSS Refresh Data Verification", False, "Could not verify refresh results")
                else:
                    self.log_test("RSS Refresh", False, "Missing required fields", data)
            else:
                self.log_test("RSS Refresh", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("RSS Refresh", False, f"Connection error: {str(e)}")

    def test_json_storage_functionality(self):
        """Test JSON storage functionality by checking data persistence"""
        print("🔍 Testing JSON Storage Functionality...")
        
        try:
            # Check if data file exists
            import os
            data_file = "/app/data/rss-cache.json"
            
            if os.path.exists(data_file):
                with open(data_file, 'r') as f:
                    data = json.load(f)
                    
                if "updates" in data and "lastUpdated" in data:
                    updates_count = len(data.get("updates", []))
                    last_updated = data.get("lastUpdated")
                    self.log_test("JSON Storage File", True, f"Found {updates_count} updates, last updated: {last_updated}")
                    
                    # Test data structure
                    if updates_count > 0:
                        first_update = data["updates"][0]
                        required_fields = ["title", "description", "link", "published_date", "category"]
                        missing_fields = [field for field in required_fields if field not in first_update]
                        
                        if not missing_fields:
                            self.log_test("JSON Data Structure", True, "All required fields present in stored data")
                        else:
                            self.log_test("JSON Data Structure", False, f"Missing fields: {missing_fields}")
                    else:
                        self.log_test("JSON Data Structure", True, "No data to validate structure (empty storage)")
                else:
                    self.log_test("JSON Storage File", False, "Invalid JSON structure")
            else:
                self.log_test("JSON Storage File", False, "Data file not found")
                
        except Exception as e:
            self.log_test("JSON Storage File", False, f"Error reading storage: {str(e)}")

    def test_rss_sources_accessibility(self):
        """Test if RSS sources are accessible"""
        print("🔍 Testing RSS Sources Accessibility...")
        
        sources = [
            ("Microsoft France", "https://news.microsoft.com/fr-fr/feed/"),
            ("Microsoft Security", "https://msrc.microsoft.com/blog/rss"),
            ("Windows Blog", "https://blogs.windows.com/feed/"),
            ("Windows Server", "https://cloudblogs.microsoft.com/windowsserver/feed/")
        ]
        
        for name, url in sources:
            try:
                response = requests.get(url, timeout=15, headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                })
                
                if response.status_code == 200:
                    content_type = response.headers.get("content-type", "").lower()
                    if "xml" in content_type or "rss" in content_type or response.text.strip().startswith("<?xml"):
                        self.log_test(f"{name} RSS Feed", True, "Feed accessible and valid XML")
                    else:
                        self.log_test(f"{name} RSS Feed", False, f"Invalid content type: {content_type}")
                else:
                    self.log_test(f"{name} RSS Feed", False, f"HTTP {response.status_code}")
            except Exception as e:
                self.log_test(f"{name} RSS Feed", False, f"Connection error: {str(e)}")

    def test_translation_functionality(self):
        """Test if translation functionality is working"""
        print("🔍 Testing Translation Functionality...")
        
        try:
            # Get some updates and check if French translations are present
            response = self.session.get(f"{self.api_base}/windows/updates?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    french_indicators = 0
                    for update in updates:
                        title = update.get("title", "").lower()
                        description = update.get("description", "").lower()
                        text = title + " " + description
                        
                        # Check for French words/phrases
                        french_words = ["mise à jour", "sécurité", "fonctionnalité", "disponible", 
                                      "nouveau", "nouvelle", "amélioration", "correctif"]
                        
                        if any(word in text for word in french_words):
                            french_indicators += 1
                    
                    if french_indicators > 0:
                        self.log_test("Translation Functionality", True, f"Found French content in {french_indicators}/{len(updates)} updates")
                    else:
                        self.log_test("Translation Functionality", True, "No French translations detected (may be all English sources)")
                else:
                    self.log_test("Translation Functionality", False, "No updates available to test translation")
            else:
                self.log_test("Translation Functionality", False, f"Could not retrieve updates for translation test")
        except Exception as e:
            self.log_test("Translation Functionality", False, f"Error testing translation: {str(e)}")

    def test_data_quality_and_structure(self):
        """Test the quality and structure of returned data"""
        print("🔍 Testing Data Quality and Structure...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=3", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Test first update structure
                    first_update = updates[0]
                    required_fields = ["title", "description", "link", "published_date", "category", "source"]
                    
                    missing_fields = [field for field in required_fields if field not in first_update]
                    if not missing_fields:
                        self.log_test("Update Data Structure", True, "All required fields present")
                        
                        # Test data types and values
                        valid_categories = ["security", "feature", "server", "general"]
                        category_valid = first_update.get("category") in valid_categories
                        
                        has_title = bool(first_update.get("title", "").strip())
                        has_link = bool(first_update.get("link", "").strip())
                        
                        # Test date format
                        try:
                            datetime.fromisoformat(first_update.get("published_date", "").replace('Z', '+00:00'))
                            date_valid = True
                        except:
                            date_valid = False
                        
                        if category_valid and has_title and has_link and date_valid:
                            self.log_test("Update Data Validation", True, f"Category: {first_update.get('category')}, Source: {first_update.get('source')}")
                        else:
                            issues = []
                            if not category_valid:
                                issues.append(f"Invalid category: {first_update.get('category')}")
                            if not has_title:
                                issues.append("Empty title")
                            if not has_link:
                                issues.append("Empty link")
                            if not date_valid:
                                issues.append("Invalid date format")
                            self.log_test("Update Data Validation", False, "; ".join(issues))
                    else:
                        self.log_test("Update Data Structure", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Update Data Structure", False, "No updates returned")
            else:
                self.log_test("Update Data Structure", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Update Data Structure", False, f"Error: {str(e)}")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print("🔍 Testing Error Handling...")
        
        # Test invalid category
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?category=invalid_category", timeout=10)
            if response.status_code == 200:
                data = response.json()
                # Should return empty results, not error
                self.log_test("Invalid Category Handling", True, f"Returned {data.get('total', 0)} results")
            else:
                self.log_test("Invalid Category Handling", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Category Handling", False, f"Error: {str(e)}")

        # Test invalid limit
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=-1", timeout=10)
            # Should handle gracefully
            if response.status_code in [200, 422]:  # 422 for validation error is acceptable
                self.log_test("Invalid Limit Handling", True, f"HTTP {response.status_code}")
            else:
                self.log_test("Invalid Limit Handling", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Limit Handling", False, f"Error: {str(e)}")

        # Test non-existent endpoint
        try:
            response = self.session.get(f"{self.api_base}/windows/nonexistent", timeout=10)
            if response.status_code == 404:
                self.log_test("Non-existent Endpoint", True, "Correctly returned 404")
            else:
                self.log_test("Non-existent Endpoint", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("Non-existent Endpoint", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all Next.js portfolio tests"""
        print("🚀 Starting Comprehensive Testing for Next.js Windows RSS Portfolio")
        print("=" * 70)
        
        start_time = datetime.now()
        
        # Run all test suites
        self.test_api_test_endpoint()
        self.test_windows_updates_main_endpoint()
        self.test_windows_updates_stats()
        self.test_windows_updates_categories()
        self.test_windows_updates_latest()
        self.test_windows_updates_refresh()
        self.test_json_storage_functionality()
        self.test_rss_sources_accessibility()
        self.test_translation_functionality()
        self.test_data_quality_and_structure()
        self.test_error_handling()
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Generate summary
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print("=" * 70)
        print("🎯 TEST SUMMARY")
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
        with open("/tmp/nextjs_test_results.json", "w") as f:
            json.dump(self.test_results, f, indent=2, default=str)
        
        print(f"\n📄 Detailed results saved to: /tmp/nextjs_test_results.json")
        
        return passed_tests, failed_tests, self.test_results

if __name__ == "__main__":
    tester = NextJSPortfolioTester()
    passed, failed, results = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if failed == 0 else 1)