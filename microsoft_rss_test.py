#!/usr/bin/env python3
"""
Test approfondi du système RSS de la veille technologique Microsoft
Tests spécialisés pour Next.js avec focus sur la qualité des traductions,
récupération multi-sources, formatage des données et fonctionnement refresh
"""

import requests
import json
import time
import sys
import re
from datetime import datetime
from typing import Dict, List, Any

class MicrosoftRSSSystemTester:
    def __init__(self):
        self.base_url = "http://localhost:3000"
        self.api_base = f"{self.base_url}/api"
        self.test_results = []
        self.session = requests.Session()
        
        # Sources RSS Microsoft attendues
        self.expected_sources = [
            "Windows Server Blog",
            "Microsoft Security Response Center", 
            "SQL Server Blog",
            "Azure Blog",
            "PowerShell Blog",
            ".NET Blog"
        ]
        
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

    def test_api_connectivity(self):
        """Test de connectivité API de base"""
        print("🔍 Test de connectivité API...")
        
        try:
            response = self.session.get(f"{self.api_base}/test", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "services" in data:
                    services = data.get("services", {})
                    expected_services = ["frontend", "api", "storage", "rss"]
                    has_all_services = all(service in services for service in expected_services)
                    self.log_test("API Connectivity", has_all_services, 
                                f"Services: {list(services.keys())}")
                else:
                    self.log_test("API Connectivity", False, "Missing required fields", data)
            else:
                self.log_test("API Connectivity", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("API Connectivity", False, f"Connection error: {str(e)}")

    def test_multi_source_rss_fetching(self):
        """Test de récupération multi-sources RSS"""
        print("🔍 Test de récupération multi-sources RSS...")
        
        try:
            # Récupérer toutes les mises à jour
            response = self.session.get(f"{self.api_base}/windows/updates?limit=100", timeout=20)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Analyser les sources présentes
                    sources_found = set()
                    for update in updates:
                        source = update.get("source")
                        if source:
                            sources_found.add(source)
                    
                    sources_found_list = list(sources_found)
                    expected_count = len(self.expected_sources)
                    found_count = len(sources_found_list)
                    
                    # Vérifier si toutes les sources sont présentes
                    missing_sources = [src for src in self.expected_sources if src not in sources_found]
                    
                    if found_count >= 3:  # Au moins 3 sources sur 6
                        self.log_test("Multi-Source RSS Fetching", True, 
                                    f"Sources trouvées ({found_count}/{expected_count}): {sources_found_list}")
                        if missing_sources:
                            self.log_test("Missing RSS Sources", False, 
                                        f"Sources manquantes: {missing_sources}")
                    else:
                        self.log_test("Multi-Source RSS Fetching", False, 
                                    f"Seulement {found_count} sources trouvées: {sources_found_list}")
                else:
                    self.log_test("Multi-Source RSS Fetching", False, "Aucune mise à jour trouvée")
            else:
                self.log_test("Multi-Source RSS Fetching", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Multi-Source RSS Fetching", False, f"Error: {str(e)}")

    def test_translation_quality(self):
        """Test de qualité des traductions français/anglais"""
        print("🔍 Test de qualité des traductions...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=20", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    french_indicators = 0
                    english_indicators = 0
                    mixed_content = 0
                    translation_issues = []
                    
                    for update in updates:
                        title = update.get("title", "")
                        description = update.get("description", "")
                        content = (title + " " + description).lower()
                        
                        # Indicateurs français
                        french_words = ["serveur", "sécurité", "mise à jour", "disponible", 
                                      "nouveau", "fonctionnalité", "correctifs", "est paru"]
                        french_count = sum(1 for word in french_words if word in content)
                        
                        # Indicateurs anglais
                        english_words = ["server", "security", "update", "available", 
                                       "new", "feature", "patches", "appeared first"]
                        english_count = sum(1 for word in english_words if word in content)
                        
                        if french_count > english_count:
                            french_indicators += 1
                        elif english_count > french_count:
                            english_indicators += 1
                        else:
                            mixed_content += 1
                            
                        # Détecter les problèmes de traduction
                        if "obtenir" in content and "get" in content:
                            translation_issues.append(f"Traduction incomplète dans: {title[:50]}...")
                        if "serveur" in content and "server" in content:
                            translation_issues.append(f"Mélange français/anglais dans: {title[:50]}...")
                    
                    total_updates = len(updates)
                    french_percentage = (french_indicators / total_updates) * 100
                    
                    if french_percentage >= 50:
                        self.log_test("Translation Quality", True, 
                                    f"Traduction française: {french_percentage:.1f}% ({french_indicators}/{total_updates})")
                    else:
                        self.log_test("Translation Quality", False, 
                                    f"Traduction insuffisante: {french_percentage:.1f}% français")
                    
                    if translation_issues:
                        self.log_test("Translation Issues", False, 
                                    f"{len(translation_issues)} problèmes détectés: {translation_issues[:3]}")
                    else:
                        self.log_test("Translation Consistency", True, "Pas de problèmes de traduction détectés")
                        
                else:
                    self.log_test("Translation Quality", False, "Aucune donnée pour analyser les traductions")
            else:
                self.log_test("Translation Quality", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Translation Quality", False, f"Error: {str(e)}")

    def test_data_formatting_quality(self):
        """Test de qualité du formatage et parsing des données"""
        print("🔍 Test de qualité du formatage des données...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=10", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    formatting_issues = []
                    html_remnants = 0
                    valid_dates = 0
                    valid_links = 0
                    
                    for update in updates:
                        title = update.get("title", "")
                        description = update.get("description", "")
                        link = update.get("link", "")
                        published_date = update.get("published_date", "")
                        
                        # Vérifier les résidus HTML
                        if re.search(r'<[^>]+>', title + description):
                            html_remnants += 1
                            formatting_issues.append(f"Résidus HTML dans: {title[:30]}...")
                        
                        # Vérifier les entités HTML non décodées
                        if re.search(r'&[a-zA-Z]+;|&#\d+;', title + description):
                            formatting_issues.append(f"Entités HTML non décodées dans: {title[:30]}...")
                        
                        # Vérifier la validité des dates
                        try:
                            datetime.fromisoformat(published_date.replace('Z', '+00:00'))
                            valid_dates += 1
                        except:
                            formatting_issues.append(f"Date invalide: {published_date}")
                        
                        # Vérifier la validité des liens
                        if link.startswith('http'):
                            valid_links += 1
                        else:
                            formatting_issues.append(f"Lien invalide: {link}")
                    
                    total_updates = len(updates)
                    
                    # Évaluation globale
                    if html_remnants == 0 and valid_dates == total_updates and valid_links == total_updates:
                        self.log_test("Data Formatting Quality", True, 
                                    f"Formatage excellent: {total_updates} mises à jour bien formatées")
                    else:
                        issues_summary = f"HTML remnants: {html_remnants}, Invalid dates: {total_updates - valid_dates}, Invalid links: {total_updates - valid_links}"
                        self.log_test("Data Formatting Quality", False, issues_summary)
                    
                    if formatting_issues:
                        self.log_test("Formatting Issues Details", False, 
                                    f"{len(formatting_issues)} problèmes: {formatting_issues[:3]}")
                        
                else:
                    self.log_test("Data Formatting Quality", False, "Aucune donnée à analyser")
            else:
                self.log_test("Data Formatting Quality", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Data Formatting Quality", False, f"Error: {str(e)}")

    def test_refresh_functionality(self):
        """Test du fonctionnement du refresh RSS"""
        print("🔍 Test du fonctionnement refresh RSS...")
        
        try:
            # Obtenir les stats avant refresh
            stats_before = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            before_total = 0
            if stats_before.status_code == 200:
                before_data = stats_before.json()
                before_total = before_data.get("total", 0)
            
            # Déclencher le refresh
            print("    Déclenchement du refresh RSS...")
            refresh_response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=60)
            
            if refresh_response.status_code == 200:
                refresh_data = refresh_response.json()
                stored = refresh_data.get("stored", 0)
                total_fetched = refresh_data.get("total", 0)
                
                if stored > 0 and total_fetched > 0:
                    self.log_test("RSS Refresh Execution", True, 
                                f"Refresh réussi: {stored} stockées sur {total_fetched} récupérées")
                    
                    # Vérifier que les données ont été mises à jour
                    time.sleep(3)
                    stats_after = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
                    if stats_after.status_code == 200:
                        after_data = stats_after.json()
                        after_total = after_data.get("total", 0)
                        
                        if after_total >= before_total:
                            self.log_test("RSS Refresh Data Update", True, 
                                        f"Données mises à jour: {before_total} → {after_total}")
                        else:
                            self.log_test("RSS Refresh Data Update", False, 
                                        f"Données non mises à jour: {before_total} → {after_total}")
                    else:
                        self.log_test("RSS Refresh Data Update", False, "Impossible de vérifier les données après refresh")
                else:
                    self.log_test("RSS Refresh Execution", False, 
                                f"Refresh inefficace: {stored} stockées, {total_fetched} récupérées")
            else:
                self.log_test("RSS Refresh Execution", False, 
                            f"HTTP {refresh_response.status_code}: {refresh_response.text}")
        except Exception as e:
            self.log_test("RSS Refresh Execution", False, f"Error: {str(e)}")

    def test_external_rss_sources(self):
        """Test d'accessibilité des sources RSS externes réelles"""
        print("🔍 Test des sources RSS externes...")
        
        rss_sources = {
            "Windows Server Blog": "https://cloudblogs.microsoft.com/windowsserver/feed/",
            "Microsoft Security": "https://msrc.microsoft.com/blog/rss",
            "SQL Server Blog": "https://www.microsoft.com/en-us/sql-server/blog/feed/",
            "Azure Blog": "https://azure.microsoft.com/fr-fr/blog/feed/",
            "PowerShell Blog": "https://devblogs.microsoft.com/powershell/feed/",
            ".NET Blog": "https://devblogs.microsoft.com/dotnet/feed/"
        }
        
        accessible_sources = 0
        total_sources = len(rss_sources)
        
        for source_name, url in rss_sources.items():
            try:
                response = requests.get(url, timeout=15, headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                })
                
                if response.status_code == 200:
                    content_type = response.headers.get("content-type", "").lower()
                    content = response.text[:1000].lower()
                    
                    # Vérifier si c'est du XML/RSS valide
                    if ("xml" in content_type or "rss" in content or "<rss" in content or 
                        "<feed" in content or "<?xml" in content):
                        accessible_sources += 1
                        self.log_test(f"RSS Source: {source_name}", True, 
                                    f"Accessible - Content-Type: {content_type}")
                    else:
                        self.log_test(f"RSS Source: {source_name}", False, 
                                    f"Contenu non-RSS - Content-Type: {content_type}")
                else:
                    self.log_test(f"RSS Source: {source_name}", False, 
                                f"HTTP {response.status_code}")
            except Exception as e:
                self.log_test(f"RSS Source: {source_name}", False, f"Error: {str(e)}")
        
        # Évaluation globale
        success_rate = (accessible_sources / total_sources) * 100
        if success_rate >= 70:
            self.log_test("External RSS Sources Overall", True, 
                        f"{accessible_sources}/{total_sources} sources accessibles ({success_rate:.1f}%)")
        else:
            self.log_test("External RSS Sources Overall", False, 
                        f"Seulement {accessible_sources}/{total_sources} sources accessibles ({success_rate:.1f}%)")

    def test_filtering_functionality(self):
        """Test des fonctionnalités de filtrage"""
        print("🔍 Test des fonctionnalités de filtrage...")
        
        try:
            # Test filtrage par catégorie
            categories_to_test = ["server", "security", "cloud", "enterprise"]
            
            for category in categories_to_test:
                response = self.session.get(f"{self.api_base}/windows/updates?category={category}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    updates = data.get("updates", [])
                    
                    # Vérifier que tous les résultats correspondent à la catégorie
                    category_match = all(update.get("category") == category for update in updates)
                    
                    if category_match:
                        self.log_test(f"Category Filter: {category}", True, 
                                    f"{len(updates)} mises à jour filtrées correctement")
                    else:
                        wrong_categories = [update.get("category") for update in updates 
                                          if update.get("category") != category]
                        self.log_test(f"Category Filter: {category}", False, 
                                    f"Catégories incorrectes trouvées: {set(wrong_categories)}")
                else:
                    self.log_test(f"Category Filter: {category}", False, f"HTTP {response.status_code}")
            
            # Test filtrage par limite
            limits_to_test = [5, 10, 20]
            for limit in limits_to_test:
                response = self.session.get(f"{self.api_base}/windows/updates?limit={limit}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    updates = data.get("updates", [])
                    actual_count = len(updates)
                    
                    if actual_count <= limit:
                        self.log_test(f"Limit Filter: {limit}", True, 
                                    f"Limite respectée: {actual_count} ≤ {limit}")
                    else:
                        self.log_test(f"Limit Filter: {limit}", False, 
                                    f"Limite dépassée: {actual_count} > {limit}")
                else:
                    self.log_test(f"Limit Filter: {limit}", False, f"HTTP {response.status_code}")
                    
        except Exception as e:
            self.log_test("Filtering Functionality", False, f"Error: {str(e)}")

    def test_data_consistency(self):
        """Test de cohérence des timestamps et données"""
        print("🔍 Test de cohérence des données...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=20", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    consistency_issues = []
                    future_dates = 0
                    invalid_dates = 0
                    
                    current_time = datetime.now()
                    
                    for update in updates:
                        # Vérifier les dates
                        try:
                            pub_date = datetime.fromisoformat(update.get("published_date", "").replace('Z', '+00:00'))
                            created_date = datetime.fromisoformat(update.get("created_at", "").replace('Z', '+00:00'))
                            updated_date = datetime.fromisoformat(update.get("updated_at", "").replace('Z', '+00:00'))
                            
                            # Vérifier les dates futures
                            if pub_date > current_time:
                                future_dates += 1
                                consistency_issues.append(f"Date future: {update.get('title', '')[:30]}")
                            
                            # Vérifier la cohérence created_at <= updated_at
                            if created_date > updated_date:
                                consistency_issues.append(f"created_at > updated_at: {update.get('title', '')[:30]}")
                                
                        except Exception as e:
                            invalid_dates += 1
                            consistency_issues.append(f"Date invalide: {str(e)}")
                        
                        # Vérifier la cohérence des champs obligatoires
                        required_fields = ["id", "title", "link", "source", "category"]
                        missing_fields = [field for field in required_fields if not update.get(field)]
                        if missing_fields:
                            consistency_issues.append(f"Champs manquants {missing_fields}: {update.get('title', '')[:30]}")
                    
                    total_updates = len(updates)
                    
                    if not consistency_issues:
                        self.log_test("Data Consistency", True, 
                                    f"Toutes les {total_updates} mises à jour sont cohérentes")
                    else:
                        self.log_test("Data Consistency", False, 
                                    f"{len(consistency_issues)} problèmes de cohérence détectés")
                        self.log_test("Consistency Issues Details", False, 
                                    f"Problèmes: {consistency_issues[:5]}")
                else:
                    self.log_test("Data Consistency", False, "Aucune donnée à vérifier")
            else:
                self.log_test("Data Consistency", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Data Consistency", False, f"Error: {str(e)}")

    def run_comprehensive_tests(self):
        """Exécuter tous les tests approfondis"""
        print("🚀 DÉMARRAGE DU TEST APPROFONDI DU SYSTÈME RSS MICROSOFT")
        print("=" * 80)
        print("Focus: Traductions, Multi-sources, Formatage, Refresh")
        print("=" * 80)
        
        start_time = datetime.now()
        
        # Exécuter tous les tests spécialisés
        self.test_api_connectivity()
        self.test_multi_source_rss_fetching()
        self.test_translation_quality()
        self.test_data_formatting_quality()
        self.test_refresh_functionality()
        self.test_external_rss_sources()
        self.test_filtering_functionality()
        self.test_data_consistency()
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Générer le rapport final
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print("=" * 80)
        print("🎯 RAPPORT FINAL DU TEST APPROFONDI")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Réussis: {passed_tests}")
        print(f"❌ Échoués: {failed_tests}")
        print(f"⏱️  Durée: {duration:.2f} secondes")
        print(f"📊 Taux de réussite: {(passed_tests/total_tests*100):.1f}%")
        
        # Analyser les problèmes critiques
        critical_failures = []
        for result in self.test_results:
            if not result["success"]:
                if any(keyword in result["test"].lower() for keyword in 
                      ["connectivity", "multi-source", "refresh", "translation"]):
                    critical_failures.append(result)
        
        if critical_failures:
            print(f"\n🚨 PROBLÈMES CRITIQUES DÉTECTÉS ({len(critical_failures)}):")
            for failure in critical_failures:
                print(f"  - {failure['test']}: {failure['details']}")
        
        if failed_tests > 0:
            print(f"\n❌ TOUS LES ÉCHECS ({failed_tests}):")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['details']}")
        
        # Sauvegarder les résultats détaillés
        with open("/tmp/microsoft_rss_test_results.json", "w", encoding='utf-8') as f:
            json.dump(self.test_results, f, indent=2, default=str, ensure_ascii=False)
        
        print(f"\n📄 Résultats détaillés sauvegardés: /tmp/microsoft_rss_test_results.json")
        
        return passed_tests, failed_tests, self.test_results

if __name__ == "__main__":
    tester = MicrosoftRSSSystemTester()
    passed, failed, results = tester.run_comprehensive_tests()
    
    # Code de sortie basé sur les résultats
    sys.exit(0 if failed == 0 else 1)