// Service RSS pour récupérer et traiter les flux Windows
import { parseStringPromise } from 'xml2js';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { logger } from './logger';

class WindowsRSSFetcher {
  constructor() {
    this.sources = {
      lemondeinformatique_os: {
        url: "https://www.lemondeinformatique.fr/flux-rss/thematique/os/rss.xml",
        name: "Le Monde Informatique - OS",
        category: "particuliers",
        language: "fr"
      },
      lemondeinformatique_securite: {
        url: "https://www.lemondeinformatique.fr/flux-rss/thematique/securite/rss.xml",
        name: "Le Monde Informatique - Sécurité",
        category: "security",
        language: "fr"
      },
      lemondeinformatique_poste: {
        url: "https://www.lemondeinformatique.fr/flux-rss/thematique/poste-de-travail/rss.xml",
        name: "Le Monde Informatique - Poste de Travail",
        category: "particuliers",
        language: "fr"
      },
      lemondeinformatique_pme: {
        url: "https://www.lemondeinformatique.fr/flux-rss/thematique/pme/rss.xml",
        name: "Le Monde Informatique - PME",
        category: "entreprise",
        language: "fr"
      },
      lemondeinformatique_datacenter: {
        url: "https://www.lemondeinformatique.fr/flux-rss/thematique/datacenter/rss.xml",
        name: "Le Monde Informatique - Datacenter",
        category: "serveur",
        language: "fr"
      },
      it_connect: {
        url: "https://www.it-connect.fr/feed/",
        name: "IT-Connect",
        category: "entreprise",
        language: "fr"
      },
      lemagit_conseils: {
        url: "https://www.lemagit.fr/rss/Conseils-IT.xml",
        name: "LeMagIT - Conseils IT",
        category: "entreprise",
        language: "fr"
      },
      lemondeinformatique_reseaux: {
        url: "https://www.lemondeinformatique.fr/flux-rss/thematique/reseaux/rss.xml",
        name: "Le Monde Informatique - Réseaux",
        category: "iot",
        language: "fr"
      }
    };
  }

  async fetchFeed(sourceKey) {
    try {
      const source = this.sources[sourceKey];
      if (!source) return [];

      logger.rss(`📡 Récupération du feed : ${source.name}`);

      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        next: { revalidate: parseInt(process.env.NEXT_PUBLIC_RSS_CACHE_TIME) || 3600 } // Cache configurable
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const xmlText = await response.text();
      
      // Parse XML manually for better control
      const updates = this.parseRSSFeed(xmlText, source);
      
      logger.rss(`✅ ${updates.length} mises à jour récupérées de ${source.name}`);
      return updates;

    } catch (error) {
      logger.error(`❌ Erreur récupération feed ${sourceKey}:`, error);
      return [];
    }
  }

  parseRSSFeed(xmlText, source) {
    try {
      // Simple XML parsing for RSS
      const itemRegex = /<item>(.*?)<\/item>/gs;
      const items = [];
      let match;

      while ((match = itemRegex.exec(xmlText)) !== null) {
        const itemXml = match[1];
        const item = this.parseRSSItem(itemXml, source);
        if (item && this.isRelevantForWindows(item)) {
          items.push(item);
        }
      }

      return items.slice(0, 20); // Limit to 20 recent entries
    } catch (error) {
      logger.error('Erreur parsing RSS:', error);
      return [];
    }
  }

  parseRSSItem(itemXml, source) {
    try {
      // Extract basic fields
      const title = this.extractXmlTag(itemXml, 'title') || "Sans titre";
      const link = this.extractXmlTag(itemXml, 'link') || "";
      const description = this.cleanHtml(this.extractXmlTag(itemXml, 'description') || "");
      const pubDate = this.extractXmlTag(itemXml, 'pubDate') || new Date().toISOString();

      // Parse publication date
      let publishedDate = new Date();
      try {
        publishedDate = new Date(pubDate);
      } catch (e) {
        publishedDate = new Date();
      }

      // Content is already in French - no translation needed
      let finalTitle = title;
      let finalDescription = description.substring(0, 1000);

      // Extract Windows version
      const version = this.extractWindowsVersion(title + " " + description);
      
      // Extract KB number  
      const kbNumber = this.extractKbNumber(title + " " + description);
      
      // Extract severity for security updates
      const severity = this.extractSeverity(title + " " + description);
      
      // Generate tags
      const tags = this.generateTags(title, description, source.category);

      return {
        id: this.generateId(title, link),
        title: finalTitle,
        description: finalDescription,
        link: link,
        published_date: publishedDate.toISOString(),
        category: source.category,
        version: version,
        kb_number: kbNumber,
        severity: severity,
        tags: tags,
        source: source.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

    } catch (error) {
      logger.error('Erreur parsing item RSS:', error);
      return null;
    }
  }

  extractXmlTag(xml, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 'is');
    const match = xml.match(regex);
    return match ? match[1].trim() : null;
  }

  cleanHtml(htmlText) {
    if (!htmlText) return "";
    
    // Remove HTML tags
    let text = htmlText.replace(/<[^>]*>/g, '');
    
    // Remove XML artifacts and CDATA
    text = text.replace(/\]\]>/g, '');
    text = text.replace(/\[CDATA\[/g, '');
    text = text.replace(/^<!\[CDATA\[/g, '');
    text = text.replace(/\]\]>$/g, '');
    
    // Decode HTML entities
    text = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');
    
    // Clean up extra whitespace and newlines
    text = text.replace(/\s+/g, ' ').trim();
    
    return text;
  }

  extractWindowsVersion(text) {
    const textLower = text.toLowerCase();
    
    const patterns = [
      /windows\s+11\s+24h2/,
      /windows\s+11\s+23h2/,
      /windows\s+11/,
      /windows\s+server\s+2025/,
      /windows\s+server\s+2022/,
      /windows\s+server\s+2019/,
      /serveur\s+2025/,
      /serveur\s+2022/,
      /serveur\s+2019/,
      /windows\s+10\s+22h2/,
      /windows\s+10/,
      /office\s+365/,
      /office\s+2021/,
      /office\s+2019/,
      /azure\s+ad/,
      /microsoft\s+365/
    ];
    
    for (const pattern of patterns) {
      const match = textLower.match(pattern);
      if (match) {
        return match[0].replace(/\s+/g, ' ').trim();
      }
    }
    
    return null;
  }

  extractKbNumber(text) {
    const kbPattern = /KB\d{7}/i;
    const match = text.match(kbPattern);
    return match ? match[0] : null;
  }

  extractSeverity(text) {
    const textLower = text.toLowerCase();
    
    if (/critical|critique|zero-day/.test(textLower)) {
      return "Critical";
    } else if (/important|importante/.test(textLower)) {
      return "Important";  
    } else if (/moderate|modérée/.test(textLower)) {
      return "Moderate";
    } else if (/low|faible/.test(textLower)) {
      return "Low";
    }
    
    return null;
  }

  generateTags(title, description, category) {
    const text = (title + " " + description).toLowerCase();
    const tags = [];
    
    // Technical keywords (français)
    const techKeywords = {
      'sécurité': ['sécurité', 'vulnérabilité', 'correctif', 'exploit', 'cybersécurité', 'piratage'],
      'serveur': ['serveur', 'server', 'datacenter', 'centre de données', 'infrastructure'],
      'mise-à-jour': ['mise à jour', 'update', 'upgrade', 'installation', 'déploiement'],
      'fonctionnalité': ['fonctionnalité', 'feature', 'nouveau', 'amélioration', 'innovation'],
      'correction': ['bug', 'correction', 'résolution', 'problème', 'erreur', 'fix'],
      'windows': ['windows', 'microsoft', 'office', 'azure'],
      'réseau': ['réseau', 'network', 'connectivité', 'internet'],
      'iot': ['iot', 'objets connectés', 'internet des objets', 'capteur'],
      'entreprise': ['entreprise', 'pme', 'professionnel', 'organisation'],
      'particulier': ['particulier', 'grand public', 'poste de travail', 'pc']
    };
    
    for (const [tag, keywords] of Object.entries(techKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        tags.push(tag);
      }
    }
    
    // Always add category
    if (!tags.includes(category)) {
      tags.push(category);
    }
    
    return tags;
  }

  isRelevantForWindows(update) {
    const text = (update.title + " " + update.description).toLowerCase();
    
    // Keywords Windows/Windows Server (français)
    const windowsKeywords = [
      'windows server', 'windows 11', 'windows 10', 'windows', 
      'serveur 2025', 'serveur 2022', 'serveur 2019', 'active directory', 
      'hyper-v', 'iis', 'dns', 'dhcp', 'stratégies de groupe', 'gpo',
      'microsoft', 'azure', 'office', 'exchange'
    ];
    
    // Keywords infrastructure et systèmes (français)
    const infraKeywords = [
      'infrastructure', 'centre de données', 'datacenter', 'entreprise', 'admin', 'administration',
      'déploiement', 'migration', 'sauvegarde', 'récupération', 'clustering',
      'virtualisation', 'réseau', 'sécurité', 'correctif', 'mise à jour', 'patch',
      'serveur', 'poste de travail', 'iot', 'objets connectés'
    ];
    
    // Keywords techniques professionnels (français)
    const techKeywords = [
      'powershell', 'sql server', 'exchange', 'sharepoint', 'system center',
      'wsus', 'rds', 'services de terminal', 'cluster de basculement', 'espaces de stockage',
      'docker', 'kubernetes', 'conteneurs', 'cloud', 'nuage', 'cybersécurité'
    ];
    
    // Categories spécifiques
    const categoryKeywords = {
      particuliers: ['particulier', 'grand public', 'poste de travail', 'pc', 'ordinateur'],
      serveur: ['serveur', 'server', 'datacenter', 'centre de données', 'infrastructure'],
      iot: ['iot', 'objets connectés', 'internet des objets', 'capteur', 'device'],
      entreprise: ['entreprise', 'pme', 'tpe', 'organisation', 'professionnel']
    };
    
    // Vérifier présence keywords pertinents
    const hasWindowsKeyword = windowsKeywords.some(keyword => text.includes(keyword));
    const hasInfraKeyword = infraKeywords.some(keyword => text.includes(keyword));
    const hasTechKeyword = techKeywords.some(keyword => text.includes(keyword));
    const hasCategoryKeyword = Object.values(categoryKeywords).flat().some(keyword => text.includes(keyword));
    
    // Exclure les articles non pertinents
    const excludeKeywords = [
      'jeux', 'gaming', 'divertissement', 'musique', 'film', 'streaming',
      'sport', 'finance personnelle', 'cuisine', 'voyage'
    ];
    const hasExcludeKeyword = excludeKeywords.some(keyword => text.includes(keyword));
    
    // Logique de filtrage élargie pour sources françaises
    if (hasExcludeKeyword) return false;
    if (hasWindowsKeyword) return true;
    if (hasInfraKeyword) return true;
    if (hasTechKeyword) return true;
    if (hasCategoryKeyword) return true;
    
    // Pour les sources françaises spécialisées, on accepte plus largement
    return true;
  }

  translateSimple(text) {
    if (!text) return text;

    // Improved translation with better context handling
    const translations = {
      // Phrases complètes d'abord (ordre important)
      'tired of all the restarts? get hotpatching for windows server': 'fatigué de tous les redémarrages ? obtenez les correctifs à chaud pour Windows Server',
      'join us at windows server summit': 'rejoignez-nous au Windows Server Summit',
      'learn more about our latest innovations': 'en savoir plus sur nos dernières innovations',
      'now generally available with advanced security': 'maintenant généralement disponible avec une sécurité avancée',
      'enhanced security and performance': 'sécurité et performances améliorées',
      'improved performance and cloud agility': 'performances améliorées et agilité cloud',
      'subscription service': 'service par abonnement',
      'infrastructure management': 'gestion d\'infrastructure',
      'cloud capabilities': 'capacités cloud',
      'efficient it operations': 'opérations IT efficaces',
      'we are excited to announce': 'nous avons le plaisir d\'annoncer',
      'we are pleased to announce': 'nous sommes heureux d\'annoncer',
      'appeared first on': 'est paru en premier sur',
      'the post': 'l\'article',
      'this post': 'cet article',
      
      // Technical terms
      'hotpatching': 'correctifs à chaud',
      'patching': 'application de correctifs',
      'restarts': 'redémarrages',
      'reboot': 'redémarrage',
      'windows server': 'Windows Server',
      'server': 'serveur',
      'security': 'sécurité',
      'update': 'mise à jour',
      'updates': 'mises à jour',
      'patch': 'correctif',
      'patches': 'correctifs',
      'vulnerability': 'vulnérabilité',
      'vulnerabilities': 'vulnérabilités',
      'feature': 'fonctionnalité',
      'features': 'fonctionnalités',
      'new features': 'nouvelles fonctionnalités',
      'performance': 'performances',
      'improvements': 'améliorations',
      'enhancement': 'amélioration',
      'enhancements': 'améliorations',
      'release': 'version',
      'preview': 'aperçu',
      'available': 'disponible',
      'now available': 'maintenant disponible',
      'generally available': 'généralement disponible',
      'public preview': 'aperçu public',
      'enterprise': 'entreprise',
      'cloud': 'cloud',
      'datacenter': 'centre de données',
      'support': 'prise en charge',
      'management': 'gestion',
      'administration': 'administration',
      'deployment': 'déploiement',
      'configuration': 'configuration',
      'installation': 'installation',
      'upgrade': 'mise à niveau',
      'migration': 'migration',
      
      // Time expressions
      'and': 'et',
      'with': 'avec',
      'for': 'pour',
      'from': 'de',
      'to': 'vers',
      'in': 'dans',
      'on': 'sur',
      'at': 'à'
    };
    
    let translatedText = text;
    
    // Apply translations in order of length (longest phrases first)
    const sortedTranslations = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);
    
    for (const [english, french] of sortedTranslations) {
      // Use case-insensitive replacement with word boundaries when appropriate
      const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      translatedText = translatedText.replace(regex, french);
    }
    
    return translatedText;
  }

  isFrenchContent(text) {
    const frenchIndicators = [
      'de la', 'de le', 'du ', 'des ', 'le ', 'la ', 'les ',
      'mise à jour', 'sécurité', 'disponible', 'nouveau',
      'nouvelle', 'fonctionnalité', 'amélioration', 'article',
      'Microsoft France', 'en français'
    ];
    
    const textLower = text.toLowerCase();
    const frenchCount = frenchIndicators.filter(indicator => 
      textLower.includes(indicator)
    ).length;
    
    return frenchCount >= 3;
  }

  generateId(title, link) {
    // Generate a simple hash-like ID
    const text = title + link;
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  }

  async fetchAllFeeds() {
    const allUpdates = [];
    
    for (const sourceKey of Object.keys(this.sources)) {
      try {
        const updates = await this.fetchFeed(sourceKey);
        allUpdates.push(...updates);
        
        // Délai configurable entre les requêtes
        const delay = parseInt(process.env.NEXT_PUBLIC_RSS_REQUEST_DELAY) || 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (error) {
        logger.error(`❌ Erreur source ${sourceKey}:`, error);
        continue;
      }
    }
    
    // Sort by publication date (newest first)
    allUpdates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
    
    logger.rss(`🎯 Total mises à jour récupérées : ${allUpdates.length}`);
    return allUpdates;
  }
}

export const rssFetcher = new WindowsRSSFetcher();