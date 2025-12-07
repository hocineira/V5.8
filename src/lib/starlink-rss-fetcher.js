// Service RSS pour récupérer et traiter les flux Starlink/SpaceX
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

class StarlinkRSSFetcher {
  constructor() {
    this.sources = {
      spacenews_spacex: {
        url: "https://spacenews.com/tag/spacex/feed",
        name: "SpaceNews - SpaceX",
        category: "spacex",
        language: "en"
      },
      teslarati_spacex: {
        url: "https://teslarati.com/category/spacex/feed",
        name: "Teslarati - SpaceX",
        category: "spacex",
        language: "en"
      },
      space_news: {
        url: "https://space.com/feeds.xml",
        name: "Space.com",
        category: "space",
        language: "en"
      },
      space_news_articles: {
        url: "https://space.com/feeds/articletype/news.xml",
        name: "Space.com News",
        category: "space",
        language: "en"
      }
    };
  }

  async fetchFeed(sourceKey) {
    try {
      const source = this.sources[sourceKey];
      if (!source) return [];

      console.log(`🛰️ Récupération du feed Starlink : ${source.name}`);

      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const xmlText = await response.text();
      
      // Parse XML manually for better control
      const updates = this.parseRSSFeed(xmlText, source);
      
      console.log(`✅ ${updates.length} actualités Starlink récupérées de ${source.name}`);
      return updates;

    } catch (error) {
      console.error(`❌ Erreur récupération feed Starlink ${sourceKey}:`, error);
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
        if (item && this.isRelevantForStarlink(item)) {
          items.push(item);
        }
      }

      return items.slice(0, 15); // Limit to 15 recent entries
    } catch (error) {
      console.error('Erreur parsing RSS Starlink:', error);
      return [];
    }
  }

  parseRSSItem(itemXml, source) {
    try {
      // Extract basic fields
      let title = this.extractXmlTag(itemXml, 'title') || "Sans titre";
      const link = this.extractXmlTag(itemXml, 'link') || "";
      let description = this.extractXmlTag(itemXml, 'description') || this.extractXmlTag(itemXml, 'content:encoded') || "";
      const pubDate = this.extractXmlTag(itemXml, 'pubDate') || new Date().toISOString();

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

      // Translation if needed (Starlink content in French)
      let finalTitle = title;
      let finalDescription = description.substring(0, 800);

      if (source.language === "en") {
        if (!this.isFrenchContent(title + " " + description)) {
          finalTitle = this.translateToFrench(title);
          if (description.length > 50) {
            finalDescription = this.translateToFrench(description.substring(0, 400));
          }
        }
      }

      // Extract mission information
      const mission = this.extractMissionInfo(title + " " + description);
      
      // Extract satellite count
      const satelliteCount = this.extractSatelliteCount(title + " " + description);
      
      // Generate tags
      const tags = this.generateStarlinkTags(title, description, source.category);

      return {
        id: this.generateId(title, link),
        title: finalTitle,
        description: finalDescription,
        link: link,
        published_date: publishedDate.toISOString(),
        category: source.category,
        mission: mission,
        satellite_count: satelliteCount,
        tags: tags,
        source: source.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

    } catch (error) {
      console.error('Erreur parsing item RSS Starlink:', error);
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

  extractMissionInfo(text) {
    const textLower = text.toLowerCase();
    
    // Mission patterns
    const patterns = [
      /starlink\s+(\d+[-\d]*)/i,
      /falcon\s+9\s+starlink/i,
      /starlink\s+mission/i,
      /starlink\s+launch/i,
      /group\s+(\d+[-\d]*)/i
    ];
    
    for (const pattern of patterns) {
      const match = textLower.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    return null;
  }

  extractSatelliteCount(text) {
    const patterns = [
      /(\d+)\s+satellites/i,
      /(\d+)\s+starlink\s+satellites/i,
      /launching\s+(\d+)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return parseInt(match[1]);
      }
    }
    
    return null;
  }

  generateStarlinkTags(title, description, category) {
    const text = (title + " " + description).toLowerCase();
    const tags = [];
    
    // Starlink/SpaceX keywords
    const spaceKeywords = {
      'starlink': ['starlink', 'constellation'],
      'falcon': ['falcon 9', 'falcon heavy', 'booster', 'landing'],
      'launch': ['launch', 'lancement', 'décollage', 'mission'],
      'satellite': ['satellite', 'satellites', 'v2', 'gen2'],
      'spacex': ['spacex', 'elon musk'],
      'dragon': ['dragon', 'crew dragon', 'cargo'],
      'mars': ['mars', 'starship', 'raptor']
    };
    
    for (const [tag, keywords] of Object.entries(spaceKeywords)) {
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

  isRelevantForStarlink(update) {
    const text = (update.title + " " + update.description).toLowerCase();
    
    // Keywords Starlink prioritaires
    const starlinkKeywords = [
      'starlink', 'spacex', 'elon musk', 'falcon 9', 'falcon heavy', 
      'satellite internet', 'constellation', 'starship'
    ];
    
    // Keywords espace et lanceurs
    const spaceKeywords = [
      'satellite', 'satellites', 'launch', 'lancement', 'mission', 'orbit',
      'iss', 'dragon', 'crew', 'cargo', 'booster', 'landing', 'recovery'
    ];
    
    // Keywords innovations spatiales
    const innovationKeywords = [
      'internet from space', 'global broadband', 'low earth orbit', 'leo',
      'mars', 'moon', 'space exploration', 'raptor', 'merlin'
    ];
    
    // Vérifier présence keywords Starlink/SpaceX (priorité haute)
    const hasStarlinkKeyword = starlinkKeywords.some(keyword => text.includes(keyword));
    
    // Vérifier espace + innovation
    const hasSpaceKeyword = spaceKeywords.some(keyword => text.includes(keyword));
    const hasInnovationKeyword = innovationKeywords.some(keyword => text.includes(keyword));
    
    // Exclure articles non pertinents
    const excludeKeywords = [
      'tesla model', 'cybertruck', 'twitter', 'x.com', 'neuralink',
      'boring company', 'hyperloop', 'bitcoin'
    ];
    const hasExcludeKeyword = excludeKeywords.some(keyword => text.includes(keyword));
    
    // Logique de filtrage Starlink
    if (hasExcludeKeyword) return false;
    if (hasStarlinkKeyword) return true;
    if (hasSpaceKeyword && hasInnovationKeyword) return true;
    
    return false;
  }

  translateToFrench(text) {
    if (!text) return text;

    // Improved French translation for space/Starlink content
    const translations = {
      // Phrases complètes Starlink
      'starlink satellites launched successfully': 'satellites Starlink lancés avec succès',
      'spacex launches starlink mission': 'SpaceX lance une mission Starlink',
      'falcon 9 rocket launches': 'la fusée Falcon 9 décolle',
      'successful satellite deployment': 'déploiement de satellites réussi',
      'internet constellation expansion': 'expansion de la constellation internet',
      'global internet coverage': 'couverture internet mondiale',
      'low earth orbit satellites': 'satellites en orbite basse terrestre',
      'space exploration milestone': 'étape de l\'exploration spatiale',
      'rocket landing successful': 'atterrissage de fusée réussi',
      'crew dragon mission': 'mission Crew Dragon',
      'international space station': 'station spatiale internationale',
      
      // Technical Starlink terms
      'starlink': 'Starlink',
      'spacex': 'SpaceX',
      'falcon 9': 'Falcon 9',
      'falcon heavy': 'Falcon Heavy',
      'starship': 'Starship',
      'dragon': 'Dragon',
      'crew dragon': 'Crew Dragon',
      'cargo dragon': 'Cargo Dragon',
      'satellites': 'satellites',
      'satellite': 'satellite',
      'constellation': 'constellation',
      'internet service': 'service internet',
      'broadband': 'haut débit',
      'launch': 'lancement',
      'launched': 'lancé',
      'launches': 'lance',
      'launching': 'lancement',
      'mission': 'mission',
      'orbit': 'orbite',
      'orbital': 'orbital',
      'deployment': 'déploiement',
      'booster': 'propulseur',
      'landing': 'atterrissage',
      'recovery': 'récupération',
      'successful': 'réussi',
      'milestone': 'étape importante',
      'expansion': 'expansion',
      'coverage': 'couverture',
      'global': 'mondiale',
      'space': 'espace',
      'rocket': 'fusée',
      'spacecraft': 'vaisseau spatial',
      
      // Common space terms
      'and': 'et',
      'with': 'avec',
      'for': 'pour',
      'from': 'de',
      'to': 'vers',
      'in': 'dans',
      'on': 'sur',
      'at': 'à',
      'the': 'le/la',
      'new': 'nouveau',
      'latest': 'dernier',
      'first': 'premier',
      'next': 'prochain'
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
      'lancement', 'satellite', 'espace', 'mission', 'fusée',
      'constellation', 'orbite', 'déploiement', 'SpaceX France'
    ];
    
    const textLower = text.toLowerCase();
    const frenchCount = frenchIndicators.filter(indicator => 
      textLower.includes(indicator)
    ).length;
    
    return frenchCount >= 2;
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
        
        // Small delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Erreur source Starlink ${sourceKey}:`, error);
        continue;
      }
    }
    
    // Sort by publication date (newest first)
    allUpdates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
    
    console.log(`🛰️ Total actualités Starlink récupérées : ${allUpdates.length}`);
    return allUpdates;
  }
}

export const starlinkRssFetcher = new StarlinkRSSFetcher();