// Service RSS pour récupérer et traiter les flux Cloud Computing
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

class CloudRSSFetcher {
  constructor() {
    this.sources = {
      // Sources officielles des fournisseurs Cloud (en anglais)
      aws_blog: {
        url: "https://aws.amazon.com/blogs/aws/feed/",
        name: "AWS Blog",
        category: "infrastructure",
        provider: "aws",
        language: "en"
      },
      azure_updates: {
        url: "https://azurecomcdn.azureedge.net/en-us/blog/feed/",
        name: "Microsoft Azure Blog",
        category: "cloud",
        provider: "azure",
        language: "en"
      },
      google_cloud: {
        url: "https://cloudblog.withgoogle.com/rss/",
        name: "Google Cloud Blog",
        category: "cloud",
        provider: "gcp",
        language: "en"
      },
      
      // Sources françaises spécialisées Cloud
      lemondeinformatique_cloud: {
        url: "https://www.lemondeinformatique.fr/flux-rss/thematique/cloud-computing/rss.xml",
        name: "Le Monde Informatique - Cloud",
        category: "cloud",
        provider: "france",
        language: "fr"
      },
      lemondeinformatique_securite: {
        url: "https://www.lemondeinformatique.fr/flux-rss/thematique/securite/rss.xml",
        name: "Le Monde Informatique - Sécurité",
        category: "securite",
        provider: "france",
        language: "fr"
      },
      it_connect: {
        url: "https://www.it-connect.fr/feed/",
        name: "IT-Connect",
        category: "devops",
        provider: "france",
        language: "fr"
      },
      lemagit_cloud: {
        url: "https://www.lemagit.fr/rss",
        name: "LeMagIT - Cloud Computing",
        category: "cloud",
        provider: "france",
        language: "fr"
      }
    };
  }

  async fetchFeed(sourceKey) {
    try {
      const source = this.sources[sourceKey];
      if (!source) return [];

      console.log(`☁️ Récupération du feed Cloud : ${source.name}`);

      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          'Accept-Encoding': 'identity'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const xmlText = await response.text();
      
      // Parse XML manually for better control
      const updates = this.parseRSSFeed(xmlText, source);
      
      console.log(`✅ ${updates.length} actualités Cloud récupérées de ${source.name}`);
      return updates;

    } catch (error) {
      console.error(`❌ Erreur récupération feed Cloud ${sourceKey}:`, error);
      return [];
    }
  }

  parseRSSFeed(xmlText, source) {
    try {
      // Handle both standard RSS and RDF formats
      let itemRegex = /<item[^>]*>(.*?)<\/item>/gs;
      const items = [];
      let match;

      // Try standard RSS format first
      while ((match = itemRegex.exec(xmlText)) !== null) {
        const itemXml = match[1];
        const item = this.parseRSSItem(itemXml, source);
        if (item && this.isRelevantForCloud(item)) {
          items.push(item);
        }
      }

      // If no items found, try RDF format (for Le Monde Informatique)
      if (items.length === 0) {
        itemRegex = /<item rdf:about="[^"]*">(.*?)<\/item>/gs;
        while ((match = itemRegex.exec(xmlText)) !== null) {
          const itemXml = match[1];
          const item = this.parseRSSItem(itemXml, source);
          if (item && this.isRelevantForCloud(item)) {
            items.push(item);
          }
        }
      }

      return items.slice(0, 20); // Limit to 20 recent entries
    } catch (error) {
      console.error('Erreur parsing RSS Cloud:', error);
      return [];
    }
  }

  parseRSSItem(itemXml, source) {
    try {
      // Extract basic fields
      let title = this.extractXmlTag(itemXml, 'title') || "Sans titre";
      const link = this.extractXmlTag(itemXml, 'link') || "";
      let description = this.extractXmlTag(itemXml, 'description') || this.extractXmlTag(itemXml, 'content:encoded') || "";
      const pubDate = this.extractXmlTag(itemXml, 'pubDate') || this.extractXmlTag(itemXml, 'dc:date') || new Date().toISOString();

      // Clean title and description from HTML and CDATA
      title = this.cleanHtml(title);
      description = this.cleanHtml(description);

      // Parse publication date
      let publishedDate = new Date();
      try {
        publishedDate = new Date(pubDate);
      } catch (e) {
        publishedDate = new Date();
      }

      // Translation if needed (Cloud content in French)
      let finalTitle = title;
      let finalDescription = description.substring(0, 800);

      if (source.language === "en") {
        if (!this.isFrenchContent(title + " " + description)) {
          finalTitle = this.translateToFrench(title);
          if (description.length > 50) {
            finalDescription = this.translateToFrench(description.substring(0, 500));
          }
        }
      }

      // Extract service type (SaaS, PaaS, IaaS)
      const serviceType = this.extractServiceType(title + " " + description);
      
      // Extract cloud provider
      const cloudProvider = this.extractCloudProvider(title + " " + description, source.provider);
      
      // Generate tags
      const tags = this.generateCloudTags(title, description, source.category);

      return {
        id: this.generateId(title, link),
        title: finalTitle,
        description: finalDescription,
        link: link,
        published_date: publishedDate.toISOString(),
        category: source.category,
        service_type: serviceType,
        cloud_provider: cloudProvider,
        tags: tags,
        source: source.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

    } catch (error) {
      console.error('Erreur parsing item RSS Cloud:', error);
      return null;
    }
  }

  extractXmlTag(xml, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 'is');
    const match = xml.match(regex);
    if (match) {
      let content = match[1].trim();
      // Remove CDATA wrapper if present
      content = content.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
      return content;
    }
    return null;
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

  extractServiceType(text) {
    const textLower = text.toLowerCase();
    
    // Service type patterns
    if (/\b(saas|software as a service|logiciel en tant que service)\b/.test(textLower)) {
      return "SaaS";
    } else if (/\b(paas|platform as a service|plateforme en tant que service)\b/.test(textLower)) {
      return "PaaS";
    } else if (/\b(iaas|infrastructure as a service|infrastructure en tant que service)\b/.test(textLower)) {
      return "IaaS";
    } else if (/\b(faas|function as a service|serverless|sans serveur)\b/.test(textLower)) {
      return "FaaS";
    }
    
    return null;
  }

  extractCloudProvider(text, sourceProvider) {
    const textLower = text.toLowerCase();
    
    // Provider patterns
    const providers = {
      'AWS': ['aws', 'amazon web services', 'amazon cloud', 'ec2', 's3', 'lambda'],
      'Azure': ['azure', 'microsoft azure', 'microsoft cloud'],
      'GCP': ['google cloud', 'gcp', 'google cloud platform'],
      'OVH': ['ovh', 'ovhcloud'],
      'IBM': ['ibm cloud', 'ibm'],
      'Oracle': ['oracle cloud', 'oracle']
    };
    
    for (const [provider, keywords] of Object.entries(providers)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        return provider;
      }
    }
    
    // Fallback to source provider
    if (sourceProvider === 'aws') return 'AWS';
    if (sourceProvider === 'azure') return 'Azure';
    if (sourceProvider === 'gcp') return 'GCP';
    
    return null;
  }

  generateCloudTags(title, description, category) {
    const text = (title + " " + description).toLowerCase();
    const tags = [];
    
    // Technical cloud keywords (français + anglais)
    const techKeywords = {
      'sécurité': ['sécurité', 'security', 'vulnérabilité', 'vulnerability', 'cybersécurité', 'cybersecurity'],
      'infrastructure': ['infrastructure', 'serveur', 'server', 'datacenter', 'centre de données'],
      'devops': ['devops', 'ci/cd', 'jenkins', 'gitlab', 'github', 'kubernetes', 'docker', 'conteneur', 'container'],
      'multi-cloud': ['multi-cloud', 'hybrid', 'hybride', 'multi cloud'],
      'migration': ['migration', 'migrer', 'migrate', 'transition'],
      'ia': ['ia', 'ai', 'intelligence artificielle', 'artificial intelligence', 'machine learning', 'ml'],
      'stockage': ['storage', 'stockage', 's3', 'blob', 'object storage'],
      'réseau': ['network', 'réseau', 'vpc', 'cdn', 'load balancer'],
      'base-de-données': ['database', 'base de données', 'sql', 'nosql', 'postgresql', 'mongodb'],
      'serverless': ['serverless', 'sans serveur', 'lambda', 'function', 'fonction']
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

  isRelevantForCloud(update) {
    const text = (update.title + " " + update.description).toLowerCase();
    
    // Keywords Cloud Computing (français + anglais)
    const cloudKeywords = [
      'cloud', 'nuage', 'aws', 'azure', 'google cloud', 'gcp',
      'saas', 'paas', 'iaas', 'faas',
      'serverless', 'sans serveur', 'lambda', 'function',
      'kubernetes', 'docker', 'conteneur', 'container',
      'infrastructure as code', 'terraform', 'ansible'
    ];
    
    // Keywords infrastructure cloud (français + anglais)
    const infraKeywords = [
      'infrastructure', 'datacenter', 'centre de données',
      'virtualisation', 'virtualization',
      'migration cloud', 'cloud migration',
      'multi-cloud', 'hybrid cloud', 'cloud hybride',
      'devops', 'ci/cd', 'automation', 'automatisation'
    ];
    
    // Keywords services cloud (français + anglais)
    const serviceKeywords = [
      'compute', 'calcul', 'storage', 'stockage',
      'database', 'base de données', 'networking', 'réseau',
      'security', 'sécurité', 'monitoring', 'surveillance',
      'backup', 'sauvegarde', 'disaster recovery', 'plan de reprise'
    ];
    
    // Keywords sécurité cloud
    const securityKeywords = [
      'cybersécurité', 'cybersecurity', 'vulnerability', 'vulnérabilité',
      'encryption', 'chiffrement', 'compliance', 'conformité',
      'rgpd', 'gdpr', 'zero trust', 'iam', 'identity'
    ];
    
    // Vérifier présence keywords pertinents
    const hasCloudKeyword = cloudKeywords.some(keyword => text.includes(keyword));
    const hasInfraKeyword = infraKeywords.some(keyword => text.includes(keyword));
    const hasServiceKeyword = serviceKeywords.some(keyword => text.includes(keyword));
    const hasSecurityKeyword = securityKeywords.some(keyword => text.includes(keyword));
    
    // Exclure les articles non pertinents
    const excludeKeywords = [
      'jeux', 'gaming', 'divertissement', 'musique', 'film', 'streaming video',
      'sport', 'finance personnelle', 'cuisine', 'voyage'
    ];
    const hasExcludeKeyword = excludeKeywords.some(keyword => text.includes(keyword));
    
    // Logique de filtrage
    if (hasExcludeKeyword) return false;
    if (hasCloudKeyword) return true;
    if (hasInfraKeyword) return true;
    if (hasServiceKeyword) return true;
    if (hasSecurityKeyword) return true;
    
    // Pour les sources spécialisées cloud, on accepte largement
    return true;
  }

  isFrenchContent(text) {
    const frenchIndicators = [
      'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de',
      'est', 'sont', 'être', 'avoir', 'fait', 'peut',
      'pour', 'avec', 'dans', 'sur', 'par',
      'et', 'ou', 'mais', 'donc', 'car'
    ];
    
    const textLower = text.toLowerCase();
    let frenchCount = 0;
    
    for (const word of frenchIndicators) {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      const matches = textLower.match(regex);
      if (matches) {
        frenchCount += matches.length;
      }
    }
    
    // Si plus de 5 indicateurs français trouvés, c'est probablement du français
    return frenchCount > 5;
  }

  translateToFrench(text) {
    if (!text) return text;

    // Comprehensive cloud-specific translations
    const translations = {
      // Phrases complètes d'abord (ordre important)
      'announcing general availability': 'annonce de la disponibilité générale',
      'now generally available': 'maintenant disponible de manière générale',
      'public preview': 'aperçu public',
      'private preview': 'aperçu privé',
      'now available': 'maintenant disponible',
      'introducing': 'présentation de',
      'we are excited to announce': 'nous sommes ravis d\'annoncer',
      'we are pleased to announce': 'nous sommes heureux d\'annoncer',
      'appeared first on': 'est paru en premier sur',
      'the post': 'l\'article',
      'read more': 'lire la suite',
      
      // Cloud computing terms
      'cloud computing': 'cloud computing',
      'cloud': 'cloud',
      'software as a service': 'logiciel en tant que service',
      'platform as a service': 'plateforme en tant que service',
      'infrastructure as a service': 'infrastructure en tant que service',
      'function as a service': 'fonction en tant que service',
      'saas': 'SaaS',
      'paas': 'PaaS',
      'iaas': 'IaaS',
      'faas': 'FaaS',
      
      // Deployment models
      'public cloud': 'cloud public',
      'private cloud': 'cloud privé',
      'hybrid cloud': 'cloud hybride',
      'multi-cloud': 'multi-cloud',
      
      // Technical terms
      'serverless': 'sans serveur',
      'container': 'conteneur',
      'containers': 'conteneurs',
      'kubernetes': 'Kubernetes',
      'docker': 'Docker',
      'microservices': 'microservices',
      'api gateway': 'passerelle API',
      'load balancer': 'répartiteur de charge',
      'auto-scaling': 'mise à l\'échelle automatique',
      'elasticity': 'élasticité',
      
      // Storage terms
      'storage': 'stockage',
      'object storage': 'stockage objet',
      'block storage': 'stockage bloc',
      'file storage': 'stockage fichier',
      'backup': 'sauvegarde',
      'snapshot': 'instantané',
      'replication': 'réplication',
      
      // Networking terms
      'virtual network': 'réseau virtuel',
      'vpc': 'VPC',
      'subnet': 'sous-réseau',
      'firewall': 'pare-feu',
      'cdn': 'CDN',
      'content delivery network': 'réseau de diffusion de contenu',
      
      // Security terms
      'security': 'sécurité',
      'encryption': 'chiffrement',
      'authentication': 'authentification',
      'authorization': 'autorisation',
      'compliance': 'conformité',
      'vulnerability': 'vulnérabilité',
      'threat': 'menace',
      'zero trust': 'zéro confiance',
      
      // DevOps terms
      'devops': 'DevOps',
      'ci/cd': 'CI/CD',
      'continuous integration': 'intégration continue',
      'continuous deployment': 'déploiement continu',
      'pipeline': 'pipeline',
      'automation': 'automatisation',
      
      // Database terms
      'database': 'base de données',
      'relational database': 'base de données relationnelle',
      'nosql': 'NoSQL',
      'data warehouse': 'entrepôt de données',
      'big data': 'big data',
      
      // AI/ML terms
      'artificial intelligence': 'intelligence artificielle',
      'machine learning': 'apprentissage automatique',
      'deep learning': 'apprentissage profond',
      'neural network': 'réseau de neurones',
      
      // Common terms
      'update': 'mise à jour',
      'updates': 'mises à jour',
      'feature': 'fonctionnalité',
      'features': 'fonctionnalités',
      'new features': 'nouvelles fonctionnalités',
      'performance': 'performance',
      'improvements': 'améliorations',
      'enhancement': 'amélioration',
      'enhancements': 'améliorations',
      'release': 'version',
      'available': 'disponible',
      'enterprise': 'entreprise',
      'support': 'support',
      'management': 'gestion',
      'administration': 'administration',
      'monitoring': 'surveillance',
      'logging': 'journalisation',
      'scalability': 'évolutivité',
      'reliability': 'fiabilité',
      'availability': 'disponibilité',
      'disaster recovery': 'reprise après sinistre',
      'cost optimization': 'optimisation des coûts',
      'migration': 'migration',
      'deployment': 'déploiement'
    };

    let translatedText = text;
    
    // Sort by length descending to replace longer phrases first
    const sortedTranslations = Object.entries(translations)
      .sort((a, b) => b[0].length - a[0].length);
    
    for (const [english, french] of sortedTranslations) {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      translatedText = translatedText.replace(regex, french);
    }
    
    return translatedText;
  }

  generateId(title, link) {
    const str = title + link;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString();
  }

  async fetchAllFeeds() {
    const allUpdates = [];
    
    for (const sourceKey of Object.keys(this.sources)) {
      const updates = await this.fetchFeed(sourceKey);
      allUpdates.push(...updates);
    }
    
    // Sort by publication date (most recent first)
    allUpdates.sort((a, b) => 
      new Date(b.published_date) - new Date(a.published_date)
    );
    
    // Remove duplicates based on title similarity
    const uniqueUpdates = this.removeDuplicates(allUpdates);
    
    console.log(`📊 Total actualités Cloud uniques : ${uniqueUpdates.length}`);
    return uniqueUpdates;
  }

  removeDuplicates(updates) {
    const seen = new Map();
    const unique = [];
    
    for (const update of updates) {
      const titleKey = update.title.toLowerCase().substring(0, 50);
      if (!seen.has(titleKey)) {
        seen.set(titleKey, true);
        unique.push(update);
      }
    }
    
    return unique;
  }
}

export default CloudRSSFetcher;
