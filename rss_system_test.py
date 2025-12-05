#!/usr/bin/env python3
"""
Test complet du système RSS amélioré pour le portfolio de veille technologique
Tests spécifiques selon les exigences de la review request
"""

import requests
import json
import time
import os
from datetime import datetime
from typing import Dict, List, Any

class RSSSystemTester:
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

    def test_existing_apis(self):
        """Test des API existantes selon la review request"""
        print("🔍 Testing Existing APIs...")
        
        # Test GET /api/windows/updates (avec paramètres limit, category)
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=10&category=server", timeout=15)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "updates" in data and "last_updated" in data:
                    updates_count = data.get("total", 0)
                    self.log_test("GET /api/windows/updates (avec paramètres)", True, 
                                f"Retrieved {updates_count} server updates with limit=10")
                else:
                    self.log_test("GET /api/windows/updates (avec paramètres)", False, 
                                "Missing required fields", data)
            else:
                self.log_test("GET /api/windows/updates (avec paramètres)", False, 
                            f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/windows/updates (avec paramètres)", False, f"Error: {str(e)}")

        # Test GET /api/windows/updates/latest?limit=10
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/latest?limit=10", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "updates" in data and "count" in data and "timestamp" in data:
                    count = data.get("count", 0)
                    self.log_test("GET /api/windows/updates/latest?limit=10", True, 
                                f"Retrieved {count} latest updates")
                else:
                    self.log_test("GET /api/windows/updates/latest?limit=10", False, 
                                "Missing required fields", data)
            else:
                self.log_test("GET /api/windows/updates/latest?limit=10", False, 
                            f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/windows/updates/latest?limit=10", False, f"Error: {str(e)}")

        # Test GET /api/windows/updates/stats
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "by_category" in data:
                    total = data.get("total", 0)
                    categories = data.get("by_category", {})
                    self.log_test("GET /api/windows/updates/stats", True, 
                                f"Total: {total}, Categories: {list(categories.keys())}")
                else:
                    self.log_test("GET /api/windows/updates/stats", False, 
                                "Missing required fields", data)
            else:
                self.log_test("GET /api/windows/updates/stats", False, 
                            f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/windows/updates/stats", False, f"Error: {str(e)}")

        # Test POST /api/windows/updates/refresh
        try:
            response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "stored" in data and "total" in data:
                    stored = data.get("stored", 0)
                    total = data.get("total", 0)
                    self.log_test("POST /api/windows/updates/refresh", True, 
                                f"Stored {stored}/{total} updates")
                else:
                    self.log_test("POST /api/windows/updates/refresh", False, 
                                "Missing required fields", data)
            else:
                self.log_test("POST /api/windows/updates/refresh", False, 
                            f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("POST /api/windows/updates/refresh", False, f"Error: {str(e)}")

    def test_new_rss_sources(self):
        """Vérifier les nouvelles sources RSS"""
        print("🔍 Testing New RSS Sources...")
        
        # Sources attendues selon la review request
        expected_sources = [
            "System Center Blog",
            "Exchange Server", 
            "SQL Server Blog",
            "Azure Updates",
            "Windows IT Pro Blog"
        ]
        
        # Test en récupérant des données et vérifiant les sources
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=50", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                # Extraire les sources uniques
                found_sources = set()
                for update in updates:
                    source = update.get("source", "")
                    if source:
                        found_sources.add(source)
                
                # Vérifier les nouvelles sources
                found_new_sources = []
                for expected_source in expected_sources:
                    if expected_source in found_sources:
                        found_new_sources.append(expected_source)
                
                if found_new_sources:
                    self.log_test("New RSS Sources Detection", True, 
                                f"Found new sources: {found_new_sources}")
                else:
                    self.log_test("New RSS Sources Detection", False, 
                                f"No new sources found. Available sources: {list(found_sources)}")
                    
                # Test des catégories (server, security, cloud, enterprise)
                categories = set()
                for update in updates:
                    category = update.get("category", "")
                    if category:
                        categories.add(category)
                
                expected_categories = ["server", "security", "cloud", "enterprise"]
                found_categories = [cat for cat in expected_categories if cat in categories]
                
                if len(found_categories) >= 2:  # Au moins 2 catégories attendues
                    self.log_test("Category Classification", True, 
                                f"Found categories: {found_categories}")
                else:
                    self.log_test("Category Classification", False, 
                                f"Limited categories found: {list(categories)}")
                    
            else:
                self.log_test("New RSS Sources Detection", False, 
                            f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("New RSS Sources Detection", False, f"Error: {str(e)}")

    def test_translation_quality(self):
        """Vérifier la qualité de la traduction améliorée"""
        print("🔍 Testing Translation Quality...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=10", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Analyser la qualité de la traduction
                    french_indicators = 0
                    total_text_length = 0
                    
                    french_words = [
                        "serveur", "sécurité", "disponible", "mise à jour", 
                        "fonctionnalité", "amélioration", "correctif", "aperçu"
                    ]
                    
                    for update in updates:
                        title = update.get("title", "")
                        description = update.get("description", "")
                        text = (title + " " + description).lower()
                        total_text_length += len(text)
                        
                        # Compter les mots français
                        for french_word in french_words:
                            if french_word in text:
                                french_indicators += 1
                    
                    if french_indicators > 0:
                        self.log_test("Translation Quality", True, 
                                    f"Found {french_indicators} French indicators in content")
                    else:
                        self.log_test("Translation Quality", False, 
                                    "No French translation indicators found")
                else:
                    self.log_test("Translation Quality", False, "No updates to analyze")
            else:
                self.log_test("Translation Quality", False, 
                            f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Translation Quality", False, f"Error: {str(e)}")

    def test_data_storage(self):
        """Tester le stockage des données"""
        print("🔍 Testing Data Storage...")
        
        # Vérifier le fichier /app/data/rss-cache.json
        cache_file = "/app/data/rss-cache.json"
        
        try:
            if os.path.exists(cache_file):
                with open(cache_file, 'r', encoding='utf-8') as f:
                    cache_data = json.load(f)
                
                # Vérifier la structure des données
                if "updates" in cache_data and "lastUpdated" in cache_data:
                    updates = cache_data.get("updates", [])
                    
                    if updates:
                        # Vérifier la structure d'une mise à jour
                        first_update = updates[0]
                        required_fields = [
                            "id", "title", "description", "link", "published_date", 
                            "category", "source", "created_at", "updated_at"
                        ]
                        
                        missing_fields = [field for field in required_fields 
                                        if field not in first_update]
                        
                        if not missing_fields:
                            self.log_test("Data Storage Structure", True, 
                                        f"Cache file contains {len(updates)} updates with correct structure")
                        else:
                            self.log_test("Data Storage Structure", False, 
                                        f"Missing fields in data structure: {missing_fields}")
                    else:
                        self.log_test("Data Storage Structure", False, 
                                    "Cache file exists but contains no updates")
                else:
                    self.log_test("Data Storage Structure", False, 
                                "Cache file missing required top-level fields")
            else:
                self.log_test("Data Storage Structure", False, 
                            f"Cache file not found at {cache_file}")
                
        except Exception as e:
            self.log_test("Data Storage Structure", False, f"Error reading cache file: {str(e)}")

        # Test de persistence après refresh
        try:
            # Récupérer les stats avant refresh
            stats_before = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            before_total = 0
            if stats_before.status_code == 200:
                before_total = stats_before.json().get("total", 0)
            
            # Effectuer un refresh
            refresh_response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=30)
            
            if refresh_response.status_code == 200:
                # Vérifier les stats après refresh
                time.sleep(2)  # Attendre un peu pour la persistence
                stats_after = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
                
                if stats_after.status_code == 200:
                    after_total = stats_after.json().get("total", 0)
                    
                    if after_total >= before_total:
                        self.log_test("Data Persistence After Refresh", True, 
                                    f"Data persisted: {before_total} -> {after_total} updates")
                    else:
                        self.log_test("Data Persistence After Refresh", False, 
                                    f"Data loss detected: {before_total} -> {after_total}")
                else:
                    self.log_test("Data Persistence After Refresh", False, 
                                "Could not verify stats after refresh")
            else:
                self.log_test("Data Persistence After Refresh", False, 
                            "Refresh operation failed")
                
        except Exception as e:
            self.log_test("Data Persistence After Refresh", False, f"Error: {str(e)}")

    def test_rss_refresh_functionality(self):
        """Tester la fonctionnalité refresh RSS"""
        print("🔍 Testing RSS Refresh Functionality...")
        
        try:
            # Test du refresh avec vérification détaillée
            response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=45)
            
            if response.status_code == 200:
                data = response.json()
                
                if "message" in data and "stored" in data and "total" in data:
                    stored = data.get("stored", 0)
                    total = data.get("total", 0)
                    
                    # Vérifier que des données ont été récupérées
                    if total > 0:
                        self.log_test("RSS Refresh Data Retrieval", True, 
                                    f"Retrieved {total} articles from RSS sources")
                        
                        # Vérifier que des données ont été stockées
                        if stored > 0:
                            self.log_test("RSS Refresh Data Storage", True, 
                                        f"Stored {stored} updates successfully")
                        else:
                            self.log_test("RSS Refresh Data Storage", False, 
                                        "No updates were stored")
                    else:
                        self.log_test("RSS Refresh Data Retrieval", False, 
                                    "No articles retrieved from RSS sources")
                        
                    # Vérifier la mise à jour du cache JSON
                    time.sleep(2)
                    cache_file = "/app/data/rss-cache.json"
                    if os.path.exists(cache_file):
                        with open(cache_file, 'r', encoding='utf-8') as f:
                            cache_data = json.load(f)
                        
                        cache_updates = len(cache_data.get("updates", []))
                        if cache_updates > 0:
                            self.log_test("RSS Refresh Cache Update", True, 
                                        f"Cache updated with {cache_updates} updates")
                        else:
                            self.log_test("RSS Refresh Cache Update", False, 
                                        "Cache not updated after refresh")
                    else:
                        self.log_test("RSS Refresh Cache Update", False, 
                                    "Cache file not found after refresh")
                        
                else:
                    self.log_test("RSS Refresh Functionality", False, 
                                "Missing required fields in refresh response", data)
            else:
                self.log_test("RSS Refresh Functionality", False, 
                            f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("RSS Refresh Functionality", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all RSS system tests"""
        print("🚀 Starting RSS System Enhanced Testing")
        print("=" * 70)
        
        start_time = datetime.now()
        
        # Run all test suites according to review request
        self.test_existing_apis()
        self.test_new_rss_sources()
        self.test_translation_quality()
        self.test_data_storage()
        self.test_rss_refresh_functionality()
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Generate summary
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print("=" * 70)
        print("🎯 RSS SYSTEM TEST SUMMARY")
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
        with open("/tmp/rss_system_test_results.json", "w") as f:
            json.dump(self.test_results, f, indent=2, default=str)
        
        print(f"\n📄 Detailed results saved to: /tmp/rss_system_test_results.json")
        
        return passed_tests, failed_tests, self.test_results

if __name__ == "__main__":
    tester = RSSSystemTester()
    passed, failed, results = tester.run_all_tests()
    
    # Exit with appropriate code
    exit(0 if failed == 0 else 1)